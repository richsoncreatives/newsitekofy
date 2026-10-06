import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Map standard routes and clean URLs to their corresponding HTML files
const routeMap = {
  '/': 'index.html',
  '/index': 'index.html',
  '/index.html': 'index.html',
  '/about': 'about.html',
  '/about.html': 'about.html',
  '/ministry': 'ministry.html',
  '/ministry.html': 'ministry.html',
  '/library': 'library.html',
  '/library.html': 'library.html',
  '/blognugget': 'blognugget.html',
  '/blognugget.html': 'blognugget.html',
  '/contact': 'contact.html',
  '/contact.html': 'contact.html',
  '/agency': 'agency.html',
  '/agency.html': 'agency.html'
};

for (const [route, file] of Object.entries(routeMap)) {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
}

// Serve all static assets from root
app.use(express.static(__dirname));

// Zip file direct download handler
app.get(['/download', '/download-zip', '/richsonwebsite.zip'], (req, res) => {
  const zipPath = path.join(__dirname, 'richsonwebsite.zip');
  res.download(zipPath, 'richsonwebsite.zip');
});

// Form submission handler
app.post(['/contact', '/contact.html', '/api/contact'], (req, res) => {
  res.json({ success: true, message: 'Thank you for your message. We will be in touch shortly.' });
});

// Fallback for 404 to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
