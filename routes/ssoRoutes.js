const express = require('express');
const router = express.Router();
const { login,getTaxpayer, getBusinessandHistory, businessHistory, TaxpayerBusiness, business } = require('../controllers/ssoController')
const {SSOLogin,SSOVerify} = require('../middleware/ssoMiddleware')

router.post('/login',SSOLogin,login)
router.post('/taxpayer-business',SSOVerify,TaxpayerBusiness)
router.post('/business-with-history',SSOVerify,getBusinessandHistory)
router.post('/business',SSOVerify,business)
router.post('/business-history',SSOVerify,businessHistory)
router.get('/taxpayer',SSOVerify,getTaxpayer)

module.exports = router