# Custom Domain Setup Guide: anthology.greenturtleproductions.com.au

## 1. CNAME File ✅

The `CNAME` file has been created in the root directory with the content:
```
anthology.greenturtleproductions.com.au
```

**Important:** This file must be in the root of your repository (same level as `index.html`).

---

## 2. DNS Records Configuration

Add this DNS record at your domain registrar (GoDaddy, Namecheap, etc.):

### CNAME Record (Required)
Add **1 CNAME record** for the `anthology` subdomain:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| CNAME | anthology | lemontoohey.github.io | 3600 |

**Important Notes:**
- **Host/Name:** `anthology` (just the subdomain name, not the full domain)
- **Value/Target:** `lemontoohey.github.io` (your GitHub Pages URL)
- **TTL:** 3600 (or use your registrar's default)

**How to add at common registrars:**
- **GoDaddy:** DNS Management → Add Record → Type: CNAME, Name: `anthology`, Value: `lemontoohey.github.io`
- **Namecheap:** Advanced DNS → Add New Record → Type: CNAME Record, Host: `anthology`, Value: `lemontoohey.github.io`
- **Cloudflare:** DNS → Add record → Type: CNAME, Name: `anthology`, Target: `lemontoohey.github.io`

**Note:** Since you're using a subdomain, you only need a CNAME record (not A records). This is simpler than root domain setup!

---

## 3. Path Verification ✅

**Good News:** Your paths are already configured correctly and will work on the subdomain!

All your file paths are **relative** (no leading slashes):
- ✅ `href="style.css"` 
- ✅ `src="nas-logo.png"`
- ✅ `href="teacher-pack.html"`
- ✅ `src="video-player.js"`
- ✅ `href="charles-blackman.html"`
- ✅ `href="john-coburn.html"`

**Why this works:**
- Relative paths work the same way on subdomains as they do on root domains
- `href="teacher-pack.html"` resolves to `https://anthology.greenturtleproductions.com.au/teacher-pack.html`
- `src="nas-logo.png"` resolves to `https://anthology.greenturtleproductions.com.au/nas-logo.png`
- No base path changes needed since you're not using absolute paths

**No changes required** - your site will work immediately after DNS propagation on the subdomain.

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
3. Under **Custom domain**, enter: `anthology.greenturtleproductions.com.au`
4. Click **Save**

### Step 3: Wait for DNS Propagation
- DNS changes can take **24-48 hours** to propagate globally
- You can check propagation status at: https://www.whatsmydns.net/
- Enter `anthology.greenturtleproductions.com.au` and check for the CNAME record pointing to `lemontoohey.github.io`

### Step 4: Enable HTTPS (After DNS Propagation)
**Important:** Wait until DNS has fully propagated and GitHub recognizes your domain before enabling HTTPS.

1. Go to **Settings** → **Pages** in your repository
2. Under **Custom domain**, you should see a checkbox: **"Enforce HTTPS"**
3. **Check the box** to enable HTTPS
4. GitHub will automatically provision an SSL certificate (may take a few minutes)

**Troubleshooting HTTPS:**
- If "Enforce HTTPS" is grayed out, DNS hasn't fully propagated yet
- Wait 24-48 hours and try again
- Ensure the CNAME record is correctly configured (Host: `anthology`, Value: `lemontoohey.github.io`)
- GitHub will show a green checkmark when the domain is verified

---

## 5. Verification Checklist

After setup, verify:

- [ ] CNAME file is in repository root with `anthology.greenturtleproductions.com.au`
- [ ] CNAME record for `anthology` is added at domain registrar
- [ ] CNAME record points to `lemontoohey.github.io`
- [ ] Custom domain is configured in GitHub Pages settings
- [ ] DNS has propagated (check with whatsmydns.net)
- [ ] Site loads at anthology.greenturtleproductions.com.au
- [ ] HTTPS is enabled and working
- [ ] All images and links work correctly

---

## 6. Common Issues & Solutions

### Issue: "Domain not verified" in GitHub
**Solution:** Wait for DNS propagation (24-48 hours). Ensure CNAME record is correct (Host: `anthology`, Value: `lemontoohey.github.io`).

### Issue: Site loads but shows "Not Secure"
**Solution:** Enable "Enforce HTTPS" in GitHub Pages settings after DNS propagates.

### Issue: Subdomain doesn't resolve
**Solution:** Verify the CNAME record is correctly set. The Host should be `anthology` (not `anthology.greenturtleproductions.com.au`). The Value should be `lemontoohey.github.io`.

### Issue: Mixed content warnings
**Solution:** Ensure all external resources (CDNs, fonts) use HTTPS URLs (you're already doing this ✅).

---

## 7. Current GitHub Pages URL

Your current GitHub Pages URL is:
- **https://lemontoohey.github.io/daz_newsletter/**

After custom domain setup, it will be:
- **https://anthology.greenturtleproductions.com.au**

---

## Notes

- The `.nojekyll.txt` file in your repo suggests Jekyll might be disabled, which is fine for static HTML
- All your paths are relative, so no base path changes needed
- GitHub Pages will automatically redirect `lemontoohey.github.io/daz_newsletter` to your custom domain once configured
