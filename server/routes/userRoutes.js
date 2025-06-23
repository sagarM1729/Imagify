import { registerUser ,LoginUser, getUserCredits, verifyToken } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', verifyToken, getUserCredits);

export default router;
