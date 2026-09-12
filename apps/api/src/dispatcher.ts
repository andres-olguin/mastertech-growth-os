import { PrismaClient } from '@prisma/client';
import { broadcastEvent } from './events';

const prisma = new PrismaClient();

const PATRICIO_WHATSAPP = '56981377642';

interface OfferEventPayload {
  tenantId: string;
  offerId: string;
  title: string;
  targetCity: string;
  audience: string;
  objective: string;
}

export async function dispatchCampaignGeneration(payload: OfferEventPayload): Promise<void> {
  setImmediate(async () => {
    try {
      console.log(`\n[Engine Worker] Generando campañas para el tenant: ${payload.tenantId}`);

      // Generar link de WhatsApp con mensaje personalizado
      const rawB2CMessage = `Hola Patricio, vi la oferta de ${payload.title} en ${payload.targetCity} y me gustaría cotizar una fecha.`;
      const waB2CLink = `https://wa.me/${PATRICIO_WHATSAPP}?text=${encodeURIComponent(rawB2CMessage)}`;

      const rawB2BMessage = `Estimado Patricio, represento a una empresa en ${payload.targetCity}. Nos interesa coordinar una reunión técnica sobre ${payload.title}.`;
      const waB2BLink = `https://wa.me/${PATRICIO_WHATSAPP}?text=${encodeURIComponent(rawB2BMessage)}`;

      // 1. Campaña B2C (Instagram Ads / Meta)
      const b2cHeadline = `¡Descubre ${payload.title} en ${payload.targetCity}!`;
      const b2cCopy = `¿Buscas la mejor experiencia para ${payload.audience}? Diseñado para ${payload.objective}.\n\nHabla directamente con Patricio en WhatsApp para asegurar disponibilidad: ${waB2CLink}`;

      const b2cCampaign = await prisma.campaign.create({
        data: {
          tenantId: payload.tenantId,
          offerId: payload.offerId,
          channel: 'B2C_INSTAGRAM_ADS',
          headline: b2cHeadline,
          copy: b2cCopy,
          status: 'GENERATED'
        }
      });

      broadcastEvent('campaign_generated', {
        campaign: b2cCampaign,
        tenantId: payload.tenantId
      });

      // 2. Campaña B2B (Outreach Corporativo / Alianzas)
      const b2bHeadline = `Alianza Estratégica: ${payload.title}`;
      const b2bCopy = `Estimado equipo, Gran Royal ofrece soluciones integrales de ${payload.title} para organizaciones en ${payload.targetCity}.\n\nContacto directo de coordinación técnica: ${waB2BLink}`;

      const b2bCampaign = await prisma.campaign.create({
        data: {
          tenantId: payload.tenantId,
          offerId: payload.offerId,
          channel: 'B2B_LINKEDIN_OUTREACH',
          headline: b2bHeadline,
          copy: b2bCopy,
          status: 'GENERATED'
        }
      });

      broadcastEvent('campaign_generated', {
        campaign: b2bCampaign,
        tenantId: payload.tenantId
      });

      console.log(`[Engine Worker] Campañas con enlaces de WhatsApp generadas para ${payload.offerId}\n`);
    } catch (error: any) {
      console.error('[Engine Worker Error]:', error.message);
    }
  });
}