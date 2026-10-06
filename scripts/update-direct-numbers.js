import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('[PhoneUpdate] Updating direct inquiries to +233262685856 / @richsonericdarko across all files...');

const files = [
  'index.html',
  'about.html',
  'ministry.html',
  'library.html',
  'blognugget.html',
  'contact.html',
  'agency.html'
];

files.forEach(fileName => {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace QR WhatsApp links with direct wa.me/233262685856 link
  content = content.replace(
    /https:\/\/api\.whatsapp\.com\/qr\/TKRY5QBY542CD1\?autoload=1(&amp;|&)app_absent=0/g,
    'https://wa.me/233262685856?text=Hello%20Eric,%20I%20would%20like%20to%20make%20a%20direct%20inquiry'
  );

  // Replace any existing wa.me/233548685856 with wa.me/233262685856 for direct inquiries
  content = content.replace(/https:\/\/wa\.me\/233548685856/g, 'https://wa.me/233262685856');

  // In library.html, update the hero button text if needed
  if (fileName === 'library.html') {
    content = content.replace(
      />\s*<svg[^>]*class="[^"]*lucide-shopping-bag[^"]*"[^>]*><\/svg>\s*Direct Order — WhatsApp\s*<\/a>/gi,
      '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Direct WhatsApp Order (+233 262 685 856)</a>'
    );
  }

  // Update global floating script text to reflect +233262685856 and @richsonericdarko
  content = content.replace(
    /WhatsApp:\s*<a href="https:\/\/wa\.me\/233\d+"[^>]*>\+233\s*\d+\s*\d+\s*\d+<\/a>/gi,
    'WhatsApp: <a href="https://wa.me/233262685856" style="color: #0f2b46; font-weight: 600; text-decoration: none;">+233 262 685 856 (@richsonericdarko)</a>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[PhoneUpdate] Updated ${fileName}`);
});

console.log('[PhoneUpdate] All files updated with +233262685856 / @richsonericdarko!');
