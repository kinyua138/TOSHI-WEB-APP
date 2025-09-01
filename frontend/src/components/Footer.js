import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Data Analytics',
    'Cloud Solutions',
    'ERP Systems',
    'Cybersecurity',
    'Website Development',
    'E-commerce Solutions'
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B254713159136&text=Hi! I'd like to know more about your services.&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-hero-pattern"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-xl text-white">TS</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">Toshi Services</h3>
                  <p className="text-gray-400 text-sm">MIS Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering businesses with data-driven precision through cutting-edge 
                MIS tools and comprehensive web solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-heading font-semibold text-lg mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-heading font-semibold text-lg mb-6">Contact Info</h4>
              <div className="space-y-4">
                <a
                  href="tel:+254713159136"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-200">
                    <FaPhone size={16} />
                  </div>
                  <div>
                    <p className="font-medium">+254 713 159 136</p>
                    <p className="text-sm text-gray-400">Call us anytime</p>
                  </div>
                </a>

                <a
                  href="mailto:info@toshiservices.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-200">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <p className="font-medium">info@toshiservices.com</p>
                    <p className="text-sm text-gray-400">Send us an email</p>
                  </div>
                </a>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Nairobi, Kenya</p>
                    <p className="text-sm text-gray-400">East Africa</p>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mt-6"
                >
                  <FaWhatsapp size={18} />
                  <span>WhatsApp Us</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h4 className="font-heading font-semibold text-xl mb-2">
                Stay Updated with Our Latest Solutions
              </h4>
              <p className="text-gray-400 mb-6">
                Get insights on MIS trends, technology updates, and business solutions
              </p>
              <div className="max-w-md mx-auto flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Toshi Services. All rights reserved. | 
                <Link to="/privacy" className="hover:text-white ml-1">Privacy Policy</Link> | 
                <Link to="/terms" className="hover:text-white ml-1">Terms of Service</Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Made with ❤️ in Kenya</span>
                <button
                  onClick={handleScrollToTop}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label="Scroll to top"
                >
                  <FaArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
