const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['MIS Solutions', 'Web Development', 'Custom Solutions']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  pricing: {
    startingPrice: {
      type: Number,
      required: [true, 'Starting price is required'],
      min: [0, 'Price cannot be negative']
    },
    maxPrice: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    billingType: {
      type: String,
      enum: ['One-time', 'Monthly', 'Yearly', 'Custom'],
      default: 'One-time'
    }
  },
  deliveryTime: {
    min: {
      type: Number,
      required: [true, 'Minimum delivery time is required']
    },
    max: {
      type: Number,
      required: [true, 'Maximum delivery time is required']
    },
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months'],
      default: 'weeks'
    }
  },
  technologies: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true,
    default: '#3B82F6'
  }
}, {
  timestamps: true
});

// Index for faster queries
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ 'pricing.startingPrice': 1 });

module.exports = mongoose.model('Service', serviceSchema);
