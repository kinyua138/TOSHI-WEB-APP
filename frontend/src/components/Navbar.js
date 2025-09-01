import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { mobileMenuOpen, toggleMobileMenu } = useApp();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  }, [location, mobileMenuOpen, toggleMobileMenu]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B254713159136&text=Hi! I'd like to know more about your services.&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className={`border-b transition-all duration-300 ${
          isScrolled ? 'border-gray-200' : 'border-white/20'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="tel:+254713159136"
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-600 hover:text-primary-600'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <FaPhone size={12} />
                  <span>+254 713 159 136</span>
                </a>
                <a
                  href="mailto:info@toshiservices.com"
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-600 hover:text-primary-600'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <FaEnvelope size={12} />
                  <span>info@toshiservices.com</span>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleWhatsAppClick}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    isScrolled
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/20 text-white'
              }`}>
                <span className="font-bold text-lg">TS</span>
              </div>
              <div>
                <h1 className={`font-heading font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Toshi Services
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-gray-500' : 'text-white/70'
                }`}>
                  MIS Solutions
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-medium transition-colors duration-200 ${
                    isActiveLink(link.path)
                      ? isScrolled
                        ? 'text-primary-600'
                        : 'text-white'
                      : isScrolled
                      ? 'text-gray-700 hover:text-primary-600'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActiveLink(link.path) && (
                    <motion.div
                      layoutId="activeLink"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        isScrolled ? 'bg-primary-600' : 'bg-white'
                      }`}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isScrolled
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-primary-600 hover:bg-white/90'
                }`}
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-lg text-white">TS</span>
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-lg text-gray-900">
                        Toshi Services
                      </h2>
                      <p className="text-sm text-gray-500">MIS Solutions</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-6 py-3 text-lg font-medium transition-colors duration-200 ${
                          isActiveLink(link.path)
                            ? 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="p-6 border-t border-gray-200 space-y-4">
                  <a
                    href="tel:+254713159136"
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary-600"
                  >
                    <FaPhone size={16} />
                    <span>+254 713 159 136</span>
                  </a>
                  <a
                    href="mailto:info@toshiservices.com"
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary-600"
                  >
                    <FaEnvelope size={16} />
                    <span>info@toshiservices.com</span>
                  </a>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
                  >
                    WhatsApp Us
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
