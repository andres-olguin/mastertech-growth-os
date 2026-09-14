import { PrismaClient } from '@prisma/client';
import { scrapeLocalProspects } from './scraper';
import { calculateLeadScore, ScoringCriteria } from './scoring';
import { generateOrganicCampaigns } from './contentEngine';
import { broadcastEvent } from './events';

const prisma = new PrismaClient();

const CITIES = ['Viña del Mar', 'Valparaíso', 'Concón', 'Quilpué', 'Villa Alemana'];
const QUERIES = [
  'Empresas y corporaciones celebracion fiestas patrias',
  'Clinicas y mutuales almuerzo dieciochero',
  'Inmobiliarias constructoras y maestranzas asado 18',
  'Colegios particulares y centros de padres fonda',
  'Oficinas administrativas y coworkings pausa criolla'
];
const SERVICES = [
  'Gran Fonda Parrillera con Asado al Carbón ($38.990 p/p)',
  'Fonda en la Oficina Almuerzo Tradicional ($20.000 p/p)',
  'Pausa Criolla Cóctel Dieciochero ($10.000 p/p)'
];

let cycleIndex = 0;
let autopilotActive = false;
let autopilotInterval: NodeJS.Timeout | null = null;

export function getAutopilotStatus(): boolean {
  return autopilotActive;
}

export function stopAutopilot() {
  if (!autopilotActive) return false;
  autopilotActive = false;
  if (autopilotInterval) {
    clearInterval(autopilotInterval);
    autopilotInterval = null;
  }
  console.log('[Autopilot Growth OS] Detenido por comando manual.');
  broadcastEvent('autopilot_status', { active: false });
  return true;
}

export function startAutopilot(intervalMinutes: number = 2) {
  if (autopilotActive) return false;
  autopilotActive = true;

  console.log(`[Autopilot Growth OS] MODO FIESTAS PATRIAS ACTIVO. Corriendo cada ${intervalMinutes} minutos.`);
  broadcastEvent('autopilot_status', { active: true });

  // Ejecución inmediata
  runAutopilotCycle();

  // Bucle infinito
  autopilotInterval = setInterval(runAutopilotCycle, intervalMinutes * 60 * 1000);
  return true;
}

async function runAutopilotCycle() {
  if (!autopilotActive) return;

  const city = CITIES[cycleIndex % CITIES.length];
  const query = QUERIES[cycleIndex % QUERIES.length];
  const service = SERVICES[cycleIndex % SERVICES.length];
  cycleIndex++;

  try {
    const tenant = await prisma.tenant.findFirst({
      where: { slug: 'gran-royal' }
    });

    if (!tenant) {
      console.warn('[Autopilot] Tenant gran-royal no encontrado.');
      return;
    }

    // Oferta activa para Fiestas Patrias 2026
    let baseOffer = await prisma.offer.findFirst({
      where: { 
        tenantId: tenant.id,
        title: { contains: 'Fiestas Patrias' }
      }
    });

    if (!baseOffer) {
      baseOffer = await prisma.offer.create({
        data: {
          tenantId: tenant.id,
          title: 'Fiestas Patrias 2026: Asados y Fondas Corporativas Llave en Mano',
          targetCity: city,
          price: 38990,
          audience: 'Empresas, Faenas, Oficinas y Familias V Región',
          objective: 'Cierre express de fechas del 14 al 20 de Septiembre vía WhatsApp'
        }
      });
    }

    console.log(`[Autopilot 18 Septiembre] Rastreo express: "${query}" en ${city}...`);

    // 1. Detección y Scoring de organizaciones para asados/fondas
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
          favorableTiming: true // Crítico por fecha límite 18 de Septiembre
        };

        const { score, priority } = calculateLeadScore(scoringCriteria);

        const lead = await prisma.lead.create({
          data: {
            tenant: { connect: { id: tenant.id } },
            companyName: p.name,
            contactEmail: p.email || `contacto@${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.cl`,
            city: p.city,
            industry: p.category,
            budget: 1500000,
            score,
            priority,
            status: 'QUALIFIED'
          }
        });

        broadcastEvent('lead_qualified', lead);
        newLeadsCount++;
      }
    }

    // 2. Campañas orgánicas especializadas de Fiestas Patrias Gran Royal
    const postConfigs = [
      {
        channel: 'B2B_LINKEDIN_OUTREACH',
        headline: `🇨🇱 Asados y Fondas Corporativas Fiestas Patrias 2026 en ${city} — Gran Royal`,
        copy: `¿Aún sin celebrar las Fiestas Patrias con su equipo en ${city}? 🇨🇱\n\nEn Gran Royal Banquetería llevamos el 18 directamente a las dependencias o faenas de su empresa sin interrumpir la operación:\n\n🥩 PACK GRAN FONDA PARRILLERA ($38.990 + IVA p/p):\n• Asado al carbón en vivo (lomo liso/vetado, choripanes artesanales y anticuchos)\n• Maestro parrillero in situ + garzones profesionales + barman\n• Barra libre continua de terremotos, vino reserva, bebidas y jugos\n• Buffet de ensaladas criollas y postres tradicionales\n\n🥟 PACK FONDA EN LA OFICINA ($20.000 + IVA p/p):\n• Almuerzo criollo completo (empanada de horno tradicional, choripán gourmet, tabla criolla con arrollado de huaso y terremoto)\n\n⚡ Traslado y montaje GRATIS en Viña del Mar, Concón, Valparaíso, Quilpué y Villa Alemana. Facturación electrónica inmediata.\n\nÚltimos cupos disponibles para esta semana. Cotice directamente con Patricio:\nWhatsApp: +56 9 8137 7642`,
        cta: `https://wa.me/56981377642?text=${encodeURIComponent(`Hola Patricio, necesito cotizar urgente el menú de Fiestas Patrias para mi empresa en ${city}.`)}`
      },
      {
        channel: 'B2C_INSTAGRAM_ORGANIC',
        headline: `🇨🇱 ¡El 18 a tu Casa, Parcela u Oficina en ${city}! — Gran Royal`,
        copy: `¡Celebra este 18 de Septiembre con el mejor asado criollo de la V Región! 🇨🇱✨\n\n¿Tienes evento de empresa, junta familiar o festejo en parcela? Gran Royal Banquetería se encarga de todo:\n\n🔥 Asado al carbón con Maestro Parrillero\n🍷 Barra criolla y terremotos in situ\n🥟 Empanadas de horno, sopaipillas con pebre y dulces chilenos\n\n📌 PACKS DISPONIBLES:\n• Pausa Criolla: $10.000 p/p\n• Fonda Tradicional: $20.000 p/p\n• Gran Fonda Parrillera: $38.990 p/p\n\n¡Agenda abierta para los días 14, 15, 16, 17, 18 y 19 de Septiembre! Haz clic en el enlace para cotizar directo con Patricio por WhatsApp.`,
        cta: `https://wa.me/56981377642?text=${encodeURIComponent(`Hola Patricio, vi la publicación de Fiestas Patrias y quiero asegurar la fecha para un evento en ${city}.`)}`
      }
    ];

    for (const p of postConfigs) {
      await prisma.campaign.create({
        data: {
          tenant: { connect: { id: tenant.id } },
          offer: { connect: { id: baseOffer.id } },
          channel: p.channel,
          headline: p.headline,
          copy: `${p.copy}\n\n#FiestasPatrias2026 #AsadosChile #BanqueteriaViña #FondasCorporativas #GranRoyal #Valparaiso #Concon\n\nCTA: ${p.cta}`,
          status: 'READY_TO_PUBLISH'
        }
      });
    }

    broadcastEvent('campaign_generated', {
      tenantId: tenant.id,
      service,
      city,
      postsCount: postConfigs.length,
      timestamp: new Date()
    });

    console.log(`[Autopilot 18 Septiembre Finalizado] ${newLeadsCount} prospectos agregados | ${postConfigs.length} campañas activas para ${city}.`);
  } catch (err: any) {
    console.error('[Autopilot Error]:', err.message);
  }
}