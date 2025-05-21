const express = require('express');
const router = express.Router();
const { login,getTaxpayer, getBusiness, businessHistory, TaxpayerBusiness } = require('../controllers/ssoController')
const {SSOLogin,SSOVerify} = require('../middleware/ssoMiddleware')

router.post('/login',SSOLogin,login)
router.post('/taxpayer-business',SSOVerify,TaxpayerBusiness)
router.post('/get-business',SSOVerify,getBusiness)
router.post('/business-history',SSOVerify,businessHistory)
router.get('/taxpayer',SSOVerify,getTaxpayer)

module.exports = router