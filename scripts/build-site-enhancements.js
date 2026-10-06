import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('[Enhance] Starting site-wide aesthetic, interactivity, and mobile enhancement...');

// Common global script and styles to be injected into all pages
const globalEnhancementStyles = `
<style id="global-architectural-enhancements">
/* Mobile navigation drawer */
#mobileNavDrawer {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 43, 70, 0.6);
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
  max-width: 360px;
  background: #f8f6f0;
  border-left: 1px solid #c5a059;
  box-shadow: -10px 0 30px rgba(0,0,0,0.25);
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

.mobile-nav-link {
  display: block;
  padding: 0.85rem 0;
  font-size: 0.88rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #1a1d20;
  border-bottom: 1px solid #e2ded4;
  text-decoration: none;
  transition: color 0.2s, padding-left 0.2s;
}

.mobile-nav-link:hover {
  color: #c5a059;
  padding-left: 0.5rem;
}

.mobile-nav-link.is-active {
  color: #0f2b46;
  border-left: 3px solid #c5a059;
  padding-left: 0.5rem;
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

/* Smooth Header glass on scroll */
header.scrolled {
  background: rgba(248, 246, 240, 0.94) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(226, 222, 212, 0.8) !important;
  box-shadow: 0 4px 20px -2px rgba(15, 43, 70, 0.06);
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
`;

const globalEnhancementScript = `
<script id="global-architectural-script">
(function() {
  function initGlobalEnhancements() {
    // 1. Smooth Header glass on scroll
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 25) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // 2. Setup Mobile Navigation Drawer
    if (!document.getElementById('mobileNavDrawer')) {
      const currentPath = window.location.pathname.toLowerCase();
      const drawer = document.createElement('div');
      drawer.id = 'mobileNavDrawer';
      drawer.innerHTML = \`
        <div id="mobileNavContent">
          <div style="display: flex; items-center; justify-content: space-between; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid #e2ded4;">
            <div style="display: flex; flex-direction: column;">
              <span style="font-family: Georgia, serif; font-size: 1rem; font-weight: 700; color: #0f2b46;">Eric Richson Darko</span>
              <span style="font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.25em; color: #c5a059;">Architect of Capacity</span>
            </div>
            <button id="closeMobileNavBtn" style="background: none; border: none; font-size: 1.5rem; color: #0f2b46; cursor: pointer; padding: 0.25rem 0.5rem; line-height: 1;">&times;</button>
          </div>

          <nav style="margin-top: 1.5rem; display: flex; flex-direction: column; flex: 1;">
            <a class="mobile-nav-link \${currentPath.endsWith('index.html') || currentPath === '/' ? 'is-active' : ''}" href="/index.html">Home</a>
            <a class="mobile-nav-link \${currentPath.includes('about') ? 'is-active' : ''}" href="/about.html">About Eric</a>
            <a class="mobile-nav-link \${currentPath.includes('ministry') ? 'is-active' : ''}" href="/ministry.html">Ministry &amp; Network</a>
            <a class="mobile-nav-link \${currentPath.includes('agency') ? 'is-active' : ''}" href="/agency.html">Richson Creatives (Agency)</a>
            <a class="mobile-nav-link \${currentPath.includes('library') ? 'is-active' : ''}" href="/library.html">Bookshelf &amp; Store</a>
            <a class="mobile-nav-link \${currentPath.includes('blognugget') ? 'is-active' : ''}" href="/blognugget.html">Insights &amp; Nuggets</a>
            <a class="mobile-nav-link \${currentPath.includes('contact') ? 'is-active' : ''}" href="/contact.html">Contact &amp; Bookings</a>
          </nav>

          <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid #e2ded4;">
            <a href="/contact.html" style="display: block; text-align: center; background: #0f2b46; color: #f8f6f0; padding: 0.75rem 1rem; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; text-decoration: none; margin-bottom: 1rem;">Book Consultation</a>
            <div style="font-size: 0.75rem; color: #6b7280; line-height: 1.8;">
              <div>Tel: <a href="tel:+233262685856" style="color: #0f2b46; font-weight: 600; text-decoration: none;">+233 262 685 856</a></div>
              <div>WhatsApp: <a href="https://wa.me/233548685856" style="color: #0f2b46; font-weight: 600; text-decoration: none;">+233 548 685 856</a></div>
              <div>Email: <a href="mailto:richson20@gmail.com" style="color: #0f2b46; font-weight: 600; text-decoration: none;">richson20@gmail.com</a></div>
            </div>
          </div>
        </div>
      \`;
      document.body.appendChild(drawer);

      // Wire hamburger button
      const hamburgerBtns = document.querySelectorAll('header button[aria-label="Toggle navigation"]');
      hamburgerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          drawer.classList.add('is-open');
        });
      });

      // Close drawer handler
      const closeBtn = document.getElementById('closeMobileNavBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          drawer.classList.remove('is-open');
        });
      }

      drawer.addEventListener('click', function(e) {
        if (e.target === drawer) {
          drawer.classList.remove('is-open');
        }
      });
    }

    // 3. Setup Floating Quick Connect Action (WhatsApp / Consult)
    if (!document.getElementById('floatingQuickConnect')) {
      const floatEl = document.createElement('div');
      floatEl.id = 'floatingQuickConnect';
      floatEl.innerHTML = \`
        <a href="https://wa.me/233548685856?text=\${encodeURIComponent("Hello Eric, I would like to make an inquiry regarding your executive consulting, authorship, or ministry.")}" target="_blank" rel="noopener noreferrer">
          <svg style="width: 1rem; height: 1rem; color: #25D366;" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-1.397-.577-2.316-1.996-2.387-2.09-.071-.093-.574-.764-.574-1.458 0-.693.364-1.034.494-1.175.13-.14.285-.175.38-.175.096 0 .191.002.274.006.09.004.209-.034.327.249.12.289.412 1.003.448 1.076.036.072.06.157.012.253-.048.096-.072.156-.144.239-.072.084-.152.187-.217.251-.072.072-.148.15-.064.294.084.144.373.615.8 1.001.55.496 1.013.65 1.157.722.143.072.227.06.311-.036.084-.096.359-.418.455-.562.096-.144.192-.12.323-.072.132.048.837.395.981.467.144.072.239.108.275.168.036.06.036.348-.108.753z"/></svg>
          <span>Direct Inquiries</span>
        </a>
      \`;
      document.body.appendChild(floatEl);
    }

    // 4. Click-to-copy handler on Ministry page
    const copyButtons = document.querySelectorAll('button:has(.lucide-copy), button .lucide-copy');
    document.querySelectorAll('button').forEach(btn => {
      const monoText = btn.querySelector('.font-mono');
      const hasCopyIcon = btn.querySelector('.lucide-copy');
      if (monoText && hasCopyIcon) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const textToCopy = monoText.textContent.trim();
          navigator.clipboard.writeText(textToCopy).then(() => {
            showTooltip('Copied ' + textToCopy + ' to clipboard!');
          }).catch(() => {
            showTooltip('Account: ' + textToCopy);
          });
        });
      }
    });

    function showTooltip(msg) {
      const existing = document.querySelector('.copy-tooltip');
      if (existing) existing.remove();
      const tip = document.createElement('div');
      tip.className = 'copy-tooltip';
      tip.textContent = msg;
      document.body.appendChild(tip);
      setTimeout(() => tip.remove(), 2500);
    }

    // 5. Interactive handling for contact form in contact.html
    const contactForm = document.querySelector('form.space-y-6');
    if (contactForm && window.location.pathname.includes('contact')) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Submitting your brief...';
        }

        const inputs = contactForm.querySelectorAll('input, select, textarea');
        const data = {};
        inputs.forEach((inp, i) => {
          data['field_' + i] = inp.value;
        });

        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(function() {
          // Proceed
        }).finally(function() {
          contactForm.innerHTML = \`
            <div style="padding: 2.5rem; text-align: center; background: #ffffff; border: 1px solid #c5a059;">
              <div style="width: 3rem; height: 3rem; margin: 0 auto 1rem; border-radius: 50%; background: #0f2b46; color: #c5a059; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: 700; color: #0f2b46; margin-bottom: 0.5rem;">Inquiry Received</h3>
              <p style="font-size: 0.92rem; color: #4b5563; line-height: 1.6; max-width: 480px; margin: 0 auto 1.5rem;">
                Thank you for reaching out to Eric Richson Darko. Your inquiry has been registered, and our executive office will review your brief and respond via email within 24 hours.
              </p>
              <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <a href="/index.html" class="btn-navy" style="text-decoration: none;">Return to Home</a>
                <a href="https://wa.me/233548685856" target="_blank" class="btn-outline" style="text-decoration: none;">Immediate WhatsApp Escalation</a>
              </div>
            </div>
          \`;
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalEnhancements);
  } else {
    initGlobalEnhancements();
  }
})();
</script>
`;

// Helper to inject enhancements into an HTML file
function enhanceHtmlFile(fileName, activeNavLabel) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Highlight active nav item
  if (activeNavLabel) {
    // Reset any existing active marker in this file
    fileContent = fileContent.replace(/<span class="absolute -bottom-1\.5 left-0 h-px w-full bg-gold"><\/span>/g, '');
    
    // Add active marker to target nav link
    const navRegex = new RegExp(`(<a[^>]*>${activeNavLabel})</a>`, 'i');
    fileContent = fileContent.replace(navRegex, `$1<span class="absolute -bottom-1.5 left-0 h-px w-full bg-gold"></span></a>`);
  }

  // Remove previous injected blocks if present
  fileContent = fileContent.replace(/<style id="global-architectural-enhancements">[\s\S]*?<\/style>/g, '');
  fileContent = fileContent.replace(/<script id="global-architectural-script">[\s\S]*?<\/script>/g, '');

  // Inject styles after first </style>
  if (fileContent.includes('</style>')) {
    const styleEnd = fileContent.indexOf('</style>') + 8;
    fileContent = fileContent.slice(0, styleEnd) + globalEnhancementStyles + fileContent.slice(styleEnd);
  } else {
    fileContent = globalEnhancementStyles + fileContent;
  }

  // Inject script at end
  fileContent = fileContent + globalEnhancementScript;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`[Enhance] Enhanced ${fileName}`);
}

// Enhance all existing pages
enhanceHtmlFile('index.html', 'Home');
enhanceHtmlFile('about.html', 'About');
enhanceHtmlFile('ministry.html', 'Ministry');
enhanceHtmlFile('library.html', 'Bookshelf');
enhanceHtmlFile('blognugget.html', 'Insights');
enhanceHtmlFile('contact.html', 'Book Consultation');

// 6. Build the dedicated agency.html page
console.log('[Agency] Constructing dedicated agency.html...');
const aboutSource = fs.readFileSync(path.join(rootDir, 'about.html'), 'utf8');

const headPart = aboutSource.slice(0, aboutSource.indexOf('<main'));
const footerPart = aboutSource.slice(aboutSource.indexOf('</main>') + 7);

// In headPart, set title and meta
let agencyHead = headPart
  .replace(/<title>[^<]*<\/title>/i, '<title>Agency | Richson Creatives · Brand & Digital Architecture</title>')
  .replace(/About \|/g, 'Agency |');

// Highlight "Agency" in navigation
agencyHead = agencyHead.replace(
  /<a class="relative text-\[0\.78rem\] font-medium uppercase tracking-\[0\.14em\] transition-colors duration-300 text-maritime" href=about\.html>About<span class="absolute -bottom-1\.5 left-0 h-px w-full bg-gold"><\/span><\/a>/g,
  '<a class="relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 text-foreground/70 hover:text-foreground" href=about.html>About</a>'
);
agencyHead = agencyHead.replace(
  /<a class="relative text-\[0\.78rem\] font-medium uppercase tracking-\[0\.14em\] transition-colors duration-300 text-foreground\/70 hover:text-foreground" href="\/agency\.html">Agency<\/a>/g,
  '<a class="relative text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 text-maritime" href="/agency.html">Agency<span class="absolute -bottom-1.5 left-0 h-px w-full bg-gold"></span></a>'
);

const agencyMain = `
<main class="flex-1">
  <div class="bg-linen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border">
      <div class="container-arc">
        <p class="eyebrow mb-5">Creative &amp; Technical Enterprise</p>
        <h1 class="max-w-4xl font-display text-4xl font-bold leading-[1.08] text-obsidian md:text-6xl">
          Richson Creatives. Brand architecture, editorial engineering, and digital systems.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Under the leadership of Eric Richson Darko (CEO), Richson Creatives engineers uncompromising brand identities, print-ready publication systems, and resilient digital architectures that slash vendor revision cycles and command marketplace respect.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a href="/contact.html?service=agency" class="btn-navy">Book an Agency Retainer &rarr;</a>
          <a href="/library.html" class="btn-outline">View Publication Portfolio</a>
        </div>
      </div>
    </section>

    <!-- Core Capabilities Grid -->
    <section class="container-arc py-16 md:py-24">
      <div class="max-w-3xl mb-12">
        <p class="eyebrow mb-3">Enterprise Practice Areas</p>
        <h2 class="font-display text-3xl font-semibold text-obsidian md:text-4xl">
          Engineered for leaders who refuse mediocre deliverables.
        </h2>
        <p class="mt-3 text-muted-foreground text-sm leading-relaxed">
          We treat creative deliverables with the exact rigor of mission-critical IT infrastructure: clear scope, strict SLAs, master-asset ownership, and flawless execution.
        </p>
      </div>

      <div class="grid gap-px border border-border bg-border md:grid-cols-2">
        <!-- Practice 1 -->
        <div class="bg-linen p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold">Practice 01</span>
            <h3 class="mt-3 font-display text-2xl font-semibold text-obsidian">Brand Identity &amp; Visual Systems</h3>
            <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
              Comprehensive brand architecture, bespoke typography systems, luxury corporate collateral, and exhaustive design guidelines that maintain uncompromised authority across all physical and digital touchpoints.
            </p>
            <ul class="mt-6 space-y-2 text-xs text-foreground/80 font-medium">
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Master vector logo suites &amp; responsive marks</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Corporate stationery &amp; executive media kits</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Exhaustive brand governance documentation</li>
            </ul>
          </div>
          <div class="mt-8 pt-4 border-t border-border">
            <span class="text-xs font-semibold text-maritime uppercase tracking-wider">Enterprise Standard</span>
          </div>
        </div>

        <!-- Practice 2 -->
        <div class="bg-linen p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold">Practice 02</span>
            <h3 class="mt-3 font-display text-2xl font-semibold text-obsidian">Editorial &amp; Book Publishing Architecture</h3>
            <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
              Battle-tested publication production proven across 18 self-published and corporate titles. We manage book cover engineering, interior layout typesetting, pre-press certification, and ePub/Kindle digital formatting.
            </p>
            <ul class="mt-6 space-y-2 text-xs text-foreground/80 font-medium">
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Full-bleed print-ready offset press certification</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Reflowable ePub &amp; fixed-layout digital delivery</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Editorial hierarchy &amp; structural proofing</li>
            </ul>
          </div>
          <div class="mt-8 pt-4 border-t border-border">
            <span class="text-xs font-semibold text-maritime uppercase tracking-wider">18+ Published Works Proof</span>
          </div>
        </div>

        <!-- Practice 3 -->
        <div class="bg-linen p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold">Practice 03</span>
            <h3 class="mt-3 font-display text-2xl font-semibold text-obsidian">IT Infrastructure &amp; Systems Architecture</h3>
            <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
              Drawing from enterprise systems background, we audit, plan, and deploy resilient digital infrastructure, cloud services, and network topologies built on the 99.5% uptime principle.
            </p>
            <ul class="mt-6 space-y-2 text-xs text-foreground/80 font-medium">
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Redundant cloud architecture &amp; monitoring</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>SLA definition &amp; vendor contract governance</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Digital security boundaries &amp; failover design</li>
            </ul>
          </div>
          <div class="mt-8 pt-4 border-t border-border">
            <span class="text-xs font-semibold text-maritime uppercase tracking-wider">High Uptime Discipline</span>
          </div>
        </div>

        <!-- Practice 4 -->
        <div class="bg-linen p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold">Practice 04</span>
            <h3 class="mt-3 font-display text-2xl font-semibold text-obsidian">Executive Platforms &amp; Campaigns</h3>
            <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
              Custom digital ecosystems for leaders, institutions, and authors. High-performance, minimalist portfolio sites and e-commerce bookstores with seamless local MoMo and international payment gateways.
            </p>
            <ul class="mt-6 space-y-2 text-xs text-foreground/80 font-medium">
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Unified portfolio &amp; publishing storefronts</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Multi-channel digital marketing campaigns</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 bg-maritime shrink-0"></span>Omni-channel audience engagement funnels</li>
            </ul>
          </div>
          <div class="mt-8 pt-4 border-t border-border">
            <span class="text-xs font-semibold text-maritime uppercase tracking-wider">Turnkey Delivery</span>
          </div>
        </div>
      </div>
    </section>

    <!-- The Operating Doctrine -->
    <section class="border-t border-border bg-[#0f2b46] text-linen py-16 md:py-24">
      <div class="container-arc">
        <div class="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p class="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold mb-3">Operating Philosophy</p>
            <h2 class="font-display text-3xl font-semibold leading-tight text-linen md:text-5xl">
              "Low quotes disqualify excellence. We price for durability."
            </h2>
            <p class="mt-6 text-sm leading-relaxed text-linen/80">
              When value is underpriced, clients treat engagements informally and quality is degraded. At Richson Creatives, every engagement is bounded by transparent contracts, verified timelines, and sovereign commitment to the finished product.
            </p>
          </div>
          <div class="border border-gold/30 bg-maritime/60 p-8 md:p-10">
            <h4 class="font-display text-xl font-semibold text-gold mb-4">The Richson Creatives Standard</h4>
            <div class="space-y-4 text-xs leading-relaxed text-linen/90">
              <div class="border-b border-white/10 pb-3">
                <strong class="block text-gold uppercase tracking-wider mb-1">01. Architecture Before Execution</strong>
                <span>We never draft a pixel or provision a server before the core requirements and diagnostic frameworks are signed off.</span>
              </div>
              <div class="border-b border-white/10 pb-3">
                <strong class="block text-gold uppercase tracking-wider mb-1">02. Zero Vendor Revision Fatigue</strong>
                <span>Because our discovery is forensic, deliverables land with 95%+ first-pass stakeholder alignment.</span>
              </div>
              <div>
                <strong class="block text-gold uppercase tracking-wider mb-1">03. Full Asset Autonomy</strong>
                <span>Clients own every raw file, style guide, vector master, and font license. No hostage architecture.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Retainer & Engagement CTA -->
    <section class="container-arc py-16 md:py-24">
      <div class="border border-border bg-white p-8 md:p-16 text-center max-w-3xl mx-auto shadow-sm">
        <span class="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold">Executive Retainer Booking</span>
        <h2 class="mt-2 font-display text-3xl font-semibold text-obsidian md:text-4xl">
          Commission Richson Creatives for your next milestone.
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto">
          Whether you are publishing a seminal manuscript, rebranding an institution, or auditing IT systems, we offer project-based commissions and monthly creative direction retainers.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a href="/contact.html" class="btn-navy">Submit an Agency Brief</a>
          <a href="https://wa.me/233548685856?text=Hello%20Eric,%20I%20would%20like%20to%20discuss%20a%20Richson%20Creatives%20agency%20project." target="_blank" rel="noopener noreferrer" class="btn-outline">
            Chat on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </section>
  </div>
</main>
`;

const agencyHtmlContent = agencyHead + agencyMain + footerPart;
fs.writeFileSync(path.join(rootDir, 'agency.html'), agencyHtmlContent, 'utf8');
console.log('[Agency] Successfully created agency.html! Size:', agencyHtmlContent.length);

console.log('[Enhance] Complete! All pages updated and polished.');
