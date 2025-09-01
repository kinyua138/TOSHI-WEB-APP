# 🚀 Step-by-Step Netlify Deployment Guide

Your backend is already deployed at: `https://toshi-web-app.onrender.com/`
Now let's deploy the frontend to Netlify.

## 📋 Prerequisites Checklist

✅ Backend deployed on Render: `https://toshi-web-app.onrender.com/`
✅ Frontend build successful (build folder exists)
✅ Environment variables configured
✅ Netlify configuration file ready

## 🌐 Method 1: Drag & Drop Deployment (Fastest - 5 minutes)

### Step 1: Build the Frontend Locally
```bash
cd frontend
npm install
npm run build
```
✅ **Status**: Already completed (build folder exists)

### Step 2: Go to Netlify
1. Open [Netlify](https://app.netlify.com/) in your browser
2. Sign up or log in to your account
3. You'll see the main dashboard

### Step 3: Deploy via Drag & Drop
1. Look for the section that says **"Want to deploy a new site without connecting to Git?"**
2. **Drag and drop** the entire `frontend/build` folder onto the deployment area
3. Netlify will automatically:
   - Upload your files
   - Deploy your site
   - Give you a random URL like `https://amazing-name-123456.netlify.app`

### Step 4: Configure Environment Variables
1. Go to **Site settings** → **Environment variables**
2. Add these variables:
   ```
   REACT_APP_API_URL = https://toshi-web-app.onrender.com/api
   REACT_APP_WHATSAPP_PHONE = +254713159136
   ```
3. Click **Save**

### Step 5: Redeploy with Environment Variables
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete (2-3 minutes)

---

## 🔗 Method 2: Git Integration (Recommended for updates)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### Step 2: Connect GitHub to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"New site from Git"**
3. Choose **GitHub**
4. Select your repository: `TOSHI-WEB-APP`

### Step 3: Configure Build Settings
```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/build
```

### Step 4: Set Environment Variables
In **Site settings** → **Environment variables**, add:
```
REACT_APP_API_URL = https://toshi-web-app.onrender.com/api
REACT_APP_WHATSAPP_PHONE = +254713159136
```

### Step 5: Deploy
1. Click **Deploy site**
2. Wait for build and deployment (5-10 minutes)

---

## 🔧 Troubleshooting Common Issues

### Issue 1: Build Fails
**Error**: "Build script returned non-zero exit code"

**Solution**:
1. Check if `netlify.toml` is in the `frontend` folder
2. Verify build command in Netlify settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

### Issue 2: API Calls Not Working
**Error**: Network errors or CORS issues

**Solution**:
1. Verify environment variables are set correctly
2. Check that backend URL is accessible: `https://toshi-web-app.onrender.com/api/health`
3. Ensure CORS is configured in backend for your Netlify URL

### Issue 3: Routing Issues (404 on refresh)
**Error**: Page not found when refreshing

**Solution**: The `netlify.toml` file should handle this with redirects:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## ✅ Verification Steps

After deployment, test these:

### 1. Basic Functionality
- [ ] Site loads at your Netlify URL
- [ ] All pages accessible (Home, Services, About, Contact)
- [ ] Mobile responsive design works

### 2. API Integration
- [ ] Services page shows pricing in KSH
- [ ] Contact form submits successfully
- [ ] WhatsApp integration works

### 3. Performance
- [ ] Site loads quickly (< 3 seconds)
- [ ] Images load properly
- [ ] No console errors

---

## 🎯 Quick Deployment Commands

If you want to redeploy quickly:

```bash
# Build and prepare for deployment
cd frontend
npm run build

# If using Git integration, push changes
git add .
git commit -m "Update for deployment"
git push origin main
```

---

## 📞 Your Deployed URLs

After successful deployment:

- **Frontend**: `https://your-site-name.netlify.app`
- **Backend**: `https://toshi-web-app.onrender.com`
- **Health Check**: `https://toshi-web-app.onrender.com/api/health`

---

## 🎉 Success Checklist

When everything is working:

- [ ] ✅ Frontend deployed on Netlify
- [ ] ✅ Backend running on Render
- [ ] ✅ Database connected (MongoDB Atlas)
- [ ] ✅ Environment variables configured
- [ ] ✅ WhatsApp integration working
- [ ] ✅ Contact forms working
- [ ] ✅ All pages responsive

**Congratulations! Your Toshi Web App is now live! 🚀**

---

## 🔄 Next Steps

1. **Custom Domain** (Optional): Configure your own domain
2. **Analytics**: Add Google Analytics
3. **Monitoring**: Set up uptime monitoring
4. **SEO**: Submit to search engines

**Need help?** Contact: +254 713 159 136 or WhatsApp for support!
