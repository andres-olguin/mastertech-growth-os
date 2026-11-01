---
name: mastertech-tenant-safety
description: Audita la autorización y aislamiento entre tenants, API y cola de campañas en Growth OS.
---
# Seguridad multicliente
1. Leer esquema Prisma, rutas y workers; rastrear tenantId de extremo a extremo.
2. Diseñar pruebas sintéticas con al menos dos tenants y acceso cruzado denegado.
3. Inspeccionar lead scoring, idempotencia, errores y autorización por recurso.
4. No enviar campañas reales ni afirmar resultados comerciales a partir de mocks.
5. Documentar evidencia, comandos, hallazgos y limitaciones.
