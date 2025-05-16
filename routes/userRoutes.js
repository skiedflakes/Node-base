const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');
const router = express.Router();

// Get All Users (Protected Route)
router.get('/users', authMiddleware, getAllUsers);

// Test Database Connection
router.get('/test-db', async (req, res) => {
  const db = require('../config/db');
  
  try {
    const [result] = await db.execute('SELECT user_id FROM user_tbl');
    res.json({ message: 'Database connected successfully', result: result[0].test });
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(500).json({ message: 'Database connection error', error: err.message });
  }
});


module.exports = router;
