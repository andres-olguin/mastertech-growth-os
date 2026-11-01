---
name: mastertech-testing-evidence
description: Diseña y ejecuta pruebas reproducibles, identifica regresiones y documenta evidencia comprobable en proyectos MasterTech.
---
# Pruebas y evidencia
1. Detectar stack, comandos, sistema operativo y dependencias desde el repositorio; no inventar suites de pruebas.
2. Definir criterios de aceptación y una línea base antes de cambiar código.
3. Probar caso nominal, errores, límites y regresiones, preferentemente con datos sintéticos y servicios simulados.
4. Registrar comando exacto, entorno, resultado, advertencias y archivos o evidencia relevantes.
5. Separar `ejecutado y pasó`, `ejecutado y falló`, `no ejecutado` y `no verificable en este entorno`.
6. No afirmar integración real, entrega, rendimiento, certificación ni seguridad sin evidencia pertinente.
7. Si faltan pruebas, proponerlas antes de añadir una dependencia o infraestructura compleja.
