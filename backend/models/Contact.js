const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: [
      'Data Analytics',
      'Cloud Solutions',
      'ERP Systems',
      'Cybersecurity',
      'Website Development',
      'E-commerce Store',
      'Business Portal',
      'Blog & Personal Brand',
      'Content Creation',
      'Local Business Website',
      'Event Promotion',
      'Custom Solution',
      'General Consultation'
    ]
  },
  budget: {
    type: String,
    enum: [
      'Under KSH 5,000',
      'KSH 5,000 - KSH 15,000',
      'KSH 15,000 - KSH 30,000',
      'KSH 30,000 - KSH 50,000',
      'KSH 50,000 - KSH 100,000',
      'Above KSH 100,000',
      'Discuss Budget'
    ]
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  source: {
    type: String,
    enum: ['Website', 'WhatsApp', 'Referral', 'Social Media', 'Other'],
    default: 'Website'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Closed'],
    default: 'New'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ service: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
