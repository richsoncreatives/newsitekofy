import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPath = path.join(__dirname, '..', 'blognugget.html');
let content = fs.readFileSync(blogPath, 'utf8');

console.log('Original blognugget.html size:', content.length);

// Custom styles for expanded nugget and interactive form
const customStyles = `
<style id="nugget-interactive-styles">
/* Responsive grid and expanded card transitions */
article {
  position: relative;
  transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

article.is-expanded {
  background-color: #faf9f6 !important;
  color: #1a1d20 !important;
  border: 1px solid #c5a059 !important;
  box-shadow: 0 16px 36px -8px rgba(15, 43, 70, 0.16) !important;
  z-index: 10;
}

article.is-expanded:hover {
  background-color: #faf9f6 !important;
  color: #1a1d20 !important;
}

article.is-expanded h2 {
  color: #0f2b46 !important;
}

article.is-expanded p {
  color: #374151 !important;
}

article.is-expanded .nugget-btn-full {
  background-color: #0f2b46 !important;
  color: #f8f6f0 !important;
  padding: 0.5rem 1rem !important;
  border-radius: 2px;
}

.nugget-expanded-wrap {
  display: none;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(226, 222, 212, 0.95);
  animation: nuggetFadeIn 0.3s ease-out forwards;
}

@keyframes nuggetFadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.nugget-deep-dive {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #2b323a;
}

.nugget-deep-dive p {
  margin-bottom: 1rem;
}

.nugget-pillar-grid {
  margin: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nugget-pillar-item {
  background: #f3f0e8;
  border-left: 3px solid #c5a059;
  padding: 0.75rem 1rem;
  border-radius: 0 3px 3px 0;
}

.nugget-pillar-item strong {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #0f2b46;
  margin-bottom: 0.2rem;
}

.nugget-pillar-item span {
  font-size: 0.88rem;
  color: #4b5563;
  line-height: 1.5;
}

.nugget-maxim-box {
  background: #0f2b46;
  color: #f8f6f0;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #c5a059;
}

.nugget-maxim-box p {
  color: #f8f6f0 !important;
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.nugget-maxim-box span.author-tag {
  display: block;
  margin-top: 0.6rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #c5a059;
  font-weight: 600;
  font-style: normal;
}

/* Nugget Response Form */
.nugget-form-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #e2ded4;
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.03);
}

.nugget-form-section h4 {
  font-family: var(--font-display, Georgia, serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: #0f2b46;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.nugget-form-section p.form-sub {
  font-size: 0.78rem;
  color: #6b7280;
  margin-bottom: 1.25rem;
}

.nugget-form-section label {
  display: block;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #0f2b46;
  margin-bottom: 0.35rem;
}

.nugget-form-section input[type="text"],
.nugget-form-section input[type="email"],
.nugget-form-section textarea {
  width: 100%;
  font-size: 0.85rem;
  padding: 0.6rem 0.8rem;
  background: #faf9f6;
  border: 1px solid #d4cebe;
  color: #1a1d20;
  box-sizing: border-box;
  transition: all 0.2s;
}

.nugget-form-section input[type="text"]:focus,
.nugget-form-section input[type="email"]:focus,
.nugget-form-section textarea:focus {
  outline: none;
  background: #ffffff;
  border-color: #0f2b46;
  box-shadow: 0 0 0 2px rgba(15, 43, 70, 0.1);
}

.nugget-submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #0f2b46;
  color: #f8f6f0;
  padding: 0.65rem 1.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.nugget-submit-btn:hover {
  background: #c5a059;
  color: #0f2b46;
}

.nugget-form-success {
  display: none;
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  background: #f4f8f5;
  border: 1px solid #2e7d32;
  color: #1b5e20;
}

/* Category button active */
.category-btn.is-active {
  background-color: #0f2b46 !important;
  color: #f8f6f0 !important;
  border-color: #0f2b46 !important;
}

/* Search bar styling */
.nugget-search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1.25rem;
  background: #ffffff;
  border: 1px solid #e2ded4;
}
</style>
`;

// Client-side script that handles expanding nuggets, forms, search, and category filtering
const customScript = `
<script id="nugget-interactive-logic">
(function() {
  function initNuggets() {
    const articles = document.querySelectorAll('main section article');
    if (!articles || articles.length === 0) return;

    // Add search bar and counter right before the grid container
    const gridContainer = document.querySelector('main .grid');
    if (gridContainer && !document.getElementById('nuggetSearchBar')) {
      const searchWrap = document.createElement('div');
      searchWrap.id = 'nuggetSearchBar';
      searchWrap.className = 'nugget-search-bar';
      searchWrap.innerHTML = \`
        <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1; max-width: 480px;">
          <svg style="width: 1rem; height: 1rem; color: #0f2b46; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="nuggetFilterInput" placeholder="Search 180+ insights by keyword, title, or scripture..." style="width: 100%; border: none; outline: none; font-size: 0.85rem; background: transparent; color: #1a1d20;">
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #6b7280;">
          <span>Showing</span>
          <span id="nuggetVisibleCount" style="background: #0f2b46; color: #f8f6f0; padding: 0.15rem 0.5rem; font-weight: 700; border-radius: 2px;">\${articles.length}</span>
          <span>Nuggets</span>
        </div>
      \`;
      gridContainer.parentNode.insertBefore(searchWrap, gridContainer);
    }

    // Enhance each article
    articles.forEach((art, idx) => {
      const h2 = art.querySelector('h2');
      const title = h2 ? h2.textContent.trim() : 'Capacity Insight #' + (idx + 1);
      const catSpan = art.querySelector('div > span:first-child');
      const category = catSpan ? catSpan.textContent.trim() : 'Tech, Systems & Professional Boundaries';
      const teaserP = art.querySelector('p');
      const teaserText = teaserP ? teaserP.textContent.trim() : '';
      const readBtn = art.querySelector('button');

      if (readBtn) {
        readBtn.classList.add('nugget-btn-full');
      }

      // Generate context-aware expanded deep-dive content tailored to the nugget
      const expandedDiv = document.createElement('div');
      expandedDiv.className = 'nugget-expanded-wrap';
      expandedDiv.innerHTML = generateNuggetContent(title, teaserText, category, idx);
      art.appendChild(expandedDiv);

      // Handle Read In Full button toggle
      if (readBtn) {
        readBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const isCurrentlyExpanded = art.classList.contains('is-expanded');

          if (isCurrentlyExpanded) {
            art.classList.remove('is-expanded');
            expandedDiv.style.display = 'none';
            readBtn.innerHTML = 'Read in full <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right h-3.5 w-3.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
          } else {
            art.classList.add('is-expanded');
            expandedDiv.style.display = 'block';
            readBtn.innerHTML = 'Collapse insight <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up h-3.5 w-3.5" style="transform: rotate(180deg);"><path d="M12 19V5"></path><path d="m5 12 7-7 7 7"></path></svg>';
          }
        });
      }

      // Form submission logic
      const form = expandedDiv.querySelector('form');
      const successBox = expandedDiv.querySelector('.nugget-form-success');
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(form);
          const name = formData.get('name') || 'Friend';
          const email = formData.get('email');
          const reflection = formData.get('reflection');
          const consult = formData.get('requestConsultation') ? 'Yes' : 'No';

          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
          }

          // Post to server contact handler
          fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nuggetTitle: title,
              category: category,
              name: name,
              email: email,
              reflection: reflection,
              requestConsultation: consult
            })
          }).catch(function() {
            // Still proceed even if offline
          }).finally(function() {
            form.style.display = 'none';
            if (successBox) {
              const nameEl = successBox.querySelector('.user-name');
              const nuggetEl = successBox.querySelector('.nugget-name');
              if (nameEl) nameEl.textContent = name;
              if (nuggetEl) nuggetEl.textContent = title;
              successBox.style.display = 'block';
            }
          });
        });
      }
    });

    // Category tabs filtering
    const catButtons = document.querySelectorAll('main section .flex.flex-wrap button');
    catButtons.forEach(btn => {
      btn.classList.add('category-btn');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        catButtons.forEach(b => {
          b.classList.remove('is-active', 'bg-maritime', 'text-linen');
          b.classList.add('border', 'border-border', 'text-muted-foreground');
        });
        this.classList.add('is-active', 'bg-maritime', 'text-linen');
        this.classList.remove('border-border', 'text-muted-foreground');

        const selectedCat = this.textContent.trim();
        filterArticles(selectedCat, document.getElementById('nuggetFilterInput')?.value || '');
      });
    });

    // Search input filtering
    const searchInput = document.getElementById('nuggetFilterInput');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const activeBtn = document.querySelector('.category-btn.is-active') || catButtons[0];
        const selectedCat = activeBtn ? activeBtn.textContent.trim() : 'All';
        filterArticles(selectedCat, this.value);
      });
    }

    function filterArticles(category, keyword) {
      const q = (keyword || '').toLowerCase().trim();
      let visibleCount = 0;

      articles.forEach(art => {
        const catSpan = art.querySelector('div > span:first-child');
        const artCat = catSpan ? catSpan.textContent.trim() : '';
        const h2 = art.querySelector('h2');
        const artTitle = h2 ? h2.textContent.toLowerCase() : '';
        const p = art.querySelector('p');
        const artText = p ? p.textContent.toLowerCase() : '';

        const catMatches = (category === 'All' || category === '' || artCat.toLowerCase() === category.toLowerCase());
        const keywordMatches = (q === '' || artTitle.includes(q) || artText.includes(q));

        if (catMatches && keywordMatches) {
          art.style.display = 'flex';
          visibleCount++;
        } else {
          art.style.display = 'none';
        }
      });

      const countBadge = document.getElementById('nuggetVisibleCount');
      if (countBadge) countBadge.textContent = visibleCount;
    }
  }

  function generateNuggetContent(title, teaser, category, index) {
    const cleanCat = category.replace(/&amp;/g, '&');
    
    // Detailed pillars customized to the category
    let pillar1Title = 'Architectural Foundation & Diagnosis';
    let pillar1Desc = 'Excellence does not happen by accident; it is the deliberate result of protecting your standard and refusing unmeasured scope.';
    let pillar2Title = 'Boundary Enforcement & Cadence';
    let pillar2Desc = 'When you fail to articulate clear limits, you unconsciously train others to devalue your time, labor, and spiritual focus.';
    let pillar3Title = 'Compounded Capacity & Sovereign Fruit';
    let pillar3Desc = 'Systems outlive personalities. Building sustainable processes preserves your health, your calling, and your legacy.';

    if (cleanCat.includes('Tech') || cleanCat.includes('Boundaries')) {
      pillar1Title = 'Redundancy over Reaction';
      pillar1Desc = 'High-reliability infrastructure eliminates single points of failure. Apply the same redundancy to your daily schedule and financial buffers.';
      pillar2Title = 'Uncompromising Value Pricing';
      pillar2Desc = 'Low quotes signal fragility. Pricing your skill accurately establishes executive respect and repels uncommitted, high-friction clients.';
      pillar3Title = 'SLA Clarity & Scope Protection';
      pillar3Desc = 'Ambiguity is the enemy of excellence. Define exact deliverables, timelines, and response windows before labor begins.';
    } else if (cleanCat.includes('Emotional') || cleanCat.includes('Clarity')) {
      pillar1Title = 'Cognitive Triage & Peace';
      pillar1Desc = 'Not every urgent demand deserves your emotional surrender. Learn to filter external friction through sovereign clarity.';
      pillar2Title = 'Internal Order over External Chaos';
      pillar2Desc = 'A calm mind is a fortified city. Guard your sleep, your morning stillness, and your mental energy with fierce discipline.';
      pillar3Title = 'Emotional Stewardship';
      pillar3Desc = 'Unresolved resentment consumes vital creative bandwidth. Forgiveness and boundary-setting are twin pillars of long-term sanity.';
    } else if (cleanCat.includes('Declaration') || cleanCat.includes('Destiny')) {
      pillar1Title = 'Words as Architectural Instruments';
      pillar1Desc = 'Your mouth is not a tape recorder of existing circumstances; it is a steering wheel that aligns reality with God’s eternal blueprint.';
      pillar2Title = 'Eliminating Idle Resignation';
      pillar2Desc = 'Never speak in anger what you do not want manifested in destiny. Refuse self-sabotaging speech in moments of pressure.';
      pillar3Title = 'Prophetic Alignment';
      pillar3Desc = 'Speak with authority grounded in covenant truth. Harmony between your belief and your confession unlocks sovereign acceleration.';
    } else if (cleanCat.includes('Covenant') || cleanCat.includes('Relationship')) {
      pillar1Title = 'Character Above Chemistry';
      pillar1Desc = 'Chemistry attracts, but character sustains. Covenant partnership demands shared spiritual values, unyielding integrity, and mutual honor.';
      pillar2Title = 'Sacramental Commitment';
      pillar2Desc = 'Marriage is a covenant of sacrificial elevation, not a transactional contract. It requires daily dying to self and mutual service.';
      pillar3Title = 'Transparent Truth & Protection';
      pillar3Desc = 'Never sweep foundational divergences under the rug of romantic optimism. What you tolerate in courtship governs your marriage.';
    } else if (cleanCat.includes('Singleness') || cleanCat.includes('Readiness')) {
      pillar1Title = 'Wholeness Before Union';
      pillar1Desc = 'Marriage is an encounter between two whole persons, not a rescue mission for broken identities. Cultivate personal capacity first.';
      pillar2Title = 'Maximizing the Single Season';
      pillar2Desc = 'Singleness is not a waiting room; it is an executive workshop for building spiritual roots, financial stewardship, and intellectual depth.';
      pillar3Title = 'Discerning Covenant Alignment';
      pillar3Desc = 'Do not lower the bar out of fear of isolation. Godly waiting builds the tower that can withstand every cultural storm.';
    }

    return \`
      <div class="nugget-deep-dive">
        <h3 style="font-family: Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #0f2b46; margin-bottom: 0.5rem;">The In-Depth Insight</h3>
        <p style="font-size: 0.92rem; line-height: 1.7; color: #374151; margin-bottom: 0.85rem;">
          \${teaser} To step into authentic capacity, leaders must move past casual intent and construct intentional frameworks. When operations, speech, or relationships lack structure, energy leaks rapidly into unnecessary friction and perpetual burnout.
        </p>
        <p style="font-size: 0.92rem; line-height: 1.7; color: #374151; margin-bottom: 1rem;">
          This nugget serves as an executive diagnostic: examine where your standard has softened, where unspoken boundaries have allowed compromise, and where systemic clarity must be immediately restored.
        </p>

        <div class="nugget-pillar-grid">
          <div class="nugget-pillar-item">
            <strong>Pillar I · \${pillar1Title}</strong>
            <span>\${pillar1Desc}</span>
          </div>
          <div class="nugget-pillar-item">
            <strong>Pillar II · \${pillar2Title}</strong>
            <span>\${pillar2Desc}</span>
          </div>
          <div class="nugget-pillar-item">
            <strong>Pillar III · \${pillar3Title}</strong>
            <span>\${pillar3Desc}</span>
          </div>
        </div>

        <div class="nugget-maxim-box">
          <p>"Capacity is not measured by how much pressure you can absorb before you break; it is measured by the systems and covenant boundaries that prevent you from breaking at all."</p>
          <span class="author-tag">— Eric Richson Darko · Architect of Capacity</span>
        </div>

        <!-- Interactive Form Beneath Each Nugget -->
        <div class="nugget-form-section">
          <span style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #c5a059;">Engage with this Nugget</span>
          <h4>Share Reflections or Inquire</h4>
          <p class="form-sub">Have a thought, question, or reflection on this topic? Send a note directly to Eric Richson Darko.</p>

          <form class="space-y-3">
            <input type="hidden" name="nuggetTitle" value="\${title.replace(/"/g, '&quot;')}">
            <input type="hidden" name="category" value="\${cleanCat.replace(/"/g, '&quot;')}">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
              <div>
                <label>Your Name *</label>
                <input required type="text" name="name" placeholder="Full name">
              </div>
              <div>
                <label>Your Email *</label>
                <input required type="email" name="email" placeholder="email@domain.com">
              </div>
            </div>
            <div>
              <label>Reflection or Question *</label>
              <textarea required name="reflection" rows="3" placeholder="Share your key takeaway, real-world application, or specific inquiry on '\${title.replace(/"/g, '&quot;')}'..."></textarea>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
              <input type="checkbox" id="req-consult-\${index}" name="requestConsultation" value="1" style="width: auto; cursor: pointer; accent-color: #0f2b46;">
              <label for="req-consult-\${index}" style="margin: 0; font-size: 0.75rem; text-transform: none; letter-spacing: normal; color: #4b5563; cursor: pointer;">
                Request follow-up consultation or executive dialogue
              </label>
            </div>
            <div style="margin-top: 0.75rem;">
              <button type="submit" class="nugget-submit-btn">
                <span>Submit Reflection &amp; Inquiry</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>

          <div class="nugget-form-success">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: #0f2b46;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Reflection Received
            </div>
            <p style="margin-top: 0.35rem; font-size: 0.82rem; color: #374151; line-height: 1.5;">
              Thank you, <strong class="user-name"></strong>! Your reflection on <em>"\${title}"</em> has been received. Eric Richson Darko and the team will review your inquiry.
            </p>
          </div>
        </div>
      </div>
    \`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNuggets);
  } else {
    initNuggets();
  }
})();
</script>
`;

// Inject customStyles before </head> or after existing <style>
// In blognugget.html, let's find the first <meta> or existing <style>
if (content.includes('</style>')) {
  const firstStyleEnd = content.indexOf('</style>') + 8;
  content = content.slice(0, firstStyleEnd) + customStyles + content.slice(firstStyleEnd);
} else {
  content = customStyles + content;
}

// Inject customScript right before the closing tags at the very end
content = content + customScript;

fs.writeFileSync(blogPath, content, 'utf8');
console.log('Successfully updated blognugget.html! New size:', content.length);
