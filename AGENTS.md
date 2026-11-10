# Instrucciones para agentes — mastertech-growth-os

## Estado y límites del repositorio

Prototipo de software comercial con API, Prisma y componentes de automatización.

Al iniciar una tarea, leer `README.md`, el sprint/documentación vigente y revisar el estado Git del propio worktree. No inventar funcionalidades, pruebas, clientes, integraciones, resultados o niveles de preparación. No publicar secretos o datos personales; no ejecutar acciones externas sin permiso.

## Control de cambios

Crear rama específica para la tarea; commits acotados y PR con pruebas realmente realizadas, riesgos y pendientes. No sobrescribir ramas/archivos ajenos, no editar `main` directamente, no hacer merge ni desplegar sin revisión y aprobación. Detenerse si hay cambios locales desconocidos.

## Restricciones específicas

No usar datos reales de leads ni activar campañas o integraciones externas sin autorización. El test npm actual es placeholder; no afirmar que existe una suite verificada. No dar por probado aislamiento de tenants ni producción.

## Estándar transversal de agentes — MasterTech (2026-11-10)

- **Referencia corporativa:** [MTS-ENG-001 — desarrollo multiagente con Git Worktrees](https://github.com/andres-olguin/mastertech-corporate-governance/blob/main/docs/engineering/MULTIAGENT_WORKTREES.md). Consultar su versión revisada junto a las reglas locales antes de crear worktrees, tareas o PR.
- Convención objetivo **local** para trabajo simultáneo: `MasterTech/<nombre-del-repo>/{main,codex,claude,antigravity}`. El contenedor no es repositorio; las cuatro carpetas son worktrees hermanos de **un solo repositorio Git**. `main` integra, los otros tres aíslan Codex, Claude Code y Antigravity.
- Coordinar mediante tareas con responsable/alcance, contratos API o de datos, handoffs, commits y PR. Mantener ramas independientes y revisión cruzada; no hacer merge a `main`, despliegue ni cambios de infraestructura sin autorización.
- Antes de migrar entornos existentes, verificar `git worktree list --porcelain`, `git status -sb`, ramas, cambios locales y PR; conservar trabajos previos. Nunca mover worktrees Git a mano, limpiar a la fuerza ni confundir GitHub con el estado local.
- **Adopción documental:** la presencia de este texto no confirma instalación de Claude Code, trabajo simultáneo, migración física ni resultados de pruebas. Prototipo de software comercial con API, Prisma y componentes de automatización.
- **Restricciones del proyecto:** No usar datos reales de leads ni activar campañas o integraciones externas sin autorización. El test npm actual es placeholder; no afirmar que existe una suite verificada. No dar por probado aislamiento de tenants ni producción.

