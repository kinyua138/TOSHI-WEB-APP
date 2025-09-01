# 🚀 Render + Netlify Deployment Guide

Complete step-by-step guide to deploy Toshi Web App with backend on Render and frontend on Netlify.

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- Netlify account (free tier available)
- MongoDB Atlas account (free tier available)
- Gmail account for email notifications

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up/Login and create a new project
3. Create a new cluster (choose free tier M0)
4. Wait for cluster to be created (2-3 minutes)

### Step 2: Configure Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create a user with username/password (save these!)
4. Set privileges to "Read and write to any database"

### Step 3: Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
4. Confirm the change

### Step 4: Get Connection String

1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `toshi-web-app`

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/toshi-web-app?retryWrites=true&w=majority`

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Repository

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `toshi-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

### Step 3: Set Environment Variables

In Render dashboard, go to your service → Environment tab and add:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/toshi-web-app?retryWrites=true&w=majority
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
NOTIFICATION_EMAIL=info@toshiservices.com
FRONTEND_URL=https://your-netlify-app.netlify.app
WHATSAPP_PHONE=+254713159136
JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 4: Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Generate an app password for "Mail"
5. Use this password in `EMAIL_PASS` environment variable

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Your backend will be available at: `https://your-service-name.onrender.com`

### Step 6: Test Backend

Visit: `https://your-service-name.onrender.com/api/health`
You should see: `{"status":"OK","message":"Toshi Web App API is running"}`

## 🌐 Frontend Deployment (Netlify)

### Step 1: Update Frontend Environment

1. Edit `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-render-service.onrender.com/api
REACT_APP_WHATSAPP_PHONE=+254713159136
```

2. Update `frontend/netlify.toml` with your Render URL:
```toml
[context.production.environment]
  REACT_APP_API_URL = "https://your-render-service.onrender.com/api"
  REACT_APP_WHATSAPP_PHONE = "+254713159136"
```

### Step 2: Deploy to Netlify

#### Option A: Drag & Drop (Quick)

1. Build the frontend locally:
```bash
cd frontend
npm install
npm run build
```

2. Go to [Netlify](https://app.netlify.com/)
3. Drag and drop the `frontend/build` folder to Netlify
4. Your site will be deployed instantly!

#### Option B: Git Integration (Recommended)

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

5. Set environment variables in Netlify:
   - Go to Site settings → Environment variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-render-service.onrender.com/api
     REACT_APP_WHATSAPP_PHONE=+254713159136
     ```

6. Click "Deploy site"

### Step 3: Update Backend CORS

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable with your Netlify URL:
   ```
   FRONTEND_URL=https://your-netlify-app.netlify.app
   ```
3. Redeploy the backend service

## 🔄 Final Configuration

### Step 1: Seed Database

1. Visit your backend URL: `https://your-render-service.onrender.com/api/services/seed`
2. This will populate your database with initial services data
3. You should see: `{"success":true,"message":"Services seeded successfully with KSH pricing"}`

### Step 2: Test Complete Application

1. Visit your Netlify URL: `https://your-netlify-app.netlify.app`
2. Test the following:
   - ✅ Homepage loads
   - ✅ Services page shows pricing in KSH
   - ✅ Contact form works
   - ✅ WhatsApp integration works
   - ✅ All pages are responsive

## 🎯 Custom Domain Setup (Optional)

### For Netlify (Frontend)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `toshiservices.com`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Let's Encrypt)

### For Render (Backend)

1. Go to your service → Settings
2. Add custom domain (e.g., `api.toshiservices.com`)
3. Configure DNS CNAME record
4. SSL is automatic

## 🔍 Monitoring & Maintenance

### Backend Monitoring (Render)

- Check logs: Render Dashboard → Your service → Logs
- Monitor performance: Render Dashboard → Metrics
- Set up alerts for downtime

### Frontend Monitoring (Netlify)

- Check build logs: Netlify Dashboard → Deploys
- Monitor performance: Netlify Analytics
- Set up form notifications

### Database Monitoring (MongoDB Atlas)

- Monitor usage: Atlas Dashboard → Metrics
- Set up alerts for high usage
- Regular backups are automatic

## 🚨 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check environment variables are set correctly
   - Verify MongoDB connection string
   - Check Render logs for errors

2. **Frontend can't connect to backend**
   - Verify `REACT_APP_API_URL` is correct
   - Check CORS settings in backend
   - Ensure backend is deployed and running

3. **Email notifications not working**
   - Verify Gmail app password
   - Check email environment variables
   - Test with a simple email first

4. **WhatsApp links not working**
   - Check phone number format
   - Verify URL encoding
   - Test links manually

### Getting Help

- **Render Support**: [Render Docs](https://render.com/docs)
- **Netlify Support**: [Netlify Docs](https://docs.netlify.com/)
- **MongoDB Atlas**: [Atlas Docs](https://docs.atlas.mongodb.com/)

## 📞 Support

For deployment help:
- **Email**: info@toshiservices.com
- **Phone**: +254 713 159 136
- **WhatsApp**: [Get Help](https://api.whatsapp.com/send/?phone=%2B254713159136&text=Hi!%20I%20need%20help%20with%20deployment.&type=phone_number&app_absent=0)

---

## 🎉 Congratulations!

Your Toshi Web App is now live! 

- **Frontend**: https://your-netlify-app.netlify.app
- **Backend**: https://your-render-service.onrender.com
- **Database**: MongoDB Atlas cluster

**Next Steps:**
1. Set up custom domains
2. Configure analytics
3. Set up monitoring alerts
4. Plan for scaling as you grow

**Happy deploying! 🚀**
