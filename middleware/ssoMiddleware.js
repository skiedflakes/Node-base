const { verifyToken } = require("../utils/getToken");

const isLettersAndSpaces = (text) => {
    if (!text || text.trim() === "") return false;
    return /^[A-Za-z\s]+$/.test(text)
};

exports.SSOLogin = (req,res,next) => {

  const {firstname , lastname , middlename , dateofbirth} = req.body

  let errors = []

    if (!isLettersAndSpaces(firstname)) {
      errors.push('Firstname must contain a letters') 
    }
    if (!isLettersAndSpaces(lastname)) {
      errors.push('Lastname must contain a letters')    
    }
    if (!isLettersAndSpaces(middlename)) {
      errors.push('Middlename must contain a letters')    
    }

    if (errors.length > 0) {
        return res.status(422).send({
          status:422,
          success:false,
          errors: errors,
          message: errors.join('. ')
        })
    }

    next()
}

exports.SSOVerify = (req,res,next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
  }

  const token = authHeader.slice(7); 

  try {
    const decoded = verifyToken(token);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
}

