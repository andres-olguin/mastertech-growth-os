---
name: mastertech-agent-handoff
description: Transfiere tareas y evidencia entre Codex CLI y Google Antigravity sin edición simultánea del mismo árbol de trabajo.
---
# Transferencia Codex / Antigravity
1. Identificar repositorio, issue/tarea, rama, commit base, propietario temporal y objetivo de la sesión.
2. Separar entornos con ramas y, si se trabaja localmente en paralelo, worktrees distintos. No editar simultáneamente el mismo directorio.
3. Para entregar, resumir: objetivo, alcance, archivos tocados, diff/commits, comandos y resultados, riesgos, pendientes y próximo paso.
4. Guardar el handoff específico de la tarea en PR/Issue o `docs/ai/handoffs/<ID>.md` cuando se autorice; no sobrescribir uno ajeno.
5. El receptor debe revisar diff, correr verificaciones pertinentes y reportar discrepancias; no asumir que el resultado anterior fue probado.
6. Mantener revisión humana antes de merge o cualquier operación sensible. No se presupone comunicación automática entre agentes.
