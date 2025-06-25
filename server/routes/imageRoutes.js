import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import { verifyToken } from '../controllers/userController.js';

const router = express.Router();

console.log('📸 Image routes loaded successfully!');

// Simple test endpoint (no auth required)
router.get('/ping', (req, res) => {
  res.json({
    success: true,
    message: 'Image routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint to debug authentication
router.get('/test-auth', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Authentication successful!',
    user: req.user
  });
});

// Generate image endpoint - protected route
router.post('/generate', verifyToken, generateImage);

// Future image-related endpoints can be added here:
// router.get('/history', verifyToken, getImageHistory);
// router.delete('/:imageId', verifyToken, deleteImage);
// router.get('/:imageId', verifyToken, getImageById);

export default router;
