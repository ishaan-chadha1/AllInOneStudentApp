const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET; // Ensure you have JWT_SECRET in your environment variables

const registerUser = async (userData) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ email: userData.email });
    if (user) {
      throw new Error('User already exists');
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create a new user
    user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });

    await user.save();

    // Return the user
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // User matched, create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token
    return jwt.sign(payload, jwtSecret, { expiresIn: '5h' });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser
};
