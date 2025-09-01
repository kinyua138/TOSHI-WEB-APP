# Toshi Web App - Toshi Services

A comprehensive full-stack web application for Toshi Services, showcasing MIS solutions and web development services with integrated WhatsApp communication.

## 🚀 Features

### Frontend
- **Modern React.js SPA** with responsive design
- **Professional UI/UX** with smooth animations using Framer Motion
- **WhatsApp Integration** with floating chat widget
- **Service Showcase** with detailed pricing and packages
- **Contact Forms** with validation and email notifications
- **SEO Optimized** with meta tags and structured data
- **PWA Support** with manifest and service worker ready
- **Tailwind CSS** for modern styling and responsive design

### Backend
- **Node.js/Express** RESTful API
- **MongoDB** database with Mongoose ODM
- **Email Integration** with Nodemailer
- **Rate Limiting** and security middleware
- **CORS** configuration for cross-origin requests
- **Environment Configuration** for different deployment stages

### Services Offered
- **MIS Solutions**: Data Analytics, Cloud Solutions, ERP Systems, Cybersecurity
- **Web Development**: Website Development, E-commerce, Business Portals, Blogs
- **Custom Solutions** tailored to client needs

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Hot Toast
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer
- CORS
- Helmet (Security)
- Express Rate Limit
- dotenv

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd toshi-web-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-deps
   ```

3. **Configure environment variables**
   
   Copy the example environment file:
   ```bash
   cp backend/.env.example backend/.env
   ```
   
   Update the following variables in `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/toshi-web-app
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NOTIFICATION_EMAIL=info@toshiservices.com
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

5. **Seed initial data**
   
   Visit `http://localhost:5000/api/services/seed` to populate the database with initial services data.

## 🌐 API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services/seed` - Seed initial services data

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id/status` - Update contact status

### Inquiries
- `GET /api/inquiries/stats` - Get inquiry statistics
- `GET /api/inquiries/recent` - Get recent inquiries
- `POST /api/inquiries/quick-contact` - Quick WhatsApp contact

### Health Check
- `GET /api/health` - API health status

## 📱 WhatsApp Integration

The app includes comprehensive WhatsApp integration:

- **Floating Chat Widget** with quick contact form
- **Direct WhatsApp Links** throughout the application
- **Automatic Message Generation** based on selected services
- **Contact Form Integration** that redirects to WhatsApp after submission

WhatsApp URL format:
```
https://api.whatsapp.com/send/?phone=%2B254713159136&text=MESSAGE&type=phone_number&app_absent=0
```

## 🎨 Design Features

### UI/UX
- **Responsive Design** - Works on all devices
- **Modern Animations** - Smooth transitions and micro-interactions
- **Professional Color Scheme** - Blue, green, and orange brand colors
- **Accessibility** - WCAG compliant with proper contrast and focus states
- **Loading States** - Skeleton screens and spinners
- **Error Handling** - User-friendly error messages

### Components
- **Navbar** with mobile menu and scroll effects
- **Hero Section** with animated background elements
- **Service Cards** with hover effects and pricing
- **Contact Forms** with validation and success states
- **Footer** with comprehensive links and social media
- **WhatsApp Float** with expandable chat interface

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
cd backend
# Set environment variables
# Deploy using your preferred platform
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
FRONTEND_URL=https://your-frontend-domain.com
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
```

## 📊 Features Overview

### Home Page
- Hero section with call-to-action
- Services preview with pricing
- Features showcase
- Statistics section
- Client testimonials
- Contact call-to-action

### Services Page
- Complete services listing
- Search and filter functionality
- Category-based filtering
- Price sorting
- Service comparison

### Service Detail Page
- Comprehensive service information
- Package-based pricing
- Feature comparison
- Related services
- Direct contact options

### About Page
- Company story and timeline
- Team member profiles
- Core values and mission
- Company statistics
- Contact information

### Contact Page
- Comprehensive contact form
- Multiple contact methods
- Office hours and location
- Quick action buttons
- Form validation and success handling

## 🔧 Development

### Project Structure
```
toshi-web-app/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── package.json
```

### Available Scripts
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run build` - Build frontend for production
- `npm run install-deps` - Install all dependencies

## 📞 Contact Information

- **Phone**: +254 713 159 136
- **Email**: info@toshiservices.com
- **Website**: www.toshiservices.com
- **WhatsApp**: [Direct Link](https://api.whatsapp.com/send/?phone=%2B254713159136&text=Hi!%20I'd%20like%20to%20know%20more%20about%20your%20services.&type=phone_number&app_absent=0)

## 📄 License

This project is proprietary software owned by Toshi Services. All rights reserved.

## 🤝 Contributing

This is a private project for Toshi Services. For any modifications or improvements, please contact the development team.

---

**Built with ❤️ by Toshi Services Development Team**
