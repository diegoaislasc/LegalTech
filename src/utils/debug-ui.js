import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:3000');
    // Esperar a que la animación termine (aprox 2s)
    await page.waitForTimeout(2000);
    
    const title = await page.locator('h1.split-parent');
    
    // Tomar captura del área del título
    await title.screenshot({ path: 'reports/debug_title_clip.png' });
    
    // Obtener estilos que podrían causar el recorte
    const styles = await title.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const firstChar = el.querySelector('.split-char');
      const charComputed = firstChar ? window.getComputedStyle(firstChar) : null;
      
      return {
        overflow: computed.overflow,
        lineHeight: computed.lineHeight,
        paddingBottom: computed.paddingBottom,
        display: computed.display,
        charHeight: charComputed?.height,
        charOverflow: charComputed?.overflow
      };
    });
    
    console.log('Computed Styles:', JSON.stringify(styles, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
