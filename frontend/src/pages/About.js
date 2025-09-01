import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaRocket,
  FaEye,
  FaHeart,
  FaUsers,
  FaAward,
  FaClock,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCheckCircle,
  FaLightbulb,
  FaHandshake,
  FaShieldAlt
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const About = () => {
  const { quickWhatsAppContact } = useApp();
  
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [storyRef, storyInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const values = [
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative solutions to solve complex business challenges.',
      color: 'text-yellow-500'
    },
    {
      icon: FaShieldAlt,
      title: 'Reliability',
      description: 'Our clients trust us to deliver consistent, high-quality solutions that stand the test of time.',
      color: 'text-blue-500'
    },
    {
      icon: FaHandshake,
      title: 'Partnership',
      description: 'We build long-term relationships with our clients, becoming their trusted technology partner.',
      color: 'text-green-500'
    },
    {
      icon: FaHeart,
      title: 'Excellence',
      description: 'We are committed to exceeding expectations and delivering exceptional value in everything we do.',
      color: 'text-red-500'
    }
  ];

  const team = [
    {
      name: 'Alex Toshi',
      role: 'Founder & CEO',
      bio: 'Visionary leader with 10+ years in MIS and business transformation. Passionate about leveraging technology for business growth.',
      image: '/api/placeholder/300/300',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alex@stoppertech.com'
      }
    },
    {
      name: 'Sarah Mitchell',
      role: 'CTO',
      bio: 'Technical expert specializing in cloud solutions and data analytics. Leads our technical innovation initiatives.',
      image: '/api/placeholder/300/300',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@stoppertech.com'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in modern web technologies and enterprise solutions.',
      image: '/api/placeholder/300/300',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@stoppertech.com'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Project Manager',
      bio: 'Experienced project manager ensuring smooth delivery and client satisfaction across all projects.',
      image: '/api/placeholder/300/300',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@stoppertech.com'
      }
    }
  ];

  const stats = [
    { icon: FaUsers, number: '500+', label: 'Happy Clients', color: 'text-blue-500' },
    { icon: FaAward, number: '1000+', label: 'Projects Completed', color: 'text-green-500' },
    { icon: FaClock, number: '5+', label: 'Years Experience', color: 'text-purple-500' },
    { icon: FaGlobe, number: '15+', label: 'Countries Served', color: 'text-orange-500' }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'Started with a vision to transform businesses through smart MIS solutions'
    },
    {
      year: '2020',
      title: 'First 100 Clients',
      description: 'Reached our first major milestone of serving 100 satisfied clients'
    },
    {
      year: '2021',
      title: 'Cloud Expansion',
      description: 'Expanded our services to include comprehensive cloud solutions'
    },
    {
      year: '2022',
      title: 'International Growth',
      description: 'Extended our reach to serve clients across multiple countries'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Integrated AI-powered tools to enhance our service offerings'
    },
    {
      year: '2024',
      title: 'Market Leader',
      description: 'Established as a leading MIS solutions provider in East Africa'
    }
  ];

  const handleContactUs = async () => {
    try {
      await quickWhatsAppContact('Website Visitor', 'General Inquiry');
    } catch (error) {
      console.error('Contact error:', error);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              About Stopper Tech
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Empowering businesses with data-driven precision through cutting-edge MIS tools 
              and comprehensive technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>Founded in 2019</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <FaCheckCircle />
                <span>15+ Countries</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FaRocket className="text-primary-600 text-xl" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To empower businesses of all sizes with intelligent MIS solutions that drive efficiency, 
                enhance security, and accelerate growth. We believe that every organization deserves 
                access to cutting-edge technology that transforms their operations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Deliver innovative technology solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Provide exceptional customer service</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Foster long-term partnerships</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <FaEye className="text-secondary-600 text-xl" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To be the leading provider of MIS solutions in Africa and beyond, recognized for 
                our innovation, reliability, and commitment to client success. We envision a future 
                where every business operates with optimal efficiency through smart technology.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Market leadership in MIS solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Global expansion and recognition</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Continuous innovation and growth</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to a leading MIS solutions provider - here's how we've grown
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:space-x-8`}
                >
                  <div className="flex-1 lg:text-right lg:pr-8">
                    {index % 2 === 0 ? (
                      <div className="bg-white p-6 rounded-xl shadow-soft">
                        <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    ) : (
                      <div className="lg:hidden bg-white p-6 rounded-xl shadow-soft">
                        <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10 my-4 lg:my-0"></div>

                  <div className="flex-1 lg:text-left lg:pl-8">
                    {index % 2 !== 0 ? (
                      <div className="hidden lg:block bg-white p-6 rounded-xl shadow-soft">
                        <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    ) : (
                      <div className="lg:hidden bg-white p-6 rounded-xl shadow-soft">
                        <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors duration-200">
                  <value.icon className={`text-2xl ${value.color} group-hover:text-primary-600 transition-colors duration-200`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Team */}
      <section ref={teamRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The talented individuals behind our success, dedicated to delivering exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-soft overflow-hidden group hover:shadow-medium transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors duration-200"
                    >
                      <FaLinkedin size={14} />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors duration-200"
                    >
                      <FaTwitter size={14} />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors duration-200"
                    >
                      <FaEnvelope size={14} />
                    </a>
                  </div>
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
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join hundreds of satisfied clients who have transformed their businesses with our solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleContactUs}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started Today
              </button>
              <a
                href="tel:+254713159136"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
