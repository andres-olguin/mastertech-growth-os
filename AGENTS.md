# AGENTS.md — MasterTech Growth OS

## Contexto
Motor de adquisición y distribución, distinto del proyecto MasterTech OS. Leer README, package.json y esquema Prisma antes de editar. Plataforma en desarrollo, no declarar campañas productivas, ventas o leads confirmados sin evidencia.
## Arquitectura y calidad
- Node.js, TypeScript, Express, Prisma, SQLite y componentes de colas: verificar la configuración real antes de cambios.
- Preservar aislamiento multi-tenant en rutas, consultas, workers, datos y resultados.
- `npm run build` existe para compilar; comprobar dependencias y resultado real.
- `npm test` actualmente es un placeholder que falla: NO decir que existe una suite funcional.
- No ejecutar `prisma db push` sobre datos persistentes o sin respaldo y autorización.
- No enviar campañas, correos ni mensajes a terceros sin consentimiento y aprobación.
- Validar seguridad, autorización, entradas y comportamiento con datos sintéticos.
## Git y agentes
- Ramas nuevas y PR; prohibido código directo a main, push forzado y borrado destructivo.
- Codex y Antigravity comparten AGENTS.md y .agents/skills/, pero trabajan en ramas/worktrees distintos.
- Entregar pruebas ejecutadas, cambios, riesgos, decisiones y handoff verificable.
