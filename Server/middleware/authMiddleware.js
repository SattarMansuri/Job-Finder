const jwt = require('jsonwebtoken')

const verifyToken =(req, res, next)=>{
  try{
const reqHeader = req.header("Authorization")
const token = reqHeader
if(!token){
  return res.status(401).json({message: "Invalid Token"})
}
const decode = jwt.verify(token, process.env.SECRET_KEY)
req.user = decode.userId
next()
  }catch(err){
    console.log(err)
  }
}
module.exports = verifyToken