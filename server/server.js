import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

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

// Routes
app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(PORT, () => {
  console.log('✅ Server Started Successfully!');
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log('🎯 Ready to accept requests!');
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
});


