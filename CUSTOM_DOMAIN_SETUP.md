# Custom Domain Setup Guide: greenturtleproductions.com.au

## 1. CNAME File ✅

The `CNAME` file has been created in the root directory with the content:
```
greenturtleproductions.com.au
```

**Important:** This file must be in the root of your repository (same level as `index.html`).

---

## 2. DNS Records Configuration

Add these DNS records at your domain registrar (GoDaddy, Namecheap, etc.):

### A Records (IPv4 Addresses)
Add **4 A records** for the root domain (`@` or `greenturtleproductions.com.au`):

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Note:** Some registrars use `@` for the root domain, others use the domain name itself. Use whichever your registrar requires.

### CNAME Record (for www subdomain - Optional but Recommended)
Add **1 CNAME record** for the `www` subdomain:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| CNAME | www | lemontoohey.github.io | 3600 |

**Note:** If you want `www.greenturtleproductions.com.au` to also work, add this CNAME record.

---

## 3. Path Fixes ✅

**Good News:** Your paths are already configured correctly!

All your file paths are **relative** (no leading slashes):
- ✅ `href="style.css"` 
- ✅ `src="nas-logo.png"`
- ✅ `href="teacher-pack.html"`
- ✅ `src="video-player.js"`

These relative paths will work perfectly on your custom domain without any changes needed.

**No changes required** - your site will work immediately after DNS propagation.

---

## 4. GitHub Pages Configuration Steps

### Step 1: Push CNAME File to GitHub
```bash
git add CNAME
git commit -m "Add CNAME file for custom domain"
git push origin main
```

### Step 2: Configure Custom Domain in GitHub
1. Go to your repository: `https://github.com/lemontoohey/daz_newsletter`
2. Click **Settings** → **Pages**
3. Under **Custom domain**, enter: `greenturtleproductions.com.au`
4. Click **Save**

### Step 3: Wait for DNS Propagation
- DNS changes can take **24-48 hours** to propagate globally
- You can check propagation status at: https://www.whatsmydns.net/
- Enter your domain and check for the A records

### Step 4: Enable HTTPS (After DNS Propagation)
**Important:** Wait until DNS has fully propagated and GitHub recognizes your domain before enabling HTTPS.

1. Go to **Settings** → **Pages** in your repository
2. Under **Custom domain**, you should see a checkbox: **"Enforce HTTPS"**
3. **Check the box** to enable HTTPS
4. GitHub will automatically provision an SSL certificate (may take a few minutes)

**Troubleshooting HTTPS:**
- If "Enforce HTTPS" is grayed out, DNS hasn't fully propagated yet
- Wait 24-48 hours and try again
- Ensure all 4 A records are correctly configured
- GitHub will show a green checkmark when the domain is verified

---

## 5. Verification Checklist

After setup, verify:

- [ ] CNAME file is in repository root
- [ ] All 4 A records are added at domain registrar
- [ ] CNAME record for www is added (optional)
- [ ] Custom domain is configured in GitHub Pages settings
- [ ] DNS has propagated (check with whatsmydns.net)
- [ ] Site loads at greenturtleproductions.com.au
- [ ] HTTPS is enabled and working
- [ ] All images and links work correctly

---

## 6. Common Issues & Solutions

### Issue: "Domain not verified" in GitHub
**Solution:** Wait for DNS propagation (24-48 hours). Ensure A records are correct.

### Issue: Site loads but shows "Not Secure"
**Solution:** Enable "Enforce HTTPS" in GitHub Pages settings after DNS propagates.

### Issue: www subdomain doesn't work
**Solution:** Add the CNAME record for `www` pointing to `lemontoohey.github.io`.

### Issue: Mixed content warnings
**Solution:** Ensure all external resources (CDNs, fonts) use HTTPS URLs (you're already doing this ✅).

---

## 7. Current GitHub Pages URL

Your current GitHub Pages URL is:
- **https://lemontoohey.github.io/daz_newsletter/**

After custom domain setup, it will be:
- **https://greenturtleproductions.com.au**
- **https://www.greenturtleproductions.com.au** (if CNAME is added)

---

## Notes

- The `.nojekyll.txt` file in your repo suggests Jekyll might be disabled, which is fine for static HTML
- All your paths are relative, so no base path changes needed
- GitHub Pages will automatically redirect `lemontoohey.github.io/daz_newsletter` to your custom domain once configured
