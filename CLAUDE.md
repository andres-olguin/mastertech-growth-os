# Claude Code — mastertech-growth-os

Antes de ejecutar tareas, leer `AGENTS.md`, `README.md`, el sprint activo y la [norma transversal MTS-ENG-001](https://github.com/andres-olguin/mastertech-corporate-governance/blob/main/docs/engineering/MULTIAGENT_WORKTREES.md).

**Worktree objetivo:** `MasterTech/<nombre-del-repo>/claude/`, como hermano de `main/`, `codex/` y `antigravity/`; un único repositorio Git con ramas independientes. Este es un **diseño futuro** hasta que los paths locales estén verificados; no crear/mover/borrar worktrees existentes a ciegas.

Claude Code prioriza arquitectura, QA, seguridad y revisión cruzada, pero la asignación por issue/sprint tiene preferencia. Acordar contratos y archivos bajo control antes de programar, compartir handoff (SHA, archivos, pruebas, riesgos, pendientes) y crear PR revisable; no integrar/desplegar automáticamente.

**Reglas particulares:** No usar datos reales de leads ni activar campañas o integraciones externas sin autorización. El test npm actual es placeholder; no afirmar que existe una suite verificada. No dar por probado aislamiento de tenants ni producción.

La existencia de este archivo no implica que Claude esté instalado, autenticado o ejecutándose, ni que la norma central esté ya fusionada con `main`.
