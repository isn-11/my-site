# 🚀 Vercel Deployment Guide for iktara E-Commerce

## Prerequisites

Before deploying, make sure you have:
- [ ] A GitHub/GitLab/Bitbucket account
- [ ] A Vercel account (sign up free at [vercel.com](https://vercel.com))
- [ ] Git installed on your computer

## 📋 Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Push Code to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - iktara medical scrubs e-commerce"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `iktara-medical-scrubs`
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/iktara-medical-scrubs.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Deploy on Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in

2. **Click "Add New Project"**

3. **Import your GitHub repository**:
   - Select "Import Git Repository"
   - Choose your `iktara-medical-scrubs` repository
   - Click "Import"

4. **Configure Project**:
   - **Project Name**: `iktara-medical-scrubs` (or your preferred name)
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Click "Deploy"** 🎉

6. **Wait 1-2 minutes** for deployment to complete

7. **Your app is live!** 🌟
   - Vercel will give you a URL like: `https://iktara-medical-scrubs.vercel.app`
   - You can also add a custom domain in Vercel settings

---

### Method 2: Deploy via Vercel CLI (For Developers)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Navigate to your project directory
cd /path/to/your/project

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? iktara-medical-scrubs
# - In which directory is your code located? ./
```

#### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `shop.iktara.com`)
4. Follow DNS configuration instructions

### Environment Variables (If needed in future)

1. Go to project "Settings" → "Environment Variables"
2. Add any API keys or secrets
3. Redeploy for changes to take effect

---

## 📱 Testing Your Deployment

After deployment, test these features:

- ✅ Browse products by category
- ✅ Search and filter products
- ✅ Add items to cart
- ✅ Favorite products
- ✅ Complete checkout flow
- ✅ View profile page
- ✅ Contact form
- ✅ About Us page
- ✅ Brand video (click iktara logo)

---

## 🔄 Updating Your Deployed App

Every time you push changes to GitHub, Vercel will **automatically redeploy**:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel will detect the push and redeploy in 1-2 minutes!

---

## 🆘 Troubleshooting

### Build Fails

**Check build logs** in Vercel dashboard:
- Look for npm install errors
- Check for TypeScript errors
- Verify all dependencies are in package.json

### App Loads but Shows Errors

**Check browser console** (F12):
- Look for 404 errors on assets
- Check for import path issues
- Verify environment variables

### Images Not Loading

- Unsplash images should load fine
- Figma assets are embedded in the build

---

## 📊 Vercel Features You Get Free

✅ **Automatic HTTPS** - Secure by default  
✅ **Global CDN** - Fast worldwide  
✅ **Automatic deployments** - Push to deploy  
✅ **Preview deployments** - Every PR gets a URL  
✅ **Analytics** - See your traffic  
✅ **Zero config** - Works out of the box  

---

## 🎉 Success!

Your iktara medical scrubs e-commerce app is now live on the internet!

**Share your URL:**
- With customers: `https://iktara-medical-scrubs.vercel.app`
- On social media
- In your email signature
- On business cards

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

---

**Deployed with ❤️ using Vercel**
