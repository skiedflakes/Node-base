const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

//module.exports = (userId) => {
//  return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
//};

const getToken = (data) => {
  return jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

const verifyToken = (token) => {
  return jwt.verify(token,jwtConfig.secret)
}


module.exports=  {
  getToken,verifyToken
}