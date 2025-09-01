import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';

// Context
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#22c55e',
                  secondary: '#ffffff',
                },
              },
              error: {
                duration: 5000,
                theme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* WhatsApp Float Button */}
          <WhatsAppFloat />

          {/* Scroll to Top */}
          <ScrollToTop />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
