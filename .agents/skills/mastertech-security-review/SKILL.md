---
name: mastertech-security-review
description: Revisa secretos, acceso, validación de entradas, dependencias y superficies de ataque antes de integrar código de MasterTech.
---
# Revisión de seguridad
1. Leer política de seguridad y definir alcance permitido; usar solo sistemas y datos autorizados.
2. Comprobar que los cambios no incluyen tokens, .env, datos privados, credenciales, registros sensibles ni artefactos de clientes.
3. Revisar autenticación, autorización por recurso, aislamiento entre tenants, validación en servidor, logging y manejo de errores según el proyecto.
4. Auditar dependencias y configuraciones con herramientas disponibles, sin asumir resultados no ejecutados.
5. Registrar hallazgos por severidad, evidencia, impacto, mitigación y limitaciones; evitar filtrar detalles sensibles a Issues públicos.
6. No realizar pruebas intrusivas contra producción o terceros ni habilitar despliegues sin autorización.
