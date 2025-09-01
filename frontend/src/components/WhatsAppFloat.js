import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const { services, quickWhatsAppContact } = useApp();

  const handleQuickContact = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    const service = selectedService || 'General Inquiry';
    const fullMessage = message.trim() || `Hi! I'm interested in your ${service} service.`;

    try {
      await quickWhatsAppContact(name, service);
      setIsOpen(false);
      setName('');
      setMessage('');
      setSelectedService('');
    } catch (error) {
      console.error('WhatsApp contact error:', error);
    }
  };

  const handleDirectWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B254713159136&text=Hi! I'd like to know more about your services.&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* WhatsApp Float Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open WhatsApp Chat"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <FaTimes size={24} /> : <FaWhatsapp size={24} />}
          </motion.div>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        </motion.button>
      </motion.div>

      {/* WhatsApp Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FaWhatsapp className="text-green-500" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Stopper Tech</h3>
                  <p className="text-sm opacity-90">Typically replies instantly</p>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-4 bg-gray-50 min-h-[200px]">
              {/* Welcome Message */}
              <div className="bg-white p-3 rounded-lg shadow-sm mb-4 relative">
                <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"></div>
                <p className="text-sm text-gray-700">
                  👋 Hi there! I'm here to help you with our services. How can I assist you today?
                </p>
              </div>

              {/* Quick Contact Form */}
              <form onSubmit={handleQuickContact} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a service (optional)</option>
                    {services.map((service) => (
                      <option key={service._id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <textarea
                    placeholder="Your message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaPaperPlane size={14} />
                    <span>Start Chat</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleDirectWhatsApp}
                    className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-50 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Direct
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 px-4 py-2 text-center">
              <p className="text-xs text-gray-500">
                Powered by WhatsApp Business
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppFloat;
