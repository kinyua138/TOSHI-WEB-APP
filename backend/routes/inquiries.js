const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// @route   GET /api/inquiries/stats
// @desc    Get inquiry statistics
// @access  Public (for demo purposes)
router.get('/stats', async (req, res) => {
  try {
    const totalInquiries = await Contact.countDocuments();
    const newInquiries = await Contact.countDocuments({ status: 'New' });
    const inProgressInquiries = await Contact.countDocuments({ status: 'In Progress' });
    const completedInquiries = await Contact.countDocuments({ status: 'Completed' });

    // Service popularity
    const serviceStats = await Contact.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Monthly inquiries (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Budget distribution
    const budgetStats = await Contact.aggregate([
      {
        $match: { budget: { $exists: true, $ne: null } }
      },
      {
        $group: {
          _id: '$budget',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          total: totalInquiries,
          new: newInquiries,
          inProgress: inProgressInquiries,
          completed: completedInquiries
        },
        popularServices: serviceStats,
        monthlyTrend: monthlyStats,
        budgetDistribution: budgetStats
      }
    });

  } catch (error) {
    console.error('Get inquiry stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiry statistics'
    });
  }
});

// @route   GET /api/inquiries/recent
// @desc    Get recent inquiries
// @access  Public (for demo purposes)
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const recentInquiries = await Contact.find()
      .select('name service status createdAt urgency')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: recentInquiries
    });

  } catch (error) {
    console.error('Get recent inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve recent inquiries'
    });
  }
});

// @route   POST /api/inquiries/quick-contact
// @desc    Quick contact for WhatsApp integration
// @access  Public
router.post('/quick-contact', async (req, res) => {
  try {
    const { name, service, phone } = req.body;

    if (!name || !service) {
      return res.status(400).json({
        success: false,
        message: 'Name and service are required'
      });
    }

    // Create a simplified contact entry
    const contact = new Contact({
      name,
      email: 'whatsapp-inquiry@temp.com', // Temporary email
      phone: phone || '+254713159136',
      service,
      message: `Quick inquiry about ${service} service via WhatsApp integration`,
      source: 'WhatsApp',
      status: 'New'
    });

    await contact.save();

    // Generate WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `Hi! I'm ${name}. I'm interested in your ${service} service. Can we discuss the details and pricing?`
    );
    
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B254713159136&text=${whatsappMessage}&type=phone_number&app_absent=0`;

    res.json({
      success: true,
      message: 'Quick contact created successfully',
      data: {
        contactId: contact._id,
        whatsappUrl,
        redirectToWhatsApp: true
      }
    });

  } catch (error) {
    console.error('Quick contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create quick contact'
    });
  }
});

module.exports = router;
