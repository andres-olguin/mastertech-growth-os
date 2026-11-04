# Revisión focalizada de ingeniería — mastertech-growth-os

**Fecha:** 2026-11-04. Complemento al backlog existente; no sustituye estudios, arquitectura ni protocolos previos y no constituye aprobación para desplegar.

## Referencia del proyecto

Prototipo público multi-tenant en Express/TypeScript/Prisma, campañas asíncronas y lead scoring determinista; README describe engine de ofertas, campañas y distribución.

## Vacíos a resolver sin duplicar desarrollo

1. Verificar aislamiento multi-tenant con pruebas de acceso cruzado a ofertas, campañas y leads; ningún dato real sin consentimiento.
2. Distinguir generación de activos de distribución de envío automático; implementar consentimiento, límites, opt-out y cumplimiento de políticas de canales antes de enviar mensajes.
3. Probar idempotencia de workers, colas, reintentos, costeo y métricas de conversiones comprobables.

## Gate de validación

Pruebas negativas de tenant y fallo de trabajadores, documentación de canales autorizados y estados explícitos para integraciones simuladas.

## Evidencia exigida

Cada tarea debe señalar issue o PR asociado, rama, comando ejecutado, resultado, fecha y responsable. No publicar credenciales, datos de personas/clientes ni cifras de negocios no verificadas. No alterar producción por la mera creación de este archivo.
