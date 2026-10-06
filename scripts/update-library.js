import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libPath = path.join(__dirname, '..', 'library.html');
let content = fs.readFileSync(libPath, 'utf8');

console.log('Original library.html size:', content.length);

// 1. Highlight BOOKSHELF in navigation
// In library.html, let's ensure BOOKSHELF nav link has active styling
content = content.replace(
  /href="?\/library\.html"?([^>]*)>Bookshelf<\/a>/gi,
  'href="/library.html"$1 class="relative text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-maritime border-b-2 border-gold pb-1">Bookshelf</a>'
);

// 2. Replace static Purchase buttons with direct link to Selar store
// Pattern: <button class="inline-flex items-center gap-2 bg-maritime px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-linen transition-colors hover:bg-[hsl(209_100%_18%)]"><svg ...> Purchase</button>
const buttonRegex = /<button(\s+class="inline-flex items-center gap-2 bg-maritime px-5 py-2.5 text-\[0\.7rem\] font-semibold uppercase tracking-\[0\.16em\] text-linen transition-colors hover:bg-\[hsl\(209_100%_18%\)\]"[^>]*)>([\s\S]*?)Purchase<\/button>/gi;

let purchaseCount = 0;
content = content.replace(buttonRegex, (match, classes, iconContent) => {
  purchaseCount++;
  return `<a href="https://selar.com/m/richsonericdarko" target="_blank" rel="noopener noreferrer" ${classes} style="cursor: pointer; text-decoration: none;" title="Purchase on Selar Global Store">${iconContent} Purchase on Selar</a>`;
});

console.log(`Replaced ${purchaseCount} Purchase buttons with direct Selar link!`);

// 3. Add styling and interactive filters / search for library.html
const libraryStyles = `
<style id="library-enhanced-styles">
.book-search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background: #ffffff;
  border: 1px solid #e2ded4;
}

.book-cat-btn {
  padding: 0.5rem 1rem;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  border: 1px solid #e2ded4;
  color: #6b7280;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.book-cat-btn:hover {
  border-color: #0f2b46;
  color: #0f2b46;
}

.book-cat-btn.is-active {
  background: #0f2b46;
  color: #f8f6f0;
  border-color: #0f2b46;
}

article {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

article:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -6px rgba(15, 43, 70, 0.08);
}
</style>
`;

// 4. Client-side search and category filtering for books
const libraryScript = `
<script id="library-enhanced-script">
(function() {
  function initLibrary() {
    const articles = document.querySelectorAll('main section article');
    if (!articles || articles.length === 0) return;

    // Insert Filter & Search bar right before grid
    const grid = document.querySelector('main .grid');
    if (grid && !document.getElementById('bookFilterBar')) {
      const filterBar = document.createElement('div');
      filterBar.id = 'bookFilterBar';
      filterBar.className = 'container-arc mb-8';
      filterBar.innerHTML = \`
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div class="flex flex-wrap gap-2" id="bookCategoryTabs">
            <button class="book-cat-btn is-active" data-cat="all">All Titles (\${articles.length})</button>
            <button class="book-cat-btn" data-cat="spiritual">Spiritual Formation</button>
            <button class="book-cat-btn" data-cat="marriage">Marriage &amp; Covenant</button>
            <button class="book-cat-btn" data-cat="capacity">Capacity &amp; Leadership</button>
          </div>
          <div class="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
            <span id="bookCountBadge">\${articles.length}</span> titles available
          </div>
        </div>
        <div class="book-search-bar">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
            <svg style="width: 1rem; height: 1rem; color: #0f2b46;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="bookSearchInput" placeholder="Search bookstore by book title, focus points, or theme..." style="width: 100%; border: none; outline: none; font-size: 0.88rem; background: transparent; color: #1a1d20;">
          </div>
          <a href="https://selar.com/m/richsonericdarko" target="_blank" rel="noopener noreferrer" style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #c5a059; text-decoration: none; display: flex; align-items: center; gap: 0.35rem;">
            <span>Visit Full Storefront</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      \`;
      grid.parentNode.insertBefore(filterBar, grid);
    }

    // Enhance each article with a direct WhatsApp instant MoMo order button alongside Selar
    articles.forEach(art => {
      const h3 = art.querySelector('h3');
      const bookTitle = h3 ? h3.textContent.trim() : 'Book';
      const actionRow = art.querySelector('.flex.items-end.justify-between') || art.querySelector('a[href*="selar"]')?.parentNode;
      
      if (actionRow && !art.querySelector('.btn-momo-order')) {
        const waLink = document.createElement('a');
        waLink.className = 'btn-momo-order inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground hover:text-maritime transition-colors mt-2';
        waLink.target = '_blank';
        waLink.rel = 'noopener noreferrer';
        waLink.href = 'https://wa.me/233548685856?text=' + encodeURIComponent('Hello Eric, I would like to order the book "' + bookTitle + '" via MoMo.');
        waLink.innerHTML = \`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Order via MoMo (WhatsApp)\`;
        
        // Append beneath the price block
        const priceBlock = actionRow.querySelector('div:first-child');
        if (priceBlock) {
          priceBlock.appendChild(waLink);
        }
      }
    });

    // Book search and category filter event handling
    const searchInput = document.getElementById('bookSearchInput');
    const catButtons = document.querySelectorAll('#bookCategoryTabs .book-cat-btn');

    function filterBooks() {
      const q = (searchInput?.value || '').toLowerCase().trim();
      const activeBtn = document.querySelector('#bookCategoryTabs .book-cat-btn.is-active');
      const catKey = activeBtn ? activeBtn.getAttribute('data-cat') : 'all';

      let count = 0;
      articles.forEach(art => {
        const text = art.textContent.toLowerCase();
        let matchesCat = true;

        if (catKey === 'spiritual') {
          matchesCat = text.includes('spiritual') || text.includes('altar') || text.includes('vessels') || text.includes('devotion');
        } else if (catKey === 'marriage') {
          matchesCat = text.includes('marry') || text.includes('partner') || text.includes('love') || text.includes('marital') || text.includes('covenant') || text.includes('flags');
        } else if (catKey === 'capacity') {
          matchesCat = text.includes('capacity') || text.includes('sides of life') || text.includes('jethro') || text.includes('skills') || text.includes('word') || text.includes('priority');
        }

        const matchesQuery = !q || text.includes(q);

        if (matchesCat && matchesQuery) {
          art.style.display = '';
          count++;
        } else {
          art.style.display = 'none';
        }
      });

      const countBadge = document.getElementById('bookCountBadge');
      if (countBadge) countBadge.textContent = count;
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterBooks);
    }

    catButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        catButtons.forEach(b => b.classList.remove('is-active'));
        this.classList.add('is-active');
        filterBooks();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLibrary);
  } else {
    initLibrary();
  }
})();
</script>
`;

if (content.includes('</style>')) {
  const firstStyleEnd = content.indexOf('</style>') + 8;
  content = content.slice(0, firstStyleEnd) + libraryStyles + content.slice(firstStyleEnd);
} else {
  content = libraryStyles + content;
}

content = content + libraryScript;

fs.writeFileSync(libPath, content, 'utf8');
console.log('Successfully updated library.html! New size:', content.length);
