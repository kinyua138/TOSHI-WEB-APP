import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaFilter,
  FaSearch,
  FaArrowRight,
  FaClock,
  FaDollarSign,
  FaCheckCircle,
  FaWhatsapp,
  FaStar
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Services = () => {
  const { services, quickWhatsAppContact, loading } = useApp();
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Get unique categories
  const categories = ['All', ...new Set(services.map(service => service.category))];

  // Filter and sort services
  useEffect(() => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricing.startingPrice - b.pricing.startingPrice;
        case 'price-high':
          return b.pricing.startingPrice - a.pricing.startingPrice;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredServices(filtered);
  }, [services, selectedCategory, searchTerm, sortBy]);

  const handleQuickInquiry = async (serviceName) => {
    try {
      await quickWhatsAppContact('Website Visitor', serviceName);
    } catch (error) {
      console.error('Quick inquiry error:', error);
    }
  };

  const formatDeliveryTime = (service) => {
    const { min, max, unit } = service.deliveryTime;
    if (min === max) {
      return `${min} ${unit}`;
    }
    return `${min}-${max} ${unit}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section ref={headerRef} className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Comprehensive MIS solutions and web development services to transform your business
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredServices.length} of {services.length} services
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
                >
                  {/* Service Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{service.icon}</div>
                      <span className="bg-primary-100 text-primary-600 text-xs font-medium px-2 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="p-6 border-b border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" size={12} />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-sm text-primary-600 font-medium">
                          +{service.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing & Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <FaDollarSign size={12} />
                          <span>Starting from</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          KSH {service.pricing.startingPrice.toLocaleString()}
                          {service.pricing.maxPrice && (
                            <span className="text-sm font-normal text-gray-500">
                              - KSH {service.pricing.maxPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                          <FaClock size={12} />
                          <span>Delivery</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatDeliveryTime(service)}
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    {service.technologies && service.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2">Technologies:</div>
                        <div className="flex flex-wrap gap-1">
                          {service.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {service.technologies.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              +{service.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link
                        to={`/services/${service._id}`}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                      >
                        <span>View Details</span>
                        <FaArrowRight size={12} />
                      </Link>
                      <button
                        onClick={() => handleQuickInquiry(service.name)}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        title="Quick WhatsApp Inquiry"
                      >
                        <FaWhatsapp size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Don't See What You Need?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              We offer custom solutions tailored to your specific business requirements. 
              Let's discuss your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Request Custom Solution</span>
                <FaArrowRight />
              </Link>
              <button
                onClick={() => handleQuickInquiry('Custom Solution')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <FaWhatsapp />
                <span>WhatsApp Us</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
