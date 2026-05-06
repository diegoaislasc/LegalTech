# Workflow Manual - Consulta de Expedientes OAJ

Este documento detalla los pasos seguidos para la consulta de expedientes en el portal del Consejo de la Judicatura Federal, específicamente en el micrositio de la Dirección General de Gestión Judicial.

## URL Inicial
`https://www.oaj.gob.mx/micrositios/dggj/paginas/serviciosTramites.htm?pageName=servicios%2Fexpedientes.htm`

## Pasos del Flujo

### 1. Preparación de la Vista
- **Acción**: Cerrar el diálogo emergente "Tu opinión es importante" para habilitar la interacción con el formulario principal.
- **Elemento**: Botón "Cerrar" (X) del modal.

### 2. Selección de Circuito (Filtro Inicial)
- **Sección**: Consulta de Datos de Expedientes.
- **Acción**: Seleccionar el circuito judicial.
- **Dato ingresado**: `Vigésimo Segundo Circuito Querétaro de Arteaga`.
- **Acción adicional**: Hacer clic en el botón **"Consultar"**.

### 3. Manejo de Nueva Pestaña (Portal DGEJ)
- Al hacer clic en Consultar, el sitio abre una nueva pestaña/ventana hacia el portal de la Dirección General de Estadística Judicial (DGEJ).
- **URL**: `https://www.dgej.cjf.gob.mx/internet/expedientes/circuitos.asp?...`

### 4. Selección del Órgano Jurisdiccional
- **Acción**: Seleccionar el órgano específico dentro del circuito previamente elegido.
- **Dato ingresado**: `Tribunal Colegiado en Materias Administrativa y de Trabajo del Vigésimo Segundo Circuito, con residencia en Querétaro, Querétaro`.
- **Acción adicional**: Hacer clic en el botón **"Buscar"**.

### 5. Especificación del Expediente
- Tras el clic en Buscar, la página se refresca para mostrar los campos de detalle.
- **Tipo de Expediente**: Seleccionar `Amparo Directo`.
- **Número de Expediente**: Ingresar `33/2025`.

### 6. Barrera de Seguridad (Estado Actual)
- **Elemento**: reCAPTCHA de Google ("No soy un robot").
- **Situación**: El sitio requiere la resolución de un desafío de imágenes (actualmente "autobuses") debido a la detección de tráfico automatizado o cuotas de servicio.
- **Estado**: Pendiente de resolución para poder ejecutar el clic final en el botón **"Buscar"** de resultados.

## Notas Técnicas para Automatización
- El sitio utiliza una arquitectura de pestañas que requiere cambio de contexto en Playwright (`tab-select`).
- La selección del Tipo de Expediente provoca un refresco de la página (`navigation/context destroyed`), lo que invalida las referencias de elementos anteriores.
- El reCAPTCHA representa el principal bloqueo para un flujo 100% "headless".
