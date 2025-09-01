import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Contact = () => {
  const { services, submitContactForm, contactForm } = useApp();
  const [selectedService, setSelectedService] = useState('');
  
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [infoRef, infoInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();


  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+254 713 159 136'],
      description: 'Call us anytime for immediate assistance',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['info@stoppertech.com', 'support@stoppertech.com'],
      description: 'Send us an email and we\'ll respond within 24 hours',
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      details: ['Nairobi, Kenya', 'East Africa'],
      description: 'Visit our office or we can meet at your location',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      description: '24/7 emergency support available',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    }
  ];

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data);
      reset();
      setSelectedService('');
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleWhatsAppClick = () => {
    const message = selectedService 
      ? `Hi! I'm interested in your ${selectedService} service. Can we discuss the details?`
      : 'Hi! I\'d like to know more about your services.';
    
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B254713159136&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuickCall = () => {
    window.location.href = 'tel:+254713159136';
  };

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
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Ready to transform your business? Let's discuss how our MIS solutions 
              can drive your success.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>Quick Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-large p-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { 
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      className={`input ${errors.name ? 'input-error' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      className={`input ${errors.email ? 'input-error' : ''}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[\+]?[1-9][\d]{0,15}$/,
                          message: 'Please enter a valid phone number'
                        }
                      })}
                      className={`input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="+254 XXX XXX XXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register('company')}
                      className="input"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                {/* Service & Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      {...register('service', { required: 'Please select a service' })}
                      className={`input ${errors.service ? 'input-error' : ''}`}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service._id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                      <option value="Custom Solution">Custom Solution</option>
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      {...register('budget')}
                      className="input"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under KSH 5,000">Under KSH 5,000</option>
                      <option value="KSH 5,000 - KSH 15,000">KSH 5,000 - KSH 15,000</option>
                      <option value="KSH 15,000 - KSH 30,000">KSH 15,000 - KSH 30,000</option>
                      <option value="KSH 30,000 - KSH 50,000">KSH 30,000 - KSH 50,000</option>
                      <option value="KSH 50,000 - KSH 100,000">KSH 50,000 - KSH 100,000</option>
                      <option value="Above KSH 100,000">Above KSH 100,000</option>
                      <option value="Discuss Budget">Discuss Budget</option>
                    </select>
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Urgency
                  </label>
                  <select
                    id="urgency"
                    {...register('urgency')}
                    className="input"
                  >
                    <option value="Medium">Medium - Standard timeline</option>
                    <option value="Low">Low - No rush</option>
                    <option value="High">High - Need it soon</option>
                    <option value="Urgent">Urgent - ASAP</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { 
                      required: 'Please provide project details',
                      minLength: { value: 10, message: 'Please provide more details (at least 10 characters)' }
                    })}
                    className={`input resize-none ${errors.message ? 'input-error' : ''}`}
                    placeholder="Tell us about your project requirements, goals, and any specific needs..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={contactForm.isSubmitting}
                    className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {contactForm.isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </button>
                </div>

                {/* Success Message */}
                {contactForm.isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
                  >
                    <FaCheckCircle className="text-green-500" />
                    <div>
                      <p className="text-green-800 font-medium">Message sent successfully!</p>
                      <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              ref={infoRef}
              initial={{ opacity: 0, x: 30 }}
              animate={infoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with us through any of these channels. We're here to help 
                  you transform your business with our MIS solutions.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={infoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <info.icon className={`${info.color} text-xl`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 font-medium mb-1">{detail}</p>
                        ))}
                        <p className="text-gray-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h3>
                <p className="text-primary-100 mb-6">
                  For urgent matters or quick questions, reach out to us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleQuickCall}
                    className="bg-white text-primary-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaPhone />
                    <span>Call Now</span>
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <FaClock className="text-primary-600" />
                  <span>Office Hours</span>
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-primary-600 font-medium">
                      24/7 emergency support available
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Our Location
            </h2>
            <p className="text-xl text-gray-600">
              Based in Nairobi, serving clients across East Africa and beyond
            </p>
          </motion.div>

          <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-primary-600 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nairobi, Kenya</h3>
              <p className="text-gray-600">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
