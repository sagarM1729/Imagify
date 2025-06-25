import express from 'express';
import crypto from 'crypto';
import { 
  createOrder, 
  verifyPayment, 
  getCreditPlans, 
  getTransactionHistory
} from '../controllers/paymentController.js';
import { verifyToken } from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.get('/plans', getCreditPlans);

// Protected routes
router.post('/create-order', verifyToken, createOrder);
router.post('/verify-payment', verifyToken, verifyPayment);
router.get('/history', verifyToken, getTransactionHistory);

// Webhook route for Razorpay (if needed)
router.post('/webhook', (req, res) => {
  // Handle Razorpay webhooks
  const signature = req.headers['x-razorpay-signature'];
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature === expectedSignature) {
    // Process webhook payload
    const event = req.body.event;
    const paymentEntity = req.body.payload.payment.entity;
    
    console.log('Razorpay Webhook:', event, paymentEntity);
    
    // Handle different webhook events
    switch (event) {
      case 'payment.captured':
        // Payment successful
        break;
      case 'payment.failed':
        // Payment failed
        break;
      // Add more cases as needed
    }
  }
  
  res.status(200).json({ status: 'ok' });
});

export default router;
