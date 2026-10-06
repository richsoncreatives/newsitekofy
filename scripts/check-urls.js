import fs from 'fs';

const files = ["index.html", "about.html", "ministry.html", "agency.html", "library.html", "blognugget.html", "contact.html"];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const htmlSlash = content.match(/[\w-]+\.html\/[^\s"'<>]+/g);
  if (htmlSlash) {
    console.log(file, "Found .html/ :", htmlSlash);
  }
  const hrefPortfolio = content.match(/href=["'][^'"]*portfolio[^'"]*["']/gi);
  if (hrefPortfolio) {
    console.log(file, "Found href with portfolio:", hrefPortfolio);
  }
  const allHrefs = [...content.matchAll(/href=["']([^'"]+)["']/gi)].map(m => m[1]);
  const suspicious = allHrefs.filter(h => h.includes('.html/') || h.includes('index.html/') || h.includes('-portfolio'));
  if (suspicious.length > 0) {
    console.log(file, "Suspicious hrefs:", suspicious);
  }
});

console.log("Check complete.");
