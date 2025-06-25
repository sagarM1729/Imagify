import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields", 
        required: ["name", "email", "password"] 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters long" 
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    res.status(201).json({ 
      success: true,
      message: "User registered successfully", 
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        credits: newUser.creditBalance || 5
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error registering user", 
      error: error.message 
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields", 
        required: ["email", "password"] 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    res.status(200).json({ 
      success: true,
      message: "Login successful", 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.creditBalance || 5
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error logging in", 
      error: error.message 
    });
  }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  console.log('🔍 Debug - Headers received:', req.headers.authorization);
  
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  console.log('🔍 Debug - Extracted token:', token ? 'Token found' : 'No token');

  if (!token) {
    console.log('❌ Debug - No token provided');
    return res.status(401).json({ 
      success: false,
      message: "Access denied. No token provided." 
    });
  }

  try {
    console.log('🔍 Debug - JWT_SECRET exists:', !!process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Debug - Token verified successfully, user ID:', decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('❌ Debug - Token verification failed:', error.message);
    res.status(401).json({ 
      success: false,
      message: "Invalid token.",
      debug: error.message // Temporary debug info
    });
  }
};

// Get user credits
const getUserCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "User credits retrieved successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.creditBalance || 5
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error retrieving user credits", 
      error: error.message 
    });
  }
};

export { registerUser, loginUser, getUserCredits, verifyToken };
