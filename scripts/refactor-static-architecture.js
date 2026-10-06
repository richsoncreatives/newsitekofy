import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pageConfigs = [
  {
    file: 'index.html',
    title: 'Eric Richson Darko: Executive & Creative Archive',
    canonical: '/index.html',
    urlName: 'index.html'
  },
  {
    file: 'about.html',
    title: 'About | Eric Richson Darko: Executive & Creative Archive',
    canonical: '/about.html',
    urlName: 'about.html'
  },
  {
    file: 'ministry.html',
    title: 'Ministry | Eric Richson Darko: Executive & Creative Archive',
    canonical: '/ministry.html',
    urlName: 'ministry.html'
  },
  {
    file: 'agency.html',
    title: 'Agency | Richson Creatives · Brand & Digital Architecture',
    canonical: '/agency.html',
    urlName: 'agency.html'
  },
  {
    file: 'library.html',
    title: 'Bookshelf & Store | Eric Richson Darko: Executive & Creative Archive',
    canonical: '/library.html',
    urlName: 'library.html'
  },
  {
    file: 'blognugget.html',
    title: 'Insights & Nuggets | Eric Richson Darko: Executive & Creative Archive',
    canonical: '/blognugget.html',
    urlName: 'blognugget.html'
  },
  {
    file: 'contact.html',
    title: 'Contact & Bookings | Eric Richson Darko: Executive & Creative Archive',
    canonical: '/contact.html',
    urlName: 'contact.html'
  }
];

pageConfigs.forEach(cfg => {
  const filePath = path.join(rootDir, cfg.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${cfg.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove SingleFile trailing slashes or malformed comment URLs
  content = content.replace(/url:\s*[^\s\n\r]+\s*/i, `url: ${cfg.urlName} `);

  // 2. Remove " (Copy)" from anywhere in meta/titles
  content = content.replace(/\s*\(Copy\)/g, '');

  // 3. Fix canonical link to point to this specific standalone file
  const canonicalRegex = /<link[^>]*rel=["']?canonical["']?[^>]*>|<link[^>]*href=["'][^"']*["'][^>]*rel=["']?canonical["']?[^>]*>/i;
  const canonicalTag = `<link href="${cfg.canonical}" rel="canonical">`;
  if (canonicalRegex.test(content)) {
    content = content.replace(canonicalRegex, canonicalTag);
  } else {
    content = content.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // 4. Fix og:url and twitter:url to point to this specific file
  content = content.replace(/<meta[^>]*property=["']?og:url["']?[^>]*>/i, `<meta content="${cfg.canonical}" property="og:url">`);
  content = content.replace(/<meta[^>]*name=["']?twitter:url["']?[^>]*>/i, `<meta content="${cfg.canonical}" name="twitter:url">`);

  // 5. Fix JSON-LD WebSite schema url
  content = content.replace(/("@type":"WebSite","url":)"[^"]*"/g, `$1"${cfg.canonical}"`);

  // 6. Ensure all navigation links are clean standalone paths without trailing slashes
  content = content.replace(/href=["']index\.html\/["']/g, 'href="/index.html"');
  content = content.replace(/href=["']about\.html\/["']/g, 'href="/about.html"');
  content = content.replace(/href=["']ministry\.html\/["']/g, 'href="/ministry.html"');
  content = content.replace(/href=["']agency\.html\/["']/g, 'href="/agency.html"');
  content = content.replace(/href=["']library\.html\/["']/g, 'href="/library.html"');
  content = content.replace(/href=["']blognugget\.html\/["']/g, 'href="/blognugget.html"');
  content = content.replace(/href=["']contact\.html\/["']/g, 'href="/contact.html"');

  // Fix any malformed strings like agency.html-portfolio if present
  content = content.replace(/agency\.html-portfolio/g, 'agency.html');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[${cfg.file}] Refactored successfully.`);
});

// Remove any remaining worker/wrangler/redirects artifacts
const filesToDelete = [
  path.join(rootDir, 'wrangler.toml'),
  path.join(rootDir, '_redirects'),
  path.join(rootDir, 'dist', 'wrangler.toml'),
  path.join(rootDir, 'dist', '_redirects')
];

filesToDelete.forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log(`Deleted file: ${f}`);
  }
});

const functionsDir = path.join(rootDir, 'functions');
if (fs.existsSync(functionsDir)) {
  fs.rmSync(functionsDir, { recursive: true, force: true });
  console.log('Deleted functions directory.');
}

const distFunctionsDir = path.join(rootDir, 'dist', 'functions');
if (fs.existsSync(distFunctionsDir)) {
  fs.rmSync(distFunctionsDir, { recursive: true, force: true });
  console.log('Deleted dist/functions directory.');
}

console.log('Static refactor complete!');
