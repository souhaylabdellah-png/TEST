// Renders the SVG thumbnail to a 1280x720 PNG using the pre-installed Chromium.
// Usage: node render.mjs [in.svg] [out.png]
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// playwright may only be installed globally in this environment; ESM won't honour NODE_PATH.
const require = createRequire(import.meta.url);
const { chromium } = (() => {
  for (const id of ['playwright', '/opt/node22/lib/node_modules/playwright']) {
    try { return require(id); } catch { /* try next */ }
  }
  throw new Error('playwright not found (tried local and /opt/node22 global install)');
})();

const here = dirname(fileURLToPath(import.meta.url));
const input = resolve(here, process.argv[2] ?? 'tangier-marathon.svg');
const output = resolve(here, process.argv[3] ?? 'tangier-marathon-thumbnail.png');

const svg = readFileSync(input, 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.setContent(
  `<style>html,body{margin:0;padding:0;background:#000;overflow:hidden}svg{display:block}</style>${svg}`,
  { waitUntil: 'load' }
);
await page.waitForTimeout(400); // let the emoji font settle
await page.screenshot({ path: output, clip: { x: 0, y: 0, width: 1280, height: 720 } });
await browser.close();
console.log(`wrote ${output}`);
