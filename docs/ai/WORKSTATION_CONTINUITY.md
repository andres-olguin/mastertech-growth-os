# Continuidad del trabajo en PC universitario — mastertech-growth-os

**Estado:** propuesta operativa · **Registro:** 2026-11-10.  
**Origen:** el usuario reporta mantenimiento automático en computadores UNAB con congelamientos y posible pérdida del estado local; ha observado un episodio cerca de las 22:00 y otros sin horario fijo. El calendario y mecanismo de TI no están verificados oficialmente.

## Regla de conservación

- Tratar este equipo como potencialmente efímero. Ni un commit local ni otro worktree del mismo computador son respaldo persistente.
- Comprobar rama, worktree, remoto y HEAD al iniciar. Si falta Git u otra herramienta, identificar una versión portable **autorizada** sin permisos de administrador; no eludir restricciones del centro.
- Después de **cada commit relevante**, revisar diff y secretos/datos privados, hacer `git push -u origin <rama-propia>` y comprobar el SHA remoto en GitHub. Crear PR en borrador cuando corresponda. Si push falla, avisar y no acumular más trabajo sin respaldo.
- **No** autoriza push directo a `main`, force-push, merge, borrado de ramas, despliegue, cambios DNS ni operaciones externas. La protección de `main` debe configurarse y verificarse cuando esté disponible.
- Mantener handoff por agente con fecha, rama, SHA local y remoto confirmado, archivos modificados, pruebas PASÓ/FALLÓ/NO EJECUTADO, riesgos, bloqueos y siguiente paso; subirlo junto con el incremento.
- En mantenimiento inesperado: buscar antes de sobrescribir en otras unidades/perfiles, Papelera, OneDrive y artefactos/historial de agentes; inspeccionar ramas/PR remotos; recuperar solo lo realmente respaldado.
- Al salir del PC compartido, cerrar sesiones y retirar credenciales almacenadas accesibles conforme a las reglas institucionales. No guardar `.env`, contraseñas, identificadores personales ni datos de clientes en Git.

**Referencia central transversal:** `andres-olguin/mastertech-corporate-governance/docs/engineering/UNAB_EPHEMERAL_WORKSTATIONS.md` (propuesta en PR). Esta norma de respaldo **complementa** AGENTS.md y las restricciones particulares de cada repositorio; no autoriza publicar código de terceros ni secretos.
