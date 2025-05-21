const SSO = require('../models/SSO')
const {getToken,verifyToken} = require('../utils/getToken')


exports.login = async (req,res) => {
  const {firstname , lastname , middlename , dateofbirth} = req.body

  const data = await SSO.taxpayer(firstname,middlename,lastname)

  if(!data){
    return res.send({
        message: 'Taxpayer not found',
        status: 404,
        success:false,
    }) 
  }

  const token = getToken({
    taxpayerId : data.TAXPAYERID
  })

  console.log(verifyToken(token));

 return res.send({
        message: 'Taxpayer found',
        status: 200,
        success:true,
        token: token
 })

}

exports.TaxpayerBusiness = async (req,res) => {
 const user = req.user 
 const data = await SSO.taxpayerGetBusiness(user.taxpayerId)
  
  return res.send({
        message: 'Taxpayer business found',
        status: 200,
        success:true,
        data: data
  })
}

exports.getBusiness = async (req,res) => {
  const ban = req.body.ban
  const business = await SSO.business(ban)
  const history = await SSO.getBusinessHistory(ban)

  if (business.success == false && history.success == false) {
    return res.send({
        message: 'Business not found',
        status: 404,
        success:false,
    })
  }

  return res.send({
        message: 'Business found',
        status: 200,
        success:true,
        data: {
          business: business,
          history: history
        }
  })
}

exports.businessHistory = async (req,res) => {
  const ban = req.body.ban
  const data = await SSO.getBusinessHistory(ban)

  
  return res.send({
        message: 'Business History found',
        status: 200,
        success:true,
        data: data
  })
}

exports.getTaxpayer = async (req,res) => {
  const taxpayerid = req.body.taxpayerid
  const data = await SSO.taxpayerById(taxpayerid)
    
  return res.send({
        message: 'Taxpayer found',
        status: 200,
        success:true,
        data: data
  })
}