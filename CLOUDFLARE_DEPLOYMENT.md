# Cloudflare Pages Deployment & Domain Setup Guide

This project is fully optimized and configured for seamless deployment to **Cloudflare Pages via GitHub**, with automatic SSL and zero-friction custom domain routing.

---

## What Caused the Previous Cloudflare Deployment Error & How It Was Fixed

1. **`package-lock.json` sync error**:
   - *Previous issue*: When Cloudflare Pages builds from GitHub, it executes `npm ci`. The lockfile was out of sync, causing `npm ci` to fail with `npm error code EUSAGE (Missing package)`.
   - *Fix*: Synced `package.json` and regenerated a pristine `package-lock.json`. Verified that `npm ci` succeeds with 0 errors.

2. **`wrangler.toml` configuration mismatch**:
   - *Previous issue*: An `[assets]` block (Workers-only format) caused Cloudflare Pages to fail schema validation.
   - *Fix*: Configured standard Cloudflare Pages configuration: `pages_build_output_dir = "dist"`.

3. **Functions directory placement**:
   - *Previous issue*: `build.js` copied `functions/` into `dist/functions`. Cloudflare Pages requires `/functions` to live exclusively at the project root.
   - *Fix*: Cleaned `dist/` and ensured `/functions/api/contact.js` remains exclusively at the root.

4. **Node.js LTS Build Environment**:
   - *Fix*: Added `.nvmrc` and `.node-version` (set to `20`) so Cloudflare's build container always executes on Node.js 20 LTS.

---

## Deploying to Cloudflare Pages via GitHub (Step-by-Step)

### Step 1: Push your latest code to GitHub
Make sure all changes in this repository are pushed to your GitHub repository:
```bash
git add .
git commit -m "Fix Cloudflare Pages configuration, build script, and lockfile"
git push origin main
```

### Step 2: Open Cloudflare Dashboard
1. Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
2. In the left navigation menu, click **Workers & Pages**.
3. Click the blue **Create** button.
4. Select the **Pages** tab (⚠️ **Important: Select Pages, not Workers**).
5. Click **Connect to Git**.
6. Select your GitHub repository (`richsoncreatives/richsonweb`) and click **Begin setup**.

### Step 3: Configure Build Settings
Fill in the deployment settings:
- **Project name**: `richsonwebsite` (or any name you prefer)
- **Production branch**: `main` (or your active default branch)
- **Framework preset**: `None`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave as default)

Click **Save and Deploy**. Cloudflare will run the build in ~20-30 seconds and generate your live `*.pages.dev` preview URL.

---

## Connecting Your Custom Domain (Step-by-Step)

Once your Cloudflare Pages project is deployed:

1. In the Cloudflare dashboard, click on your project under **Workers & Pages** -> **Pages**.
2. Click the **Custom domains** tab at the top.
3. Click **Set up a custom domain**.
4. Type your domain (e.g., `richsonericdarko.com` or `www.richsonericdarko.com`).
5. Click **Continue**.

### If your domain DNS is managed in Cloudflare:
Cloudflare will automatically configure the DNS record (CNAME pointing to your Pages project) and provision a free SSL certificate. Just click **Activate domain**.

### If your domain is registered elsewhere (GoDaddy, Namecheap, Google Domains, etc.):
Add the CNAME record shown by Cloudflare in your DNS provider:
- **Type**: `CNAME`
- **Name**: `@` or `www` (or your subdomain)
- **Target**: `<your-project-name>.pages.dev`
- **Proxy status**: Proxied (Orange cloud)

Cloudflare will verify the record and automatically provision an SSL certificate (usually within 5 to 15 minutes).

---

## Verifying Site Features

- **Store Purchase Links**: Linked directly to Selar store (`https://selar.com/m/richsonericdarko`).
- **Direct Enquiries / WhatsApp**: Linked to `+233 262 685 856` (`https://wa.me/233262685856`) and `@richsonericdarko`.
- **Insight Cards ("Read in Full")**: Expandable interactive accordion nuggets with inquiry form on `/blognugget`.
- **Clean URLs**: Both `/about` and `/about.html`, `/library`, `/ministry`, `/agency`, `/contact`, `/blognugget` work smoothly.
- **Serverless Form Submissions**: Cloudflare Pages Edge Function active at `/functions/api/contact.js` for zero-server contact handling.
