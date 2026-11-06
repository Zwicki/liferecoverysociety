# Deployment & Custom Domain Guide: liferecoverysociety.org

This guide walks you through deploying the **Life Recovery Society** website and connecting your domain **`liferecoverysociety.org`**.

---

## Option 1: Deploy with Vercel (Recommended)

Vercel provides free global hosting, automated SSL certificates, and instant Git updates.

### Step 1: Push your Code to GitHub (or GitLab / Bitbucket)
1. Initialize a git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial Life Recovery Society website"
   ```
2. Create a repository on [GitHub](https://github.com) named `liferecoverysociety-website` and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/liferecoverysociety-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import Project into Vercel
1. Log in to [Vercel](https://vercel.com) (free tier is fully sufficient).
2. Click **"Add New..."** → **"Project"**.
3. Import your `liferecoverysociety-website` GitHub repository.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your site will be live on a `.vercel.app` URL within ~60 seconds.

### Step 3: Connect `liferecoverysociety.org`
1. In your Vercel project dashboard, go to **Settings** → **Domains**.
2. Enter `liferecoverysociety.org` and click **Add**.
3. Also add `www.liferecoverysociety.org` (Vercel will offer to automatically redirect `www` to root or vice versa).
4. Vercel will display the exact DNS records to add at your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.):
   - **Type**: `A` | **Name**: `@` | **Value**: `76.76.21.21`
   - **Type**: `CNAME` | **Name**: `www` | **Value**: `cname.vercel-dns.com`
5. Once DNS records are entered, Vercel will automatically generate a free SSL certificate within 10–30 minutes.

---

## Option 2: Deploy with Netlify

1. Log in to [Netlify](https://www.netlify.com).
2. Click **"Add new site"** → **"Import an existing project"**.
3. Select your GitHub repository.
4. Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy Site**. The included `public/_redirects` file ensures single-page client routing works properly.
6. Under **Domain management**, click **"Add a domain"** and enter `liferecoverysociety.org`.
7. Update your registrar DNS with Netlify's recommended A or CNAME records.

---

## Option 3: Manual Production Build (cPanel or Any Host)

To build the static HTML/JS/CSS files locally to upload anywhere:
```bash
npm run build
```
This will compile all assets into the `dist/` folder. You can upload the contents of `dist/` directly to `public_html` on any web server or cPanel hosting.

---

## Updating Contact Details Anytime

All organization phone numbers, emails, addresses, crisis helplines, and social links are managed centrally in:
```
src/config/siteConfig.ts
```
Whenever you edit this file, your changes will automatically reflect across the entire website!
