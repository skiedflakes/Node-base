const express = require('express');
const router = express.Router();
const { login,getTaxpayer } = require('../controllers/ssoController')
const {SSOLogin,SSOVerify} = require('../middleware/ssoMiddleware')

router.post('/login',SSOLogin,login)
router.post('/get-taxpayer',SSOVerify,getTaxpayer)

module.exports = router