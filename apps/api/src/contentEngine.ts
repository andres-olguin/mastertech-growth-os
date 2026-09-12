export interface SocialPost {
  platform: 'INSTAGRAM' | 'FACEBOOK' | 'LINKEDIN';
  title: string;
  copy: string;
  hashtags: string[];
  ctaUrl: string;
}

export function generateOrganicCampaigns(serviceType: string, city: string): SocialPost[] {
  const waBase = 'https://wa.me/56981377642?text=';

  if (serviceType.toLowerCase().includes('matrimonio') || serviceType.toLowerCase().includes('boda')) {
    const waText = encodeURIComponent(`Hola Patricio, vi la publicación en Instagram y quiero cotizar nuestro matrimonio en ${city}.`);
    return [
      {
        platform: 'INSTAGRAM',
        title: `Producción de Matrimonios en ${city} — Cobertura Integral`,
        copy: `¿Planeando tu boda soñada en ${city}? ✨\n\nEn Gran Royal Producciones nos encargamos de cada detalle para que solo te preocupes de disfrutar:\n\n✔️ Banquetería y coctelería de primer nivel\n✔️ Iluminación arquitectónica y pista LED\n✔️ DJ en vivo, amplificación y cabina fotográfica 360°\n✔️ Coordinación técnica presencial durante todo el evento\n\nFechas 2026/2027 con agenda abierta. ¡Escríbenos para agendar degustación y visita guiada a salones exclusivos!`,
        hashtags: ['#MatrimoniosViña', '#NoviosChile', '#BanqueteriaViñadelMar', '#MatrimoniosValparaiso', '#GranRoyal'],
        ctaUrl: `${waBase}${waText}`
      },
      {
        platform: 'FACEBOOK',
        title: `Guía Completa para tu Fiesta de Matrimonio en la V Región`,
        copy: `Descubre nuestros salones y paquetes todo incluido para celebrar tu matrimonio en ${city}. Contamos con más de 10 años creando experiencias inolvidables.\n\nHaz clic en el enlace para cotizar tu fecha directamente por WhatsApp con nuestro productor general.`,
        hashtags: ['#MatrimoniosChile', '#EventosVRegion', '#GranRoyalProducciones'],
        ctaUrl: `${waBase}${waText}`
      }
    ];
  }

  // Corporativos y Galas por defecto
  const waTextCorp = encodeURIComponent(`Hola Patricio, vi su catálogo de eventos y quiero cotizar la cena de fin de año/gala en ${city}.`);
  return [
    {
      platform: 'LINKEDIN',
      title: `Producción Ejecutiva de Cenas y Congresos Corporativos — ${city}`,
      copy: `Eleve el estándar de su próximo evento institucional en ${city}.\n\nEn Gran Royal Producciones diseñamos experiencias corporativas de alto impacto:\n• Cenas de fin de año y aniversarios de empresa\n• Congresos, seminarios y jornadas de integración\n• Técnica audiovisual, pantallas gigantes y escenografía profesional\n\nCotice directamente con nuestra dirección comercial sin intermediarios.`,
      hashtags: ['#EventosCorporativos', '#RecursosHumanosChile', '#ViñadelMar', '#Valparaiso', '#GranRoyal'],
      ctaUrl: `${waBase}${waTextCorp}`
    },
    {
      platform: 'INSTAGRAM',
      title: `Galas de Graduación Todo Incluido — ${city}`,
      copy: `🎓 ¡La graduación que tu generación merece!\n\nSalones exclusivos en la V Región, banquetería de gala, barra libre, seguridad profesional y la mejor fiesta con DJ y plataforma 360°.\n\nEscríbenos para coordinar reunión técnica con el Centro de Alumnos o Comisión Organizadora.`,
      hashtags: ['#Graduaciones2026', '#GalasViñadelMar', '#CuartoMedio', '#GranRoyal'],
      ctaUrl: `${waBase}${waTextCorp}`
    }
  ];
}