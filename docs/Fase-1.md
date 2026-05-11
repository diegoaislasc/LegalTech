# Fase 1: MVP de Automatización y Síntesis de Boletines Judiciales

Este documento detalla la primera fase del proyecto **LegalTech AI-Native Agency**, enfocada en la automatización del flujo de consulta de expedientes para el despacho de Paco.

## Objetivo General
Desarrollar un sistema funcional que revise automáticamente una lista de expedientes, extraiga nuevos acuerdos, los sintetice mediante IA y genere un reporte diario.

---

## Sub-fase 1.1: El Motor de Extracción (Scraper RPA)
**Objetivo**: Convertir el flujo manual en un script de Playwright programable.

- **Definición de Configuración**: Crear `src/config/expedientes.json` para listar los objetivos (Circuito, Órgano, Tipo de Expediente, Número).
- **Desarrollo del Scraper**: Implementar `src/scraper.js` con soporte para:
    - Navegación multi-pestaña.
    - Selección dinámica de elementos basados en la configuración.
    - Captura del contenido del iframe de resultados.
- **Manejo de Errores**: Reintentos automáticos si el portal de la OAJ está lento o caído.
- **Estrategia de Captcha**: Implementar modo "Semi-Headed" para resolución manual o integración con servicios de terceros.

## Sub-fase 1.2: Memoria del Sistema (Persistencia)
**Objetivo**: Evitar la duplicidad de información y detectar solo lo nuevo.

- **Base de Datos Local**: Implementar `data/history.json` para almacenar los acuerdos ya procesados.
- **Lógica de Comparación**: Desarrollar un módulo que compare el snapshot actual con el historial para identificar únicamente los acuerdos con IDs o fechas nuevas.
- **Limpieza de Datos**: Normalizar el texto extraído del portal para facilitar el procesamiento por la IA.

## Sub-fase 1.3: El "Cerebro" Legal (Síntesis con IA)
**Objetivo**: Transformar acuerdos crudos en inteligencia accionable.

- **Diseño del Prompt**: Crear una plantilla de instrucciones para Gemini que:
    - Resuma el acuerdo en lenguaje ciudadano/ejecutivo.
    - Identifique fechas clave y plazos legales (e.g., "15 días para alegatos").
    - Sugiera la "Siguiente Acción" para el abogado.
- **Integración API**: Conectar el flujo de nuevos acuerdos con el API de Gemini para procesamiento por lotes.

## Sub-fase 1.4: Sistema de Notificaciones (Entrega de Valor)
**Objetivo**: Entregar el reporte diario al despacho de Paco.

- **Generador de Reportes**: Crear un módulo que formatee los resultados en Markdown o HTML.
- **Canales de Entrega**:
    - **Nivel 1**: Archivo de reporte diario en la carpeta `reports/`.
    - **Nivel 2 (Opcional)**: Envío automático vía correo electrónico o notificación de sistema.
- **Dashboard Diario**: Un resumen visual de: "X Expedientes revisados, Y Cambios detectados, Z Acciones urgentes".

---

## Criterios de Aceptación de la Fase 1
1. El sistema puede procesar una lista de al menos 3 expedientes diferentes.
2. Solo se generan notificaciones para acuerdos que no existían en el historial previo.
3. El resumen de la IA identifica correctamente al menos un plazo legal en un acuerdo de prueba.
4. Paco recibe un reporte consolidado legible sin tener que entrar al portal de la OAJ.
