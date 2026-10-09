// Install Playwright locally or set PLAYWRIGHT_MODULE to an existing installation.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

(async () => {
  const base = process.env.SITE_URL || 'http://127.0.0.1:8874';
  const output = process.env.SCREENSHOT_DIR || 'outputs/website';
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  try {
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(base);
    assert.equal(response.status(), 200);
    assert.match(await page.title(), /ProcessPrefBench/);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const widths = [320, 375, 390, 430, 768, 1280];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 844 });
      const audit = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        links: [...document.querySelectorAll('.resource')].map(a => {
          const r = a.getBoundingClientRect();
          return { width: r.width, height: r.height, bottom: r.bottom };
        }),
        brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a =>
          a.hash && !document.getElementById(a.hash.slice(1))).map(a => a.hash)
      }));
      assert.equal(audit.overflow, false, `Horizontal overflow at ${width}px`);
      assert.equal(audit.links.length, 4);
      assert.ok(audit.links.every(a => a.height >= 44 && a.width >= 44));
      if (width === 390) assert.ok(audit.links.every(a => a.bottom <= 844), 'All four resources must fit first screen');
      assert.deepEqual(audit.brokenAnchors, []);
      if (width === 390 || width === 1280) {
        await page.screenshot({ path: path.join(output, `${width}.png`), fullPage: true });
        if (width === 390) await page.screenshot({ path: path.join(output, 'mobile-first-screen.png') });
      }
    }
    await page.locator('a.resource[href="#product"]').click();
    assert.equal(new URL(page.url()).hash, '#product');
    await page.locator('a.resource[href="#contact"]').click();
    assert.equal(new URL(page.url()).hash, '#contact');
    assert.equal(await page.locator('.email-link').getAttribute('href'), 'mailto:getupyang@gmail.com');
    await page.locator('.copy-email').click();
    await page.waitForFunction(() => document.querySelector('.copy-status').textContent.length > 0);
    assert.equal(await page.locator('.copy-status').textContent(), 'Email address copied.');
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'getupyang@gmail.com');
    await page.locator('.citation summary').click();
    assert.equal(await page.locator('.citation').getAttribute('open'), '');
    const pdf = await page.evaluate(async () => {
      const response = await fetch('paper.pdf', { signal: AbortSignal.timeout(60000) });
      const body = new Uint8Array(await response.arrayBuffer());
      const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', body));
      return { status: response.status, magic: new TextDecoder().decode(body.slice(0, 5)), bytes: body.length,
        sha256: [...digest].map(n => n.toString(16).padStart(2, '0')).join('') };
    });
    assert.equal(pdf.status, 200);
    assert.equal(pdf.magic, '%PDF-');
    assert.ok(pdf.bytes > 100000);
    const localPdf = fs.readFileSync(path.join(__dirname, '../website/paper.pdf'));
    assert.equal(pdf.sha256, crypto.createHash('sha256').update(localPdf).digest('hex'));
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const staticPage = await noJs.newPage();
    await staticPage.goto(base);
    assert.equal(await staticPage.locator('.resource').count(), 4);
    assert.equal(await staticPage.locator('.copy-email').isVisible(), false);
    assert.equal(await staticPage.locator('h1').isVisible(), true);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ passed: true, base, widths, paperBytes: pdf.bytes, paperSha256: pdf.sha256,
      checked: ['no horizontal overflow', 'four first-screen mobile resources', '44px tap targets',
        'section navigation', 'email link and clipboard', 'citation disclosure', 'real PDF', 'no-JS fallback'], errors }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
