# Higiene y jerarquía — 2026-11-25

Estado: revisión técnica; no despliegue ni cambio funcional.

## Fuente y distribución
`apps/web` es el directorio señalado por netlify.toml y vercel.json; eso no demuestra la configuración efectiva de plataformas externas. `dist-landing/fiestas-patrias.html` comparte SHA con `apps/web/cotizar-18.html`; robots.txt y sitemap.xml también coinciden. Los index de ambos directorios no son idénticos. Conservar dist-landing y las URLs hasta comprobar GitHub Pages, hosting, scripts y consumidores. No sustituir artefactos por redirecciones sin validar.

## Prevención y puertas
Mantener package-lock.json; `npm ci` recomendado para reproducibilidad. No guardar bases locales, secretos, cachés ni dependencias. Validar instalación, build, rutas de cotización y los despliegues antes de retirar una exportación. npm test sigue siendo placeholder y requiere una suite real. No se ejecutó npm ci, build o pruebas en este cambio. No se modificaron rutas, HTML ni configuraciones de hosting.
