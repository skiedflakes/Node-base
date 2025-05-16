const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (userId) => {
  return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};
