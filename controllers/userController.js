const User = require('../models/User');

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};