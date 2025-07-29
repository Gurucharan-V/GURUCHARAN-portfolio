# 🌐 charnuu.site Domain Setup Guide

## Quick Setup Steps

### 1. Deploy to Netlify
- **Option A**: Drag and drop the `dist` folder to Netlify
- **Option B**: Connect your GitHub repository for automatic deployments

### 2. Add Custom Domain
1. Go to your Netlify dashboard
2. Select your portfolio site
3. Go to **Site settings** → **Domain management**
4. Click **"Add custom domain"**
5. Enter: `charnuu.site`
6. Click **"Verify"**

### 3. Configure DNS

#### Option A: Use Netlify DNS (Recommended)
1. In Netlify, click **"Use Netlify DNS"**
2. Go to your domain registrar
3. Update nameservers to:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

#### Option B: Keep Current DNS Provider
Add these records at your domain registrar:
- **A Record**: `@` → `75.2.60.5`
- **CNAME Record**: `www` → `your-site-name.netlify.app`

### 4. SSL Certificate
- Netlify will automatically provision SSL
- Your site will be available at `https://charnuu.site`

## ✅ What's Ready

Your portfolio includes:
- ✅ **59 tests passing** - fully tested
- ✅ **Mobile optimization** - responsive design
- ✅ **No hover animations on mobile** - touch-friendly
- ✅ **Bullet points** - improved readability
- ✅ **Professional date styling** - pill-shaped badges
- ✅ **Production build** - optimized for deployment

## 🚀 Final Result

Once configured, your portfolio will be live at:
**https://charnuu.site**

## 📱 Mobile Features

- Responsive design with mobile-first approach
- Touch-optimized interactions
- Optimized text sizes for mobile readability
- Professional date styling with pill-shaped badges
- No hover animations on mobile devices

## 🔧 Troubleshooting

If you encounter issues:
1. **DNS Propagation**: Can take up to 48 hours
2. **SSL Certificate**: Usually takes 24-48 hours to provision
3. **Domain Verification**: Make sure DNS records are correct

## 📞 Support

Your portfolio is production-ready and optimized for the `charnuu.site` domain! 