const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      urgency,
      source
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      urgency: urgency || 'Medium',
      source: source || 'Website',
      ipAddress,
      userAgent
    });

    // Save to database
    await contact.save();

    // Send notification email
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL || 'info@toshiservices.com',
        subject: `New Contact Form Submission - ${service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3B82F6;">New Contact Form Submission</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              <p><strong>Service:</strong> ${service}</p>
              ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
              <p><strong>Urgency:</strong> ${urgency || 'Medium'}</p>
              <p><strong>Message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
              <p><strong>Contact Details:</strong></p>
              <p>📧 Email: ${email}</p>
              <p>📱 Phone: ${phone}</p>
              <p>💬 WhatsApp: <a href="https://api.whatsapp.com/send/?phone=%2B254713159136&text=Hi, I received your inquiry about ${service}. Let's discuss your requirements.">Contact via WhatsApp</a></p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Submitted on: ${new Date().toLocaleString()}<br>
              IP Address: ${ipAddress}
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    // Generate WhatsApp URL
    const whatsappMessage = encodeURIComponent(
      `Hi! I'm ${name} from ${company || 'my company'}. I'm interested in your ${service} service. ${message.substring(0, 100)}...`
    );
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B254713159136&text=${whatsappMessage}&type=phone_number&app_absent=0`;

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: {
        contactId: contact._id,
        whatsappUrl,
        redirectToWhatsApp: true
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts (admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const service = req.query.service;

    const query = {};
    if (status) query.status = status;
    if (service) query.service = service;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status
// @access  Private
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['New', 'Contacted', 'In Progress', 'Completed', 'Closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

module.exports = router;
