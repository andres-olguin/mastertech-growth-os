import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OfferEventPayload {
  tenantId: string;
  offerId: string;
  title: string;
  targetCity: string;
  audience: string;
  objective: string;
}

export async function dispatchCampaignGeneration(payload: OfferEventPayload): Promise<void> {
  // Simulación de procesamiento asíncrono desacoplado (Background Worker)
  setImmediate(async () => {
    try {
      console.log(`\n[Engine Worker] Procesando oferta para el tenant: ${payload.tenantId}`);
      console.log(`[Engine Worker] Oferta: "${payload.title}" en ${payload.targetCity}`);

      // 1. Motor B2C (Ej: Redes / Ads)
      const b2cHeadline = `¡Descubre ${payload.title} en ${payload.targetCity}!`;
      const b2cCopy = `¿Buscas la mejor opción para ${payload.audience}? Creamos experiencias inolvidables pensadas para tu objetivo: ${payload.objective}. Reserva hoy.`;

      await prisma.campaign.create({
        data: {
          tenantId: payload.tenantId,
          offerId: payload.offerId,
          channel: 'B2C_INSTAGRAM_ADS',
          headline: b2cHeadline,
          copy: b2cCopy,
          status: 'GENERATED'
        }
      });

      // 2. Motor B2B (Ej: Outreach corporativo / Alianzas)
      const b2bHeadline = `Alianza Estratégica: ${payload.title} para su organización`;
      const b2bCopy = `Estimado equipo, ofrecemos soluciones integradas de ${payload.title} para empresas en ${payload.targetCity}. Diseñado para optimizar sus resultados comerciales.`;

      await prisma.campaign.create({
        data: {
          tenantId: payload.tenantId,
          offerId: payload.offerId,
          channel: 'B2B_LINKEDIN_OUTREACH',
          headline: b2bHeadline,
          copy: b2bCopy,
          status: 'GENERATED'
        }
      });

      console.log(`[Engine Worker] Campañas B2C y B2B generadas y persistidas para oferta ${payload.offerId}\n`);
    } catch (error: any) {
      console.error('[Engine Worker Error]:', error.message);
    }
  });
}