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

  if (!data.length > 0) {
    return res.status(404).send({
      message: 'Taxpayer Business not found',
      status: 404,
      success: false,
    })
  }
  
  return res.status(200).send({
        message: 'Taxpayer business found',
        status: 200,
        success:true,
        data: data
  })
}

exports.getBusinessandHistory = async (req,res) => {
  const ban = req.body.ban
  const business = await SSO.business(ban)
  const history = await SSO.getBusinessHistory(ban)

  if (!business.success && history < 0) {
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

  if (!data.success) {
    return res.send(data)
  }

  return res.send({
        message: 'Business History found',
        status: 200,
        success:true,
        data: data
  })
}

exports.getTaxpayer = async (req,res) => {
  const data = await SSO.taxpayerById(req.user.taxpayerId)
    
  return res.send({
        message: 'Taxpayer found',
        status: 200,
        success:true,
        data: data
  })
}

exports.business = async (req,res) => {
  const ban = req.body.ban
  const data = await SSO.business(ban)

  if (!data.success) {
      return res.send(data)
  }

  return res.send({
        message: 'Business found',
        status: 200,
        success:true,
        data: data
  })
  
}