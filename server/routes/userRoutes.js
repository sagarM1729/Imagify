import express from 'express';
import { registerUser, loginUser, getUserCredits, verifyToken } from '../controllers/userController.js';

const router = express.Router();

// User authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected user routes
router.get('/credits', verifyToken, getUserCredits);

// Future user-related endpoints can be added here:
// router.get('/profile', verifyToken, getUserProfile);
// router.put('/profile', verifyToken, updateUserProfile);
// router.post('/change-password', verifyToken, changePassword);
// router.delete('/account', verifyToken, deleteAccount);

export default router;
