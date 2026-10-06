# Cloudflare Pages & GitHub Flat Static Deployment Guide

This repository contains a **100% pure flat static HTML/CSS/JS website**. It is built to deploy effortlessly to **Cloudflare Pages via GitHub** with **zero build commands**, **zero server-side code**, and **zero redirect conflicts**.

---

## 1. Flat Static Architecture
- All pages live as standalone, independent files in the root directory:
  - `index.html` (Home)
  - `about.html` (About Eric Richson Darko)
  - `ministry.html` (Ministry & Network)
  - `agency.html` (Richson Creatives Agency)
  - `library.html` (Bookshelf & Bookstore)
  - `blognugget.html` (Daily Spiritual Nuggets)
  - `contact.html` (Contact & Inquiries)
- **Clean Relative URLs**: All internal links use clean standard paths (`href="/agency.html"`, `href="/about.html"`, etc.) with no trailing slashes.
- **Dedicated Canonical Meta Tags**: Every individual page points to its own canonical URL (`/about.html`, `/agency.html`, etc.) rather than defaulting to `index.html`.
- **No Worker / Redirect Conflicts**: No `wrangler.toml`, no `_redirects` file, and no server-side edge functions. This completely avoids `ERR_TOO_MANY_REDIRECTS` loops and Cloudflare Worker deploy errors.

---

## 2. Deploying on Cloudflare Pages via GitHub (1-Minute Setup)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Refactor to flat standalone static files for Cloudflare Pages"
   git push origin main
   ```

2. **In Cloudflare Dashboard**:
   - Navigate to **Workers & Pages** in the left menu.
   - Click **Create** → Select the **Pages** tab (⚠️ **Select Pages, NOT Workers**).
   - Click **Connect to Git** and choose repository: `richsoncreatives/richsonweb` (or your active repository).

3. **Build & Deployment Settings**:
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `/` *(or leave as root)*
   - Click **Save and Deploy**.

Cloudflare will deploy your static files in ~15 seconds.

---

## 3. Connecting Your Custom Domain
1. In your Cloudflare Pages project, click the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter your domain (e.g. `richsonericdarko.com` or `www.richsonericdarko.com`).
4. Click **Continue** (Cloudflare activates automatic DNS and free SSL).
