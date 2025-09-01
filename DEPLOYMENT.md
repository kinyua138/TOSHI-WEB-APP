# Deployment Guide - Toshi Web App

This guide covers deploying the Toshi Web App to various platforms.

## 🚀 Quick Start (Local Development)

### Windows
```bash
# Run the batch file
start.bat

# Or manually:
npm run install-deps
npm run dev
```

### Linux/Mac
```bash
# Make script executable
chmod +x start.sh

# Run the script
./start.sh

# Or manually:
npm run install-deps
npm run dev
```

## 🌐 Production Deployment

### Frontend Deployment (Netlify/Vercel)

#### Netlify
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Netlify:
   - Drag and drop the `build` folder to Netlify
   - Or connect your Git repository
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`

3. Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

#### Vercel
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

### Backend Deployment

#### Heroku
1. Create a Heroku app:
   ```bash
   heroku create toshi-backend
   ```

2. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set EMAIL_USER=your-email
   heroku config:set EMAIL_PASS=your-password
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

3. Deploy:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a toshi-backend
   git push heroku main
   ```

#### Railway
1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   railway login
   cd backend
   railway deploy
   ```

#### DigitalOcean App Platform
1. Create a new app on DigitalOcean
2. Connect your repository
3. Configure build settings:
   - Source directory: `backend`
   - Build command: `npm install`
   - Run command: `npm start`

### Database Setup

#### MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get the connection string
5. Update `MONGODB_URI` in your environment variables

#### Local MongoDB
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

## 🔧 Environment Configuration

### Backend Environment Variables
```env
# Production
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/toshi-web-app
FRONTEND_URL=https://your-frontend-domain.com

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=info@stoppertech.com

# Security
JWT_SECRET=your-super-secret-jwt-key-here
BCRYPT_ROUNDS=12

# WhatsApp
WHATSAPP_PHONE=+254713159136
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_WHATSAPP_PHONE=+254713159136
```

## 📊 Monitoring and Analytics

### Backend Monitoring
- Use services like New Relic, DataDog, or Heroku metrics
- Monitor API response times and error rates
- Set up alerts for downtime

### Frontend Analytics
- Google Analytics
- Hotjar for user behavior
- Sentry for error tracking

## 🔒 Security Checklist

### Backend Security
- [x] CORS configured
- [x] Rate limiting enabled
- [x] Helmet for security headers
- [x] Environment variables for secrets
- [ ] SSL/HTTPS enabled
- [ ] Database connection secured
- [ ] Input validation and sanitization

### Frontend Security
- [x] No sensitive data in client-side code
- [x] HTTPS enforced
- [x] Content Security Policy headers
- [ ] Regular dependency updates

## 🚀 Performance Optimization

### Frontend
- [x] Code splitting with React.lazy
- [x] Image optimization
- [x] Minification and compression
- [x] CDN for static assets
- [x] Service worker for caching

### Backend
- [x] Database indexing
- [x] Response compression
- [x] Caching strategies
- [ ] Load balancing for high traffic

## 📱 Mobile Optimization

- [x] Responsive design
- [x] Touch-friendly interfaces
- [x] Fast loading times
- [x] PWA capabilities
- [x] WhatsApp integration optimized for mobile

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### End-to-End Testing
- Use Cypress or Playwright
- Test critical user journeys
- Test WhatsApp integration

## 📈 SEO Optimization

- [x] Meta tags and Open Graph
- [x] Structured data (JSON-LD)
- [x] Sitemap generation
- [x] Robot.txt configuration
- [x] Fast loading times
- [x] Mobile-friendly design

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Build
        run: cd frontend && npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=frontend/build
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "toshi-backend"
          heroku_email: "your-email@example.com"
          appdir: "backend"
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check FRONTEND_URL in backend environment
   - Verify CORS configuration

2. **Database Connection Issues**
   - Verify MongoDB URI
   - Check network access in MongoDB Atlas

3. **Email Not Sending**
   - Verify Gmail app password
   - Check email configuration

4. **WhatsApp Links Not Working**
   - Verify phone number format
   - Test URL encoding

### Logs and Debugging
```bash
# Backend logs
heroku logs --tail -a toshi-backend

# Frontend build logs
netlify logs

# Local debugging
DEBUG=* npm run dev
```

## 📞 Support

For deployment issues or questions:
- **Email**: info@stoppertech.com
- **Phone**: +254 713 159 136
- **WhatsApp**: [Contact Support](https://api.whatsapp.com/send/?phone=%2B254713159136&text=Hi!%20I%20need%20help%20with%20deployment.&type=phone_number&app_absent=0)

---

**Happy Deploying! 🚀**
