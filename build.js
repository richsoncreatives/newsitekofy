import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');

console.log('[Build] Preparing dist directory for Cloudflare Pages / Static Hosting...');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

const htmlFiles = [
  'index.html',
  'about.html',
  'ministry.html',
  'library.html',
  'blognugget.html',
  'contact.html',
  'agency.html'
];

// Copy core HTML files to dist
htmlFiles.forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
    console.log(`[Build] Copied ${file} -> dist/${file}`);
  }
});

// Create clean URL directories (e.g., dist/about/index.html) so Cloudflare serves clean URLs directly
const cleanRoutes = {
  'about': 'about.html',
  'ministry': 'ministry.html',
  'library': 'library.html',
  'blognugget': 'blognugget.html',
  'contact': 'contact.html',
  'agency': 'agency.html'
};

for (const [route, sourceFile] of Object.entries(cleanRoutes)) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(path.join(__dirname, sourceFile), path.join(routeDir, 'index.html'));
  console.log(`[Build] Created clean route directory: dist/${route}/index.html`);
}

// Create Cloudflare Pages _redirects file
const redirectsContent = `/about /about.html 200
/ministry /ministry.html 200
/agency /agency.html 200
/library /library.html 200
/blognugget /blognugget.html 200
/contact /contact.html 200
`;

fs.writeFileSync(path.join(__dirname, '_redirects'), redirectsContent, 'utf8');
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent, 'utf8');
console.log('[Build] Created _redirects for Cloudflare Pages');

// Create Cloudflare Pages _headers file
const headersContent = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: document-domain=()
`;

fs.writeFileSync(path.join(__dirname, '_headers'), headersContent, 'utf8');
fs.writeFileSync(path.join(distDir, '_headers'), headersContent, 'utf8');
console.log('[Build] Created _headers for Cloudflare Pages');

// Copy README and documentation if present
['README.md', 'metadata.json', 'CLOUDFLARE_DEPLOYMENT.md', 'wrangler.toml', '.nvmrc'].forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
  }
});

// Note: Cloudflare Pages compiles functions from /functions at project root.
// We explicitly do not place functions inside dist/ to comply with Cloudflare Pages requirements.

console.log('[Build] Build complete! Cloudflare Pages output directory "dist" is ready.');

