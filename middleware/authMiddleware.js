const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('test',token)
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    console.log(token)
    const decoded = jwt.verify(token.replace('Bearer ', ''), jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
