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

exports.getTaxpayer = async (req,res) => {
 const user = req.user 
 const data = await SSO.taxpayerGetBusiness(user.taxpayerId)
  
  res.send(data)
}


