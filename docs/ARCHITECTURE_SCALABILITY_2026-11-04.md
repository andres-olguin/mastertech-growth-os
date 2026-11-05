# mastertech-growth-os — Arquitectura y escalabilidad basada en evidencia

**Corte:** 2026-11-04 · **Estado:** documento de ingeniería (propuesta) · **Responsabilidad:** revisión técnica humana antes de prometer capacidades.  
**No constituye:** certificación, cumplimiento normativo, validación de mercado ni garantía de producción.

## 1. Línea base comprobada

Prototipo Express/TypeScript/Prisma de ofertas, campañas multicanal y puntuación determinista de leads; presencia de motor de generación asíncrona no significa envíos autorizados.

## 2. Arquitectura objetivo proporcional al problema

Dominios Offers, Campaigns, Leads, Identity, Connectors y Audit. Separar creación de assets de entrega en plataformas; jobs idempotentes, bandeja de aprobaciones humanas y segregación de tenants. Empezar con cola única y métricas antes de escalar workers.

**Principio de evolución:** escalar verticalmente y reducir cuellos de botella medidos antes de añadir infraestructura horizontal, colas y servicios separados. Elegir proveedor según costos, soberanía y operación, no solo prestigio tecnológico.

## 3. Experimentos de escalabilidad y calidad

Medir campañas generadas por minuto, tiempos de job, intentos, duplicaciones, errores por canal y costo por oferta; rate limits de proveedores y gasto publicitario son restricciones de primer orden.

En cada ejecución documentar hardware/runtime, dataset, comandos, carga, fecha, mediana y dispersión. Reportar errores y fallas; la incorporación del presente documento **no** cuenta como ejecución de benchmark.

## 4. Seguridad, titularidad y límites para un piloto

Aislamiento multicliente probado, permisos y consentimiento verificables, opt-out, límites presupuestarios, registro de aprobación y credenciales externas por tenant. Prohibir claims de leads/ventas/campañas entregadas sin logs y datos reales.

Requisitos transversales: autenticación/autorización cuando hay cuentas, minimización de datos, backups ensayados, contratos si hay clientes, secretos fuera de GitHub y fuentes con fecha de cada requisito legal. No cambiar titularidad de proyectos académicos ni reutilizar datos de terceros sin derechos.

## 5. Secuencia de trabajo por gates

G1: pruebas e2e de tenant e idempotencia. G2: panel de revisión y auditoría. G3: integración de sandbox con un canal permitido. G4: piloto autorizado y métricas de impacto atribuibles y revisadas.

**Criterio de fin de cada gate:** PR o commit, prueba reproducible y reporte explícito de qué fue medido, qué no se comprobó y riesgos P0/P1 abiertos. No asignar fechas ni presupuesto sin datos de capacidad y aprobación.

## 6. Base metodológica

- [AWS Well-Architected](https://docs.aws.amazon.com/wellarchitected/): fiabilidad, rendimiento, costo, seguridad y operación.
- [OWASP ASVS 5.0](https://asvs.owasp.org/): requisitos de verificación de apps y APIs, según aplicabilidad.
- [NIST SSDF SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final): desarrollo seguro.
- [Google SRE — SLOs](https://sre.google/workbook/implementing-slos/): decisiones de fiabilidad con datos.
- [OpenTelemetry](https://opentelemetry.io/docs/concepts/observability-primer/): métricas, trazas y logs, cuando sean relevantes.

**Fecha de consulta:** 2026-11-04. Son guías generales: ninguna certifica este software ni respalda ventas o rendimiento no medido.
