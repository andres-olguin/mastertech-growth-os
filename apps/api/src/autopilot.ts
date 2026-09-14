import { PrismaClient } from '@prisma/client';
import { scrapeLocalProspects } from './scraper';
import { calculateLeadScore, ScoringCriteria } from './scoring';
import { generateOrganicCampaigns } from './contentEngine';
import { broadcastEvent } from './events';

const prisma = new PrismaClient();

const CITIES = ['Viña del Mar', 'Valparaíso', 'Concón', 'Quilpué', 'Villa Alemana'];
const QUERIES = [
  'Colegios particulares y centros de padres',
  'Empresas y corporaciones para cenas de fin de año',
  'Hoteles y centros de eventos matrimonios',
  'Clínicas e instituciones de salud eventos',
  'Inmobiliarias y constructoras celebraciones'
];
const SERVICES = [
  'Fiesta de Graduación / Gala 4to Medio',
  'Matrimonio de Gala',
  'Evento Corporativo / Aniversario',
  'Cena de Fin de Año'
];

let cycleIndex = 0;
let autopilotActive = false;

export function startAutopilot(intervalMinutes: number = 3) {
  if (autopilotActive) return;
  autopilotActive = true;

  console.log(`[Autopilot Growth OS] Activo. Ciclo continuo ejecutándose cada ${intervalMinutes} minutos.`);

  // Ejecución inmediata inicial
  runAutopilotCycle();

  // Bucle infinito programado
  setInterval(runAutopilotCycle, intervalMinutes * 60 * 1000);
}

async function runAutopilotCycle() {
  const city = CITIES[cycleIndex % CITIES.length];
  const query = QUERIES[cycleIndex % QUERIES.length];
  const service = SERVICES[cycleIndex % SERVICES.length];
  cycleIndex++;

  try {
    const tenant = await prisma.tenant.findFirst({
      where: { slug: 'gran-royal' }
    });

    if (!tenant) {
      console.warn('[Autopilot] Tenant gran-royal no encontrado en la base de datos.');
      return;
    }

    console.log(`[Autopilot Cycle] Escaneando nicho: "${query}" en ${city}...`);

    // 1. Detección y Scoring Automático
    const rawProspects = await scrapeLocalProspects(query, city);
    let newLeadsCount = 0;

    for (const p of rawProspects) {
      const exists = await prisma.lead.findFirst({
        where: {
          tenantId: tenant.id,
          companyName: p.name
        }
      });

      if (!exists) {
        const scoringCriteria: ScoringCriteria = {
          industryMatch: true,
          locationMatch: CITIES.includes(p.city),
          needDetected: true,
          budgetQualified: true,
          priorEngagement: false,
          favorableTiming: true
        };

        const { score, priority } = calculateLeadScore(scoringCriteria);

        const lead = await prisma.lead.create({
          data: {
            tenantId: tenant.id,
            companyName: p.name,
            contactEmail: p.email || `contacto@${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.cl`,
            city: p.city,
            industry: p.category,
            budget: 3500000,
            score,
            priority,
            status: score >= 70 ? 'QUALIFIED' : 'DETECTED'
          }
        });

        broadcastEvent('lead_qualified', lead);
        newLeadsCount++;
      }
    }

    // 2. Generación y almacenamiento de campañas de difusión
    const posts = generateOrganicCampaigns(service, city);
    broadcastEvent('campaign_generated', {
      tenantId: tenant.id,
      service,
      city,
      postsCount: posts.length,
      timestamp: new Date()
    });

    console.log(`[Autopilot Cycle Finalizado] ${newLeadsCount} prospectos agregados | Campañas generadas para ${city}.`);
  } catch (err: any) {
    console.error('[Autopilot Error]:', err.message);
  }
}