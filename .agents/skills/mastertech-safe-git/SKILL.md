---
name: mastertech-safe-git
description: Gestiona cambios seguros en Git para MasterTech mediante ramas aisladas, commits atómicos, revisión y pull requests, sin alterar main directamente.
---
# Git seguro
1. Leer las protecciones del repositorio y AGENTS.md; comprobar `git status --short` antes de cualquier operación.
2. Trabajar en una rama nueva por tarea, creada desde la base autorizada. No modificar `main` ni usar `git push --force`.
3. Preservar cambios ajenos; nunca ejecutar `git reset --hard`, `git clean -fd` o `git add .` sin autorización explícita.
4. Seleccionar archivos concretos; verificar diff y secretos; agrupar commits de alcance coherente con mensajes descriptivos.
5. Ejecutar verificaciones aplicables, publicar la rama solo cuando esté permitido y preparar un PR para revisión humana.
6. Si reglas de GitHub impiden crear ramas o actualizar referencias, detenerse; documentar el bloqueo y solicitar corrección autorizada. Nunca usar main como alternativa.
