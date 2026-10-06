import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const files = [
  'index.html',
  'about.html',
  'ministry.html',
  'agency.html',
  'library.html',
  'blognugget.html',
  'contact.html'
];

// Pristine, elegant header matching the user's reference images:
// - Phone & Tablet (< 1024px): Brand on left, clean minimalist 3-line hamburger icon on right.
// - Laptop & Desktop (>= 1024px): Brand on left, ABOUT · MINISTRY · AGENCY · BOOKSHELF · INSIGHTS · [BOOK CONSULTATION] on right.
const newHeaderTemplate = (avatarImgTag) => `
<header class="fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-transparent">
  <div class="container-arc flex items-center justify-between py-4 md:py-5">
    <!-- Brand -->
    <a class="group flex items-center gap-3" aria-label="Eric Richson Darko — home" href="/index.html">
      <span class="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/15">
        ${avatarImgTag}
      </span>
      <span class="flex flex-col leading-none">
        <span class="font-display text-[0.95rem] font-semibold tracking-wide text-obsidian">Eric Richson Darko</span>
        <span class="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold">Architect of Capacity</span>
      </span>
    </a>

    <!-- Desktop / Laptop Navigation: Exactly matching 2nd reference image (lg: 1024px+) -->
    <nav class="hidden lg:flex items-center gap-8 xl:gap-9" aria-label="Main Navigation">
      <a class="nav-item-link relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 text-foreground/75 hover:text-foreground" href="/about.html">About</a>
      <a class="nav-item-link relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 text-foreground/75 hover:text-foreground" href="/ministry.html">Ministry</a>
      <a class="nav-item-link relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 text-foreground/75 hover:text-foreground" href="/agency.html">Agency</a>
      <a class="nav-item-link relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 text-foreground/75 hover:text-foreground" href="/library.html">Bookshelf</a>
      <a class="nav-item-link relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 text-foreground/75 hover:text-foreground" href="/blognugget.html">Insights</a>
      <a class="btn-gold !px-5 !py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]" href="/contact.html">Book Consultation</a>
    </nav>

    <!-- Phone & Tablet Hamburger Toggle: Exactly matching 1st reference image (< lg) -->
    <button id="mobileMenuBtn" type="button" class="flex h-10 w-10 items-center justify-center text-foreground hover:text-gold transition cursor-pointer lg:hidden" aria-label="Toggle navigation" aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-foreground">
        <line x1="4" x2="20" y1="12" y2="12"></line>
        <line x1="4" x2="20" y1="6" y2="6"></line>
        <line x1="4" x2="20" y1="18" y2="18"></line>
      </svg>
    </button>
  </div>
</header>
`.trim();

const newEnhancedCss = `
<style id="global-architectural-enhancements">
/* Mobile & Tablet navigation drawer */
#mobileNavDrawer {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(15, 43, 70, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
}
#mobileNavDrawer.is-open {
  display: block;
  opacity: 1;
}
#mobileNavContent {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 380px;
  background: #fbf9f5;
  border-left: 2px solid #c5a059;
  box-shadow: -10px 0 35px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.5rem;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
#mobileNavDrawer.is-open #mobileNavContent {
  transform: translateX(0);
}
.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e2ded4;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #0f2b46;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  line-height: 1;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #c5a059;
}
.mobile-nav-links {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 0.6rem;
  font-size: 0.88rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #1a1d20;
  border-bottom: 1px solid rgba(226, 222, 212, 0.6);
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.mobile-nav-link:hover {
  color: #c5a059;
  background: rgba(197, 160, 89, 0.08);
  padding-left: 0.85rem;
}
.mobile-nav-link.is-active {
  color: #0f2b46;
  background: rgba(15, 43, 70, 0.06);
  border-left: 3px solid #c5a059;
  font-weight: 700;
  padding-left: 0.85rem;
}
.nav-num {
  font-size: 0.7rem;
  font-family: monospace;
  color: #c5a059;
  font-weight: 700;
}
.mobile-nav-footer {
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e2ded4;
}
.drawer-consult-btn {
  display: block;
  text-align: center;
  background: #0f2b46;
  color: #f8f6f0;
  padding: 0.85rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  text-decoration: none;
  margin-bottom: 0.75rem;
  border-radius: 4px;
  transition: background 0.2s;
}
.drawer-consult-btn:hover {
  background: #163a5d;
}
.drawer-store-btn {
  display: block;
  text-align: center;
  background: rgba(197, 160, 89, 0.15);
  color: #0f2b46;
  border: 1px solid #c5a059;
  padding: 0.75rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  text-decoration: none;
  margin-bottom: 1.25rem;
  border-radius: 4px;
  transition: all 0.2s;
}
.drawer-store-btn:hover {
  background: #c5a059;
  color: #0f2b46;
}
.drawer-contact-info {
  font-size: 0.75rem;
  color: #555;
  line-height: 1.8;
}
.contact-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}
.contact-label {
  color: #888;
  font-weight: 500;
}
.contact-val {
  color: #0f2b46;
  font-weight: 600;
  text-decoration: none;
}
.contact-val:hover {
  color: #c5a059;
}

/* Floating WhatsApp Quick Action */
#floatingQuickConnect {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;
}
#floatingQuickConnect a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #0f2b46;
  color: #f8f6f0;
  padding: 0.65rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid rgba(197, 160, 89, 0.6);
  box-shadow: 0 8px 24px rgba(15, 43, 70, 0.25);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
#floatingQuickConnect a:hover {
  background: #163a5d;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 43, 70, 0.35);
  border-color: #c5a059;
}

/* Header glass effect on scroll */
header.scrolled {
  background: rgba(250, 248, 245, 0.96) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(226, 222, 212, 0.8) !important;
  box-shadow: 0 4px 20px -2px rgba(15, 43, 70, 0.08) !important;
}

/* Copy tooltip on ministry page */
.copy-tooltip {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #0f2b46;
  color: #f8f6f0;
  border: 1px solid #c5a059;
  padding: 0.65rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border-radius: 4px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  z-index: 10000;
  animation: tooltipFade 0.25s ease-out;
}
@keyframes tooltipFade {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>
`.trim();

const newScriptBlock = `
    // Mobile & Tablet Navigation Drawer Architecture
    (function() {
      const currentPath = (window.location.pathname || '').toLowerCase();

      // 1. Highlight Active Desktop/Laptop Navigation Link
      const navLinks = document.querySelectorAll('nav .nav-item-link');
      navLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href && (currentPath.includes(href.replace('.html', '').replace('/', '')) || (href.includes('index') && (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '')))) {
          link.classList.add('text-gold', 'font-semibold');
          link.classList.remove('text-foreground/75');
        }
      });

      // 2. Setup Mobile/Tablet Navigation Drawer
      let drawer = document.getElementById('mobileNavDrawer');
      if (!drawer) {
        drawer = document.createElement('div');
        drawer.id = 'mobileNavDrawer';
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.innerHTML = \`
          <div id="mobileNavContent">
            <div class="mobile-nav-header">
              <div style="display: flex; flex-direction: column;">
                <span style="font-family: Georgia, serif; font-size: 1.05rem; font-weight: 700; color: #0f2b46;">Eric Richson Darko</span>
                <span style="font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059;">Architect of Capacity</span>
              </div>
              <button id="closeMobileNavBtn" class="close-btn" aria-label="Close navigation">&times;</button>
            </div>
            <nav class="mobile-nav-links" aria-label="Mobile Navigation Links">
              <a class="mobile-nav-link \${currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '' ? 'is-active' : ''}" href="/index.html">
                <span class="nav-num">01</span><span>Home</span>
              </a>
              <a class="mobile-nav-link \${currentPath.includes('about') ? 'is-active' : ''}" href="/about.html">
                <span class="nav-num">02</span><span>About Eric</span>
              </a>
              <a class="mobile-nav-link \${currentPath.includes('ministry') ? 'is-active' : ''}" href="/ministry.html">
                <span class="nav-num">03</span><span>Ministry &amp; Network</span>
              </a>
              <a class="mobile-nav-link \${currentPath.includes('agency') ? 'is-active' : ''}" href="/agency.html">
                <span class="nav-num">04</span><span>Richson Creatives (Agency)</span>
              </a>
              <a class="mobile-nav-link \${currentPath.includes('library') ? 'is-active' : ''}" href="/library.html">
                <span class="nav-num">05</span><span>Bookshelf &amp; Store</span>
              </a>
              <a class="mobile-nav-link \${currentPath.includes('blognugget') ? 'is-active' : ''}" href="/blognugget.html">
                <span class="nav-num">06</span><span>Insights &amp; Nuggets</span>
              </a>
              <a class="mobile-nav-link \${currentPath.includes('contact') ? 'is-active' : ''}" href="/contact.html">
                <span class="nav-num">07</span><span>Contact &amp; Bookings</span>
              </a>
            </nav>
            <div class="mobile-nav-footer">
              <a href="/contact.html" class="drawer-consult-btn">Book Consultation</a>
              <a href="https://selar.com/m/richsonericdarko" target="_blank" rel="noopener noreferrer" class="drawer-store-btn">Browse Selar Bookstore ↗</a>
              <div class="drawer-contact-info">
                <div class="contact-row">
                  <span class="contact-label">WhatsApp:</span>
                  <a href="https://wa.me/233262685856" target="_blank" rel="noopener noreferrer" class="contact-val">+233 262 685 856</a>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Telephone:</span>
                  <a href="tel:+233262685856" class="contact-val">+233 262 685 856</a>
                </div>
                <div class="contact-row">
                  <span class="contact-label">Email:</span>
                  <a href="mailto:richson20@gmail.com" class="contact-val">richson20@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        \`;
        document.body.appendChild(drawer);
      }

      function openDrawer() {
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      function closeDrawer() {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }

      // Wire all menu toggle buttons
      document.querySelectorAll('#mobileMenuBtn, header button[aria-label="Toggle navigation"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          openDrawer();
        });
      });

      const closeBtn = document.getElementById('closeMobileNavBtn');
      if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

      drawer.addEventListener('click', function(e) {
        if (e.target === drawer) closeDrawer();
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
      });

      // Header scroll glass listener
      const header = document.querySelector('header');
      if (header) {
        window.addEventListener('scroll', function() {
          if (window.scrollY > 20) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }, { passive: true });
      }
    })();
`.trim();

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping non-existent file: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Extract avatar img tag from existing header
  const avatarMatch = content.match(/<span class="relative block h-1[01] w-1[01] shrink-0 overflow-hidden rounded-full ring-1 ring-foreground\/15">\s*(<img[\s\S]*?>)\s*<\/span>/);
  const avatarImgTag = avatarMatch ? avatarMatch[1] : `<img src="/favicon.ico" alt="Eric Richson Darko" class="h-full w-full object-cover">`;

  // 2. Replace <header ... </header>
  const headerRegex = /<header[\s\S]*?<\/header>/;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, newHeaderTemplate(avatarImgTag));
    console.log(`[${file}] Replaced header structure cleanly.`);
  }

  // 3. Replace <style id="global-architectural-enhancements"> ... </style>
  const styleRegex = /<style id="global-architectural-enhancements">[\s\S]*?<\/style>/;
  if (styleRegex.test(content)) {
    content = content.replace(styleRegex, newEnhancedCss);
    console.log(`[${file}] Replaced global-architectural-enhancements CSS.`);
  }

  // 4. Replace the mobile drawer script block
  const oldScriptStart = content.indexOf('// Enhanced Mobile Navigation & Drawer Architecture');
  const fallbackScriptStart = content.indexOf('// Mobile & Tablet Navigation Drawer Architecture');
  const actualScriptStart = oldScriptStart !== -1 ? oldScriptStart : fallbackScriptStart;
  const oldScriptEnd = content.indexOf('// 3. Setup Floating Quick Connect Action');

  if (actualScriptStart !== -1 && oldScriptEnd !== -1 && oldScriptEnd > actualScriptStart) {
    const before = content.slice(0, actualScriptStart);
    const after = content.slice(oldScriptEnd);
    content = before + newScriptBlock + '\n    ' + after;
    console.log(`[${file}] Replaced mobile drawer JavaScript cleanly.`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[${file}] Updated to clean, elegant layout matching reference images.`);
});

console.log('All files updated successfully to match reference designs!');
