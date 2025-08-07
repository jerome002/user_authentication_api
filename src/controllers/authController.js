const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Joi validation schema for registration
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Joi validation schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Register a new user
const registerUser = async (req, res) => {
  // Validate input using Joi
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Respond to client
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login existing user
const loginUser = async (req, res) => {
  // Validate input using Joi
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Export controller functions
module.exports = {
  registerUser,
  loginUser
};
