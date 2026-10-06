import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

console.log('[Build] Verifying standalone static HTML files for Cloudflare Pages & GitHub...');

const htmlFiles = [
  'index.html',
  'about.html',
  'ministry.html',
  'library.html',
  'blognugget.html',
  'contact.html',
  'agency.html'
];

// Clean and prepare dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Verify and copy flat standalone HTML files to dist
htmlFiles.forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
    console.log(`[Build] Verified standalone file: ${file} -> dist/${file}`);
  } else {
    console.error(`[Build] Missing required file: ${file}`);
  }
});

// Copy documentation and metadata
['README.md', 'metadata.json', 'CLOUDFLARE_DEPLOYMENT.md', '.nvmrc', '.node-version'].forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
  }
});

console.log('[Build] Complete: Flat standalone static files ready for Cloudflare Pages (root "/" or "dist").');
