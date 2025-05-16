const User = require('../models/User');
const generateToken = require('../utils/getToken');
const bcrypt = require('bcryptjs');

// Register User
exports.register = async (req, res) => {
  const { name, username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    await User.create(name, username, hashedPassword, email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {

    res.status(500).json({ message: 'Server error'});
  }
};

// Login User
exports.login = async (req, res) => {
  const { username, password } = req.body;
 
  try {
    const user = await User.findByUsername(username);
    
    if (!user) return res.status(404).json({ message: 'User not found' });
     console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
