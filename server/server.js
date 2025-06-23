import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import { registerUser, loginUser, getUserCredits, verifyToken } from './controllers/userController.js';

const PORT = process.env.PORT || 4000;
const app = express();


console.log('🚀 Starting Imagify Server...');
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔌 Port: ${PORT}`);

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// User routes
app.post('/api/user/register', registerUser);
app.post('/api/user/login', loginUser);
app.get('/api/user/credits', verifyToken, getUserCredits);

app.listen(PORT, () => {
  console.log('✅ Server Started Successfully!');
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log('🎯 Ready to accept requests!');
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
});


