import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Razorpay transaction details
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  
  razorpayPaymentId: {
    type: String,
    default: null
  },
  
  razorpaySignature: {
    type: String,
    default: null
  },
  
  // Transaction details
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  
  currency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR', 'GBP']
  },
  
  creditsAdded: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Transaction status
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // Payment method
  paymentMethod: {
    type: String,
    enum: ['card', 'netbanking', 'wallet', 'upi', 'other'],
    default: 'other'
  },
  
  // Additional Razorpay data
  razorpayData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Transaction metadata
  description: {
    type: String,
    default: ''
  },
  
  // Receipt for tracking
  receipt: {
    type: String,
    required: true
  },
  
  // Failure details
  failureReason: {
    type: String,
    default: null
  },
  
  // Refund details
  refundId: {
    type: String,
    default: null
  },
  
  refundAmount: {
    type: Number,
    default: 0
  },
  
  refundReason: {
    type: String,
    default: null
  },
  
  // Timestamps
  initiatedAt: {
    type: Date,
    default: Date.now
  },
  
  completedAt: {
    type: Date,
    default: null
  },
  
  failedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better performance
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ razorpayOrderId: 1 });
transactionSchema.index({ razorpayPaymentId: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ receipt: 1 });

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  return `₹${this.amount.toFixed(2)}`;
});

// Instance method to mark transaction as completed
transactionSchema.methods.markCompleted = function(paymentId, signature, additionalData = {}) {
  this.status = 'completed';
  this.razorpayPaymentId = paymentId;
  this.razorpaySignature = signature;
  this.completedAt = new Date();
  this.razorpayData = { ...this.razorpayData, ...additionalData };
  return this.save();
};

// Instance method to mark transaction as failed
transactionSchema.methods.markFailed = function(reason, additionalData = {}) {
  this.status = 'failed';
  this.failureReason = reason;
  this.failedAt = new Date();
  this.razorpayData = { ...this.razorpayData, ...additionalData };
  return this.save();
};

// Instance method to process refund
transactionSchema.methods.processRefund = function(refundId, refundAmount, reason) {
  this.status = 'refunded';
  this.refundId = refundId;
  this.refundAmount = refundAmount;
  this.refundReason = reason;
  return this.save();
};

// Static method to get user transaction history
transactionSchema.statics.getUserTransactions = function(userId, limit = 10, skip = 0) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('userId', 'name email');
};

// Static method to get successful transactions for a user
transactionSchema.statics.getSuccessfulTransactions = function(userId) {
  return this.find({ 
    userId, 
    status: 'completed' 
  }).sort({ completedAt: -1 });
};

// Static method to calculate total credits purchased by user
transactionSchema.statics.getTotalCreditsPurchased = function(userId) {
  return this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), status: 'completed' } },
    { $group: { _id: null, totalCredits: { $sum: '$creditsAdded' } } }
  ]);
};

// Static method to get revenue analytics
transactionSchema.statics.getRevenueAnalytics = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        status: 'completed',
        completedAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$amount' },
        totalTransactions: { $sum: 1 },
        totalCredits: { $sum: '$creditsAdded' },
        avgTransactionValue: { $avg: '$amount' }
      }
    }
  ]);
};

// Pre-save middleware to generate receipt if not provided
transactionSchema.pre('save', function(next) {
  if (!this.receipt) {
    this.receipt = `IMAGIFY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Pre-save middleware to set description
transactionSchema.pre('save', function(next) {
  if (!this.description) {
    this.description = `Purchase of ${this.creditsAdded} credits for ₹${this.amount}`;
  }
  next();
});

const transactionModel = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default transactionModel;
