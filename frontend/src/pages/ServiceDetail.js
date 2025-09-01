import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaLightbulb,
  FaArrowRight,
  FaSpinner
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getService, services, quickWhatsAppContact } = useApp();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('basic');

  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [detailsRef, detailsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [pricingRef, pricingInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const serviceData = await getService(id);
        setService(serviceData);
      } catch (err) {
        setError('Service not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id, getService]);

  const formatDeliveryTime = (service) => {
    const { min, max, unit } = service.deliveryTime;
    if (min === max) {
      return `${min} ${unit}`;
    }
    return `${min}-${max} ${unit}`;
  };

  const handleQuickInquiry = async () => {
    if (!service) return;
    try {
      await quickWhatsAppContact('Website Visitor', service.name);
    } catch (error) {
      console.error('Quick inquiry error:', error);
    }
  };

  const getPackages = (service) => {
    const basePrice = service.pricing.startingPrice;
    const maxPrice = service.pricing.maxPrice || basePrice * 2;
    
    return [
      {
        id: 'basic',
        name: 'Basic',
        price: basePrice,
        description: 'Essential features to get you started',
        features: service.features.slice(0, 3),
        deliveryTime: service.deliveryTime.max,
        popular: false
      },
      {
        id: 'professional',
        name: 'Professional',
        price: Math.round(basePrice * 1.5),
        description: 'Advanced features for growing businesses',
        features: service.features.slice(0, 5),
        deliveryTime: Math.round(service.deliveryTime.max * 0.8),
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: maxPrice,
        description: 'Complete solution with premium support',
        features: service.features,
        deliveryTime: service.deliveryTime.min,
        popular: false
      }
    ];
  };

  const relatedServices = services.filter(s => 
    s._id !== id && s.category === service?.category
  ).slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <FaSpinner className="animate-spin text-primary-600 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/services"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <FaArrowLeft />
            <span>Back to Services</span>
          </Link>
        </div>
      </div>
    );
  }

  const packages = getPackages(service);

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section ref={headerRef} className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-primary-100 mb-6">
              <Link to="/" className="hover:text-white transition-colors duration-200">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white transition-colors duration-200">Services</Link>
              <span>/</span>
              <span className="text-white">{service.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-5xl">{service.icon}</span>
                  <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                  {service.name}
                </h1>
                
                <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                    <FaDollarSign />
                    <span>From KSH {service.pricing.startingPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                    <FaClock />
                    <span>{formatDeliveryTime(service)}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                    <FaUsers />
                    <span>Expert Team</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleQuickInquiry}
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaWhatsapp />
                    <span>Get Quote</span>
                  </button>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaEnvelope />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-6">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-primary-100">Starting Price:</span>
                      <span className="font-semibold">KSH {service.pricing.startingPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span className="text-primary-100">Delivery Time:</span>
                      <span className="font-semibold">{formatDeliveryTime(service)}</span>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span className="text-primary-100">Category:</span>
                      <span className="font-semibold">{service.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span className="text-primary-100">Support:</span>
                      <span className="font-semibold">24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section ref={detailsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={detailsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">
                  What's Included
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={detailsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies */}
                {service.technologies && service.technologies.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      Technologies We Use
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {service.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Our Process
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { icon: FaUsers, title: 'Consultation', description: 'We understand your needs' },
                      { icon: FaLightbulb, title: 'Planning', description: 'Create detailed project plan' },
                      { icon: FaRocket, title: 'Development', description: 'Build your solution' },
                      { icon: FaShieldAlt, title: 'Delivery', description: 'Deploy and support' }
                    ].map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <step.icon className="text-primary-600 text-xl" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={detailsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="sticky top-32 space-y-6"
              >
                {/* Contact Card */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Need More Information?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get in touch with our experts for a detailed consultation.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={handleQuickInquiry}
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp Us</span>
                    </button>
                    <a
                      href="tel:+254713159136"
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <FaPhone />
                      <span>Call Now</span>
                    </a>
                    <Link
                      to="/contact"
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <FaEnvelope />
                      <span>Send Email</span>
                    </Link>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FaShieldAlt className="text-green-500 text-xl" />
                    <h3 className="text-lg font-semibold text-green-800">Our Guarantee</h3>
                  </div>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" size={12} />
                      <span>100% satisfaction guarantee</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" size={12} />
                      <span>Free revisions included</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" size={12} />
                      <span>24/7 support after delivery</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" size={12} />
                      <span>Money-back guarantee</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section ref={pricingRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the package that best fits your needs and budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-primary-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      KSH {pkg.price.toLocaleString()}
                    </div>
                    <p className="text-gray-500 text-sm">One-time payment</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <FaClock />
                      <span>Delivery: {pkg.deliveryTime} {service.deliveryTime.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleQuickInquiry}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                      pkg.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Related Services
              </h2>
              <p className="text-xl text-gray-600">
                Other services you might be interested in
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => (
                <motion.div
                  key={relatedService._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4">{relatedService.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {relatedService.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedService.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-semibold">
                        From KSH {relatedService.pricing.startingPrice.toLocaleString()}
                      </span>
                      <Link
                        to={`/services/${relatedService._id}`}
                        className="text-primary-600 hover:text-primary-700 transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>Learn More</span>
                        <FaArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Let's discuss your {service.name.toLowerCase()} requirements and create a solution that fits your needs perfectly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleQuickInquiry}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FaWhatsapp />
                <span>Start Project</span>
              </button>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <FaEnvelope />
                <span>Get Detailed Quote</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
