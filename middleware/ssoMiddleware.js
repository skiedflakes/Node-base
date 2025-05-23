const { verifyToken } = require("../utils/getToken");

const isLettersAndSpaces = (text) => {
    if (!text || text.trim() === "") return false;
    return /^[A-Za-z\s]+$/.test(text)
};

exports.SSOLogin = (req,res,next) => {

  const {firstname , lastname , middlename , dateofbirth} = req.body

    if (!isLettersAndSpaces(firstname)) {
    return res.status(422).send({
        message : 'Firstname must contain a letters',
        error: 422,
        status: false
    })
    }
    if (!isLettersAndSpaces(lastname)) {
    return    res.status(422).send({
        message : 'Lastname must contain a letters',
        error: 422,
        status: false
    })
    }
    if (!isLettersAndSpaces(middlename)) {
    return   res.status(422).send({
        message : 'Middlename must contain a letters',
        error: 422,
        status: false
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

