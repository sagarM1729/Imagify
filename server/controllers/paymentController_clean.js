import Razorpay from 'razorpay';
import crypto from 'crypto';
import transactionModel from '../models/transactionModel.js';
import userModel from '../models/userModel.js';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Credit plans configuration
const creditPlans = {
  basic: { credits: 100, price: 1000, planId: 'basic' }, // $10 = ₹1000 (approx)
  pro: { credits: 500, price: 5000, planId: 'pro' }, // $50 = ₹5000 (approx)
  enterprise: { credits: 5000, price: 25000, planId: 'enterprise' } // $250 = ₹25000 (approx)
};

// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    console.log(`📝 Creating order for user ${userId}, plan: ${planId}`);

    // Validate plan
    if (!creditPlans[planId]) {
      return res.status(400).json({
        success: false,
        message: `Invalid plan selected: ${planId}. Available plans: ${Object.keys(creditPlans).join(', ')}`
      });
    }

    const plan = creditPlans[planId];
    const amount = plan.price * 100; // Convert to paise

    console.log(`💰 Order amount: ₹${plan.price} (${amount} paise)`);

    // Validate Razorpay credentials
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('❌ Razorpay credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Payment system not configured. Please contact support.'
      });
    }

    // Create Razorpay order with short receipt (max 40 chars)
    const timestamp = Date.now().toString().slice(-8);
    const userIdShort = userId.slice(-6);
    const receipt = `ord_${userIdShort}_${timestamp}`;
    
    console.log(`📝 Generated receipt: "${receipt}" (length: ${receipt.length})`);
    
    const orderOptions = {
      amount: amount,
      currency: 'INR',
      receipt: receipt,
      notes: {
        userId: userId,
        planId: planId,
        credits: plan.credits
      }
    };

    try {
      const order = await razorpay.orders.create(orderOptions);
      console.log(`✅ Razorpay order created: ${order.id}`);

      // Create transaction record
      const transaction = new transactionModel({
        userId: userId,
        razorpayOrderId: order.id,
        amount: plan.price,
        currency: 'INR',
        creditsAdded: plan.credits,
        receipt: order.receipt,
        description: `Purchase of ${plan.credits} credits - ${planId} plan`,
        razorpayData: {
          planId: planId,
          orderData: order
        }
      });

      await transaction.save();
      console.log(`💾 Transaction record saved for order: ${order.id}`);

      res.status(200).json({
        success: true,
        message: 'Order created successfully',
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt
        },
        planDetails: {
          planId: planId,
          credits: plan.credits,
          price: plan.price
        },
        razorpayKeyId: process.env.RAZORPAY_KEY_ID
      });

    } catch (razorpayError) {
      console.error('❌ Razorpay order creation failed:', razorpayError);
      
      if (razorpayError.error && razorpayError.error.description) {
        return res.status(400).json({
          success: false,
          message: `Payment system error: ${razorpayError.error.description}`,
          details: 'Please check your payment configuration'
        });
      }
      
      throw razorpayError;
    }

  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Verify payment and add credits
const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature
    } = req.body;

    console.log(`🔍 Verifying payment for order: ${razorpay_order_id}`);

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error('❌ Payment verification failed - Invalid signature');
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature'
      });
    }

    // Find transaction
    const transaction = await transactionModel.findOne({
      razorpayOrderId: razorpay_order_id
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Check if already processed
    if (transaction.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment already processed'
      });
    }

    // Get payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // Update transaction
    await transaction.markCompleted(razorpay_payment_id, razorpay_signature, {
      paymentData: payment
    });

    // Add credits to user
    const user = await userModel.findById(transaction.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.creditBalance += transaction.creditsAdded;
    await user.save();

    console.log(`✅ Payment verified! Added ${transaction.creditsAdded} credits to user ${user.name}`);

    res.status(200).json({
      success: true,
      message: 'Payment verified and credits added successfully',
      transaction: {
        id: transaction._id,
        creditsAdded: transaction.creditsAdded,
        amount: transaction.amount,
        status: transaction.status
      },
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.creditBalance
      }
    });

  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get available credit plans
const getCreditPlans = async (req, res) => {
  try {
    const plans = Object.entries(creditPlans).map(([key, plan]) => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      credits: plan.credits,
      price: plan.price,
      pricePerCredit: Math.round((plan.price / plan.credits) * 100) / 100,
      popular: key === 'pro'
    }));

    res.status(200).json({
      success: true,
      plans: plans
    });
  } catch (error) {
    console.error('Error fetching credit plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch credit plans'
    });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const transactions = await transactionModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-razorpayData');

    const total = await transactionModel.countDocuments({ userId });

    res.status(200).json({
      success: true,
      transactions: transactions,
      pagination: {
        total: total,
        limit: limit,
        skip: skip,
        hasMore: skip + limit < total
      }
    });

  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history'
    });
  }
};

export { createOrder, verifyPayment, getCreditPlans, getTransactionHistory };
