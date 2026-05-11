# NovaLex: LegalTech AI-Native Agency

**NovaLex** es una plataforma de inteligencia legal de vanguardia diseñada para automatizar y optimizar procesos judiciales críticos. Utilizando tecnologías de punta como Inteligencia Artificial Generativa y Automatización Robótica de Procesos (RPA), NovaLex transforma la práctica jurídica tradicional en una operación ágil, precisa y orientada al futuro.

## 🚀 Características Principales

- **Consulta de Expedientes Automatizada**: Motor RPA basado en Playwright que monitorea boletines judiciales y expedientes en tiempo real sin intervención manual.
- **Síntesis Legal con IA**: Integración con Google Gemini para transformar acuerdos judiciales complejos en resúmenes ejecutivos accionables.
- **Detección de Plazos Críticos**: Identificación inteligente de fechas clave y términos procesales.
- **Interfaz Premium**: Dashboard moderno construido con Next.js y animaciones de alto nivel (GSAP, Framer Motion) para una experiencia de usuario superior.

## 🛠️ Stack Tecnológico

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), React, TypeScript.
- **Estilos**: Tailwind CSS, GSAP, Framer Motion para componentes animados.
- **Automatización**: [Playwright](https://playwright.dev/) para el motor de scraping judicial.
- **Inteligencia Artificial**: Google Gemini API para el procesamiento de lenguaje natural legal.
- **Persistencia**: Sistema de memoria local para evitar duplicidad de información.

## 📂 Estructura del Proyecto

- `src/app/`: Rutas y lógica de la aplicación Next.js.
- `src/scraper.js`: Motor de extracción de datos judiciales.
- `src/components/`: Componentes UI modernos y animados (Bento Grid, Neural BG).
- `src/config/`: Configuración de expedientes a monitorear.
- `docs/`: Documentación detallada de fases, manuales y flujos de trabajo.

## ⚙️ Configuración e Instalación

### Requisitos Previos

- Node.js 18+
- Una cuenta en GitHub para el despliegue.

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/diegoaislasc/LegalTech.git
cd LegalTech

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install chromium
```

### Ejecución

```bash
# Iniciar el servidor de desarrollo
npm run dev

# Ejecutar el motor de búsqueda judicial (RPA)
node src/scraper.js
```

## 📋 Estado del Proyecto (Fase 1)

Actualmente en la **Fase 1: MVP de Automatización**, enfocada en la extracción y síntesis de acuerdos para el seguimiento de expedientes judiciales.

- [x] Motor de Extracción (Scraper RPA)
- [x] Memoria del Sistema (Persistencia de Historial)
- [x] Síntesis Legal con IA (Gemini API)
- [ ] Sistema de Notificaciones Automáticas

---

© 2026 NOVALEX. Todos los derechos reservados.
