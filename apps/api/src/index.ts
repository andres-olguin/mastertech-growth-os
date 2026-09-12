import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { dispatchCampaignGeneration } from './dispatcher';
import { calculateLeadScore, ScoringCriteria } from './scoring';
import { addSSEClient, broadcastEvent } from './events';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Servir frontend estático
app.use(express.static(path.join(process.cwd(), 'apps/web')));

// Ruta principal para servir el Dashboard renderizado
app.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(process.cwd(), 'apps/web/index.html'));
});

// Ruta pública de captación y cotización para Gran Royal
app.get('/cotizar/gran-royal', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(process.cwd(), 'apps/web/cotizar.html'));
});

// 1. Healthcheck
app.get('/health', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json({ status: 'ok', service: 'MasterTech Growth OS - Core API', timestamp: new Date() });
});

// 2. Canal de eventos en tiempo real (Server-Sent Events)
app.get('/api/events', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  addSSEClient(res);
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'Conectado a Growth OS Live Stream' })}\n\n`);
});

// 3. Tenants
app.get('/api/tenants', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    const tenants = await prisma.tenant.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ total: tenants.length, tenants });
  } catch (err: any) {
    res.status(500).json({ error: 'Error obteniendo tenants', details: err.message });
  }
});

app.post('/api/tenants', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const { name, slug } = req.body;
  if (!name || !slug) return res.status(400).json({ error: 'name y slug son requeridos.' });

  try {
    const tenant = await prisma.tenant.create({ data: { name, slug } });
    broadcastEvent('tenant_created', tenant);
    res.status(201).json({ message: 'Tenant registrado exitosamente', tenant });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al registrar tenant', details: err.message });
  }
});

// 4. Ingesta de Ofertas y Despacho de Campañas
app.post('/api/tenants/:tenantId/offers', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const { tenantId } = req.params;
  const { title, targetCity, price, audience, objective } = req.body;

  if (!title || !targetCity || !audience || !objective) {
    return res.status(400).json({ error: 'title, targetCity, audience y objective son requeridos.' });
  }

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) return res.status(404).json({ error: 'Tenant no encontrado.' });

    const offer = await prisma.offer.create({
      data: {
        tenantId,
        title,
        targetCity,
        price: price ? parseFloat(price) : null,
        audience,
        objective
      }
    });

    broadcastEvent('offer_created', offer);

    await dispatchCampaignGeneration({
      tenantId: offer.tenantId,
      offerId: offer.id,
      title: offer.title,
      targetCity: offer.targetCity,
      audience: offer.audience,
      objective: offer.objective
    });

    res.status(202).json({
      message: 'Oferta registrada. Generación de campañas despachada en segundo plano.',
      offer
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Error procesando oferta', details: err.message });
  }
});

// 5. Campañas generadas por Tenant
app.get('/api/tenants/:tenantId/campaigns', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const { tenantId } = req.params;
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { tenantId },
      include: { offer: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ tenantId, total: campaigns.length, campaigns });
  } catch (err: any) {
    res.status(500).json({ error: 'Error obteniendo campañas', details: err.message });
  }
});

// 6. Opportunity Engine: Ingesta y Calificación de Leads
app.post('/api/tenants/:tenantId/leads', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const { tenantId } = req.params;
  const {
    companyName,
    contactEmail,
    city,
    industry,
    budget,
    campaignId,
    criteria
  } = req.body;

  if (!companyName || !contactEmail || !city || !industry) {
    return res.status(400).json({ error: 'companyName, contactEmail, city e industry son requeridos.' });
  }

  try {
    const scoringInput: ScoringCriteria = {
      industryMatch: !!criteria?.industryMatch,
      locationMatch: !!criteria?.locationMatch,
      needDetected: !!criteria?.needDetected,
      budgetQualified: !!criteria?.budgetQualified,
      priorEngagement: !!criteria?.priorEngagement,
      favorableTiming: !!criteria?.favorableTiming
    };

    const { score, priority } = calculateLeadScore(scoringInput);

    const lead = await prisma.lead.create({
      data: {
        tenantId,
        campaignId: campaignId || null,
        companyName,
        contactEmail,
        city,
        industry,
        budget: budget ? parseFloat(budget) : null,
        score,
        priority,
        status: score >= 70 ? 'QUALIFIED' : 'DETECTED'
      }
    });

    broadcastEvent('lead_qualified', lead);

    res.status(201).json({
      message: 'Lead procesado por Opportunity Engine y calificado exitosamente',
      lead
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al procesar lead', details: err.message });
  }
});

// 7. Ranking de Leads por Tenant
app.get('/api/tenants/:tenantId/leads', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const { tenantId } = req.params;
  try {
    const leads = await prisma.lead.findMany({
      where: { tenantId },
      orderBy: { score: 'desc' }
    });
    res.json({ tenantId, total: leads.length, leads });
  } catch (err: any) {
    res.status(500).json({ error: 'Error consultando leads', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[MasterTech Growth OS] API y Dashboard escuchando en http://localhost:${PORT}`);
});