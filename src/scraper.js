import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { getNewAgreements, updateHistory } from './utils/persistence.js';

// Cargar configuración de expedientes
const configPath = path.resolve('src/config/expedientes.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

async function runScraper() {
  // Crear un directorio temporal para el perfil del navegador
  const userDataDir = path.resolve('data/browser-profile');
  if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir, { recursive: true });

  const context = await chromium.launchPersistentContext(userDataDir, { 
    headless: false,
    locale: 'es-MX',
    timezoneId: 'America/Mexico_City',
    // DESACTIVACIÓN DE TRADUCCIÓN DESDE PREFERENCIAS
    prefs: {
      "translate_enabled": false,
      "translate": { "enabled": false }
    },
    args: [
      '--disable-features=Translate',
      '--disable-translate',
      '--lang=es-MX',
      '--no-default-browser-check'
    ],
    viewport: { width: 1280, height: 720 }
  }); 

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  console.log('🚀 Iniciando NovaLex Scraper (Modo Protegido)...');

  for (const exp of config.expedientes) {
    try {
      console.log(`\n--- Procesando Expediente: ${exp.numero} (${exp.nombre}) ---`);
      
      // 1. Navegación Inicial
      await page.goto('https://www.oaj.gob.mx/micrositios/dggj/paginas/serviciosTramites.htm?pageName=servicios%2Fexpedientes.htm');
      
      // Esperar a que el combo de circuitos esté en el DOM
      await page.waitForSelector('#circuito');

      // PASO A: Cerrar modal de bienvenida del sitio
      try {
        const closeBtn = page.locator('button:has-text("Cerrar"), button:has-text("Close"), .modal-header .close').first();
        if (await closeBtn.isVisible({ timeout: 3000 })) {
          await closeBtn.click();
          console.log(`✅ Modal del sitio cerrado.`);
        }
      } catch (e) {
        console.log('Aviso: El modal no apareció o ya fue cerrado.');
      }

      await page.waitForTimeout(1000);
      await page.keyboard.press('Escape');

      // 2. Selección de Circuito
      console.log(`📍 Seleccionando circuito: ${exp.circuito}`);
      await page.selectOption('#circuito', { label: exp.circuito });
      
      // FORZAR HABILITACIÓN DEL BOTÓN (disparando eventos de cambio)
      await page.dispatchEvent('#circuito', 'change');
      await page.dispatchEvent('#circuito', 'blur');

      // 3. Clic en Consultar (PASO CRÍTICO CON REINTENTOS)
      console.log('👆 Intentando hacer clic en Consultar...');
      const consultarBtn = page.locator('button:has-text("Consultar"), input[value="Consultar"], .btn-consultar').first();
      await consultarBtn.waitFor({ state: 'visible', timeout: 10000 });

      let newTab = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!newTab && attempts < maxAttempts) {
        attempts++;
        try {
          console.log(`   Tentativa ${attempts}...`);
          const [tab] = await Promise.all([
            context.waitForEvent('page', { timeout: 10000 }),
            consultarBtn.click({ force: true })
          ]);
          newTab = tab;
        } catch (e) {
          console.log(`   ⚠️ Intento ${attempts} fallido (no se abrió pestaña). Reintentando...`);
          await page.waitForTimeout(2000);
        }
      }

      if (!newTab) throw new Error('No se pudo abrir la pestaña del portal DGEJ tras varios intentos.');

      console.log('⏳ Esperando a que el portal DGEJ cargue...');
      await newTab.waitForLoadState('load'); // Esperar carga completa
      
      // ESPERAR A QUE EL SELECT ESTÉ VISIBLE
      await newTab.waitForSelector('select', { state: 'visible', timeout: 30000 });
      console.log('📍 Seleccionando órgano jurisdiccional...');

      // 3. Selección de Órgano en la nueva pestaña
      await newTab.selectOption('select', { label: exp.organo });
      console.log('✅ Órgano seleccionado.');
      
      // Pausa para asegurar que el sitio registre la selección
      await newTab.waitForTimeout(1000);

      console.log('👆 Haciendo clic en el primer Buscar...');
      const firstBuscarBtn = newTab.locator('button:has-text("Buscar"), input[type="button"][value="Buscar"], input[type="submit"][value="Buscar"]').first();
      await firstBuscarBtn.click({ force: true });
      
      console.log('⏳ Esperando detalle del expediente...');
      // Esperar a que el selector de Tipo de Expediente aparezca (señal de que cargó la siguiente parte)
      await newTab.waitForSelector('select', { state: 'visible', timeout: 30000 });

      // 4. Detalle del Expediente
      // Seleccionar tipo de expediente (provoca refresco)
      await newTab.waitForSelector('select', { state: 'visible' });
      await newTab.selectOption('select', { label: exp.tipoExpediente });
      
      // Después de cambiar el tipo, el sitio suele refrescarse, esperamos
      await newTab.waitForLoadState('load'); 
      await newTab.waitForTimeout(2000); 

      // Ingresar número de expediente
      const inputExpediente = newTab.locator('input[type="text"]').first();
      await inputExpediente.waitFor({ state: 'visible' });
      await inputExpediente.fill(exp.numero);

      // 5. Barrera de Seguridad (reCAPTCHA)
      console.log('\n⚠️ ACCIÓN REQUERIDA:');
      console.log('1. Resuelve el reCAPTCHA en la ventana del navegador.');
      console.log('2. Presiona ENTER en esta terminal cuando veas el check verde.');
      
      // Pausa para resolución manual
      await new Promise(resolve => process.stdin.once('data', resolve));

      // 6. Clic Final y Extracción
      await newTab.click('button:has-text("Buscar")');
      
      // Esperar a que cargue el iframe de resultados
      const iframeElement = await newTab.waitForSelector('iframe#Resultado');
      const frame = await iframeElement.contentFrame();
      
      await frame.waitForSelector('table', { timeout: 30000 });
      
      // Extraer contenido de la tabla de acuerdos
      const currentAgreements = await frame.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table tr'));
        // Filtramos solo filas que parecen tener acuerdos (contienen fechas o texto relevante)
        return rows.map(row => row.innerText.trim()).filter(text => text.length > 50);
      });

      // 7. Lógica de Persistencia (Sub-fase 1.2)
      const newAgreements = getNewAgreements(exp.numero, currentAgreements);
      
      if (newAgreements.length > 0) {
        console.log(`🔥 ¡SE DETECTARON ${newAgreements.length} ACUERDOS NUEVOS!`);
        newAgreements.forEach((acc, index) => {
          console.log(`   [${index + 1}] ${acc.substring(0, 100)}...`);
        });
        updateHistory(exp.numero, currentAgreements);
      } else {
        console.log('✅ No hay acuerdos nuevos desde la última revisión.');
      }
      
      // Guardar raw data para auditoría
      const outputDir = path.resolve('data/raw');
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
      const fileName = `${exp.numero.replace(/\//g, '-')}_${new Date().toISOString().split('T')[0]}.json`;
      fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(currentAgreements, null, 2));

    } catch (error) {
      console.error(`❌ Error procesando ${exp.numero}:`, error.message);
    }
  }

  console.log('\n✨ Proceso de NovaLex completado.');
}

runScraper();
