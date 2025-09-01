const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// @route   GET /api/services
// @desc    Get all active services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }

    const services = await Service.find(query).sort({ category: 1, name: 1 });

    res.json({
      success: true,
      data: services,
      count: services.length
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve services'
    });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });

  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve service'
    });
  }
});

// @route   DELETE /api/services/clear
// @desc    Clear all services (for development)
// @access  Public (for development)
router.delete('/clear', async (req, res) => {
  try {
    await Service.deleteMany({});
    res.json({
      success: true,
      message: 'All services cleared successfully'
    });
  } catch (error) {
    console.error('Clear services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear services'
    });
  }
});

// @route   POST /api/services/seed
// @desc    Seed initial services data with KSH pricing
// @access  Public (for development)
router.post('/seed', async (req, res) => {
  try {
    // Clear existing services first
    await Service.deleteMany({});

    const servicesData = [
      {
        name: 'Data Analytics',
        category: 'MIS Solutions',
        description: 'Transform your raw data into actionable insights with our advanced analytics solutions. We help businesses make data-driven decisions through comprehensive analysis, reporting, and visualization.',
        features: [
          'Business Intelligence Dashboards',
          'Predictive Analytics',
          'Data Visualization',
          'Performance Metrics',
          'Custom Reports',
          'Real-time Analytics'
        ],
        pricing: {
          startingPrice: 15000,
          maxPrice: 35000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 1,
          max: 3,
          unit: 'weeks'
        },
        technologies: ['Python', 'R', 'Tableau', 'Power BI', 'SQL', 'Machine Learning'],
        icon: '📊',
        color: '#3B82F6'
      },
      {
        name: 'Cloud Solutions',
        category: 'MIS Solutions',
        description: 'Migrate to the cloud with confidence. Our cloud solutions provide scalability, security, and cost-effectiveness for your business operations.',
        features: [
          'Cloud Migration',
          'Infrastructure Setup',
          'Security Configuration',
          'Backup Solutions',
          'Performance Optimization',
          '24/7 Monitoring'
        ],
        pricing: {
          startingPrice: 12000,
          maxPrice: 28000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 1,
          max: 3,
          unit: 'weeks'
        },
        technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'],
        icon: '☁️',
        color: '#10B981'
      },
      {
        name: 'ERP Systems',
        category: 'MIS Solutions',
        description: 'Streamline your business processes with our comprehensive ERP solutions. Integrate all your business functions into one unified system.',
        features: [
          'Process Integration',
          'Inventory Management',
          'Financial Management',
          'HR Management',
          'Customer Relationship Management',
          'Supply Chain Management'
        ],
        pricing: {
          startingPrice: 45000,
          maxPrice: 120000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 3,
          max: 8,
          unit: 'weeks'
        },
        technologies: ['SAP', 'Oracle', 'Microsoft Dynamics', 'Odoo', 'Custom Development'],
        icon: '🏢',
        color: '#8B5CF6'
      },
      {
        name: 'Cybersecurity',
        category: 'MIS Solutions',
        description: 'Protect your business from cyber threats with our comprehensive security solutions. We provide assessment, implementation, and ongoing monitoring.',
        features: [
          'Security Assessment',
          'Firewall Configuration',
          'Intrusion Detection',
          'Data Encryption',
          'Security Training',
          'Compliance Management'
        ],
        pricing: {
          startingPrice: 8000,
          maxPrice: 20000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 1,
          max: 2,
          unit: 'weeks'
        },
        technologies: ['Firewall Systems', 'Antivirus', 'VPN', 'SSL/TLS', 'Penetration Testing'],
        icon: '🔒',
        color: '#EF4444'
      },
      {
        name: 'Website Development',
        category: 'Web Development',
        description: 'Create stunning, responsive websites that drive results. From simple landing pages to complex web applications.',
        features: [
          'Responsive Design',
          'SEO Optimization',
          'Content Management',
          'Performance Optimization',
          'Mobile-First Approach',
          'Cross-browser Compatibility'
        ],
        pricing: {
          startingPrice: 5000,
          maxPrice: 25000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 3,
          max: 10,
          unit: 'days'
        },
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'WordPress'],
        icon: '🌐',
        color: '#F59E0B'
      },
      {
        name: 'E-commerce Store',
        category: 'Web Development',
        description: 'Launch your online store with our comprehensive e-commerce solutions. Complete with payment integration and inventory management.',
        features: [
          'Product Catalog',
          'Shopping Cart',
          'Payment Gateway Integration',
          'Inventory Management',
          'Order Management',
          'Customer Accounts'
        ],
        pricing: {
          startingPrice: 15000,
          maxPrice: 45000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 1,
          max: 3,
          unit: 'weeks'
        },
        technologies: ['Shopify', 'WooCommerce', 'Magento', 'React', 'Node.js', 'Stripe'],
        icon: '🛒',
        color: '#06B6D4'
      },
      {
        name: 'Business Portal',
        category: 'Web Development',
        description: 'Custom business portals for internal operations, client management, and workflow automation.',
        features: [
          'User Management',
          'Role-based Access',
          'Document Management',
          'Workflow Automation',
          'Reporting Dashboard',
          'API Integration'
        ],
        pricing: {
          startingPrice: 25000,
          maxPrice: 65000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 2,
          max: 4,
          unit: 'weeks'
        },
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'REST API'],
        icon: '🏛️',
        color: '#7C3AED'
      },
      {
        name: 'Blog & Personal Brand',
        category: 'Web Development',
        description: 'Build your personal brand with a professional blog and portfolio website. Perfect for content creators and professionals.',
        features: [
          'Blog Management',
          'Portfolio Showcase',
          'Social Media Integration',
          'SEO Optimization',
          'Newsletter Integration',
          'Analytics Dashboard'
        ],
        pricing: {
          startingPrice: 3000,
          maxPrice: 12000,
          currency: 'KSH',
          billingType: 'One-time'
        },
        deliveryTime: {
          min: 3,
          max: 7,
          unit: 'days'
        },
        technologies: ['WordPress', 'Ghost', 'Gatsby', 'Next.js', 'Markdown', 'CMS'],
        icon: '✍️',
        color: '#EC4899'
      }
    ];

    const services = await Service.insertMany(servicesData);

    res.status(201).json({
      success: true,
      message: 'Services seeded successfully with KSH pricing',
      data: services,
      count: services.length
    });

  } catch (error) {
    console.error('Seed services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
