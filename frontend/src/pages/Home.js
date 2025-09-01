import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { 
  FaRocket, 
  FaShieldAlt, 
  FaClock, 
  FaUsers,
  FaChartLine,
  FaCloud,
  FaCogs,
  FaLock,
  FaGlobe,
  FaShoppingCart,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { services, quickWhatsAppContact } = useApp();
  
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { icon: FaUsers, number: '500+', label: 'Happy Clients' },
    { icon: FaCogs, number: '1000+', label: 'Projects Completed' },
    { icon: FaClock, number: '24/7', label: 'Support Available' },
    { icon: FaRocket, number: '99%', label: 'Success Rate' },
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: 'AI-Powered Tools',
      description: 'Leverage cutting-edge artificial intelligence to optimize your business processes'
    },
    {
      icon: FaClock,
      title: '24/7 Support',
      description: 'Round-the-clock technical support to ensure your systems run smoothly'
    },
    {
      icon: FaCheckCircle,
      title: 'Industry Compliance',
      description: 'Meet all regulatory requirements with our compliant solutions'
    },
    {
      icon: FaRocket,
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising on quality'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Ltd',
      role: 'CEO',
      content: 'Stopper Tech transformed our data analytics capabilities. Their MIS solutions helped us increase efficiency by 40%.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Global Enterprises',
      role: 'IT Director',
      content: 'Outstanding cloud migration services. The team was professional and delivered exactly what we needed.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      company: 'StartupHub',
      role: 'Founder',
      content: 'Their website development service exceeded our expectations. Modern, fast, and perfectly optimized.',
      rating: 5
    }
  ];

  const handleQuickStart = async (serviceName) => {
    try {
      await quickWhatsAppContact('Website Visitor', serviceName);
    } catch (error) {
      console.error('Quick start error:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Optimize Your Business with{' '}
              <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                Smart Data
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Harness cutting-edge MIS tools to drive efficiency, security, and growth. 
              Transform your business with data-driven precision.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/services"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Explore Services</span>
                <FaArrowRight />
              </Link>
              <button
                onClick={() => handleQuickStart('General Consultation')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Get Free Consultation</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-secondary-400" />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-secondary-400" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-secondary-400" />
                <span>Industry Compliant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Preview Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our MIS Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to optimize your business operations and drive growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 8).map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 border border-gray-100 hover:border-primary-200 group cursor-pointer"
                onClick={() => handleQuickStart(service.name)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-semibold">
                    From KSH {service.pricing.startingPrice.toLocaleString()}
                  </span>
                  <FaArrowRight className="text-primary-600 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              <span>View All Services</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Choose Stopper Tech?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with industry expertise to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-2xl" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 relative"
              >
                <FaQuoteLeft className="text-primary-600 text-2xl mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Let's discuss how our MIS solutions can optimize your operations and drive growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Free Consultation</span>
                <FaArrowRight />
              </Link>
              <button
                onClick={() => handleQuickStart('Project Discussion')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                WhatsApp Us Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
