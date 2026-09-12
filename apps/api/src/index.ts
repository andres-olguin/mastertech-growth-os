import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { dispatchCampaignGeneration } from './dispatcher';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// 1. Healthcheck
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'MasterTech Growth OS - Core API', timestamp: new Date() });
});

// 2. Crear Tenant (Aislamiento de empresa)
app.post('/api/tenants', async (req: Request, res: Response) => {
  const { name, slug } = req.body;
  if (!name || !slug) {
    return res.status(400).json({ error: 'name y slug son requeridos.' });
  }

  try {
    const tenant = await prisma.tenant.create({
      data: { name, slug }
    });
    res.status(201).json({ message: 'Tenant registrado exitosamente', tenant });
  } catch (err: any) {
    res.status(500).json({ error: 'Error al registrar tenant', details: err.message });
  }
});

// 3. Registrar Oferta y Despachar Motor de Campañas
app.post('/api/tenants/:tenantId/offers', async (req: Request, res: Response) => {
  const { tenantId } = req.params;
  const { title, targetCity, price, audience, objective } = req.body;

  if (!title || !targetCity || !audience || !objective) {
    return res.status(400).json({ error: 'title, targetCity, audience y objective son requeridos.' });
  }

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant no encontrado.' });
    }

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

    // Despachar evento asíncrono hacia el Campaign Engine
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

// 4. Consultar Campañas por Tenant
app.get('/api/tenants/:tenantId/campaigns', async (req: Request, res: Response) => {
  const { tenantId } = req.params;

  try {
    const campaigns = await prisma.campaign.findMany({
      where: { tenantId },
      include: { offer: true }
    });
    res.json({ tenantId, total: campaigns.length, campaigns });
  } catch (err: any) {
    res.status(500).json({ error: 'Error obteniendo campañas', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[MasterTech Growth OS] API escuchando en http://localhost:${PORT}`);
});