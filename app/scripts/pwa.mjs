// Fügt die PWA-Bausteine in den fertigen Web-Export (dist/) ein:
//  - kopiert Manifest, Service-Worker und App-Icon nach dist/
//  - trägt die nötigen <head>-Tags und die Service-Worker-Registrierung
//    in dist/index.html ein
// Aufruf nach "expo export --platform web":  node scripts/pwa.mjs
import { copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const appDir = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(appDir, 'dist');

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html fehlt – bitte zuerst "expo export --platform web" ausführen.');
  process.exit(1);
}

copyFileSync(join(appDir, 'web', 'manifest.webmanifest'), join(dist, 'manifest.webmanifest'));
copyFileSync(join(appDir, 'web', 'sw.js'), join(dist, 'sw.js'));
copyFileSync(join(appDir, 'web', 'map.html'), join(dist, 'map.html'));
copyFileSync(join(appDir, 'assets', 'icon.png'), join(dist, 'icon-1024.png'));

const head = [
  '<link rel="manifest" href="manifest.webmanifest"/>',
  '<meta name="theme-color" content="#7b5fb8"/>',
  '<meta name="mobile-web-app-capable" content="yes"/>',
  '<meta name="apple-mobile-web-app-capable" content="yes"/>',
  '<meta name="apple-mobile-web-app-status-bar-style" content="default"/>',
  '<meta name="apple-mobile-web-app-title" content="Shevality"/>',
  '<link rel="apple-touch-icon" href="icon-1024.png"/>',
].join('');

const swReg =
  '<script>if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){});});}</script>';

let html = readFileSync(join(dist, 'index.html'), 'utf8');
if (!html.includes('rel="manifest"')) html = html.replace('</head>', head + '</head>');
if (!html.includes('serviceWorker')) html = html.replace('</body>', swReg + '</body>');
writeFileSync(join(dist, 'index.html'), html);

console.log('PWA-Dateien eingefügt (manifest, sw, icon, meta-tags).');
