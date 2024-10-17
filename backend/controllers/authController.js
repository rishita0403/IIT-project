// controllers/authController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Assuming you have a User model

exports.signup = async (req, res) => {
  const { name, phone, password, dob } = req.body;
  
  try {
    // Check if the user with the same phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, phone, password: hashedPassword, dob });
    await user.save();

    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error during user registration:', error);  // Log actual error for debugging
    res.status(400).send('Error registering user');
  }
};


exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.send({ token, user });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
};

exports.updateUserDetails = async (req, res) => {
  const { userId } = req.params;
  const { name, phone, dob } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, dob },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.send(updatedUser);
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).send('Error updating user details');
  }
};

