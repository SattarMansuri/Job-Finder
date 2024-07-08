const jwt = require('jsonwebtoken')
const User = require('../modals/User')
const bcrypt = require('bcrypt')

const registerUser = async (req, res)=>{
  try{
    const {name, email, mobile, password} = req.body
    if(!name ||  !email || !mobile || !password){
      res.status(400).json({message: "Bad Request"})
    }
    const isExistingUser = await User.findOne({email: email})
    if(isExistingUser){
      res.status(409).json({message: "User already exists"})
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPwd
    })
   const userResponse = await newUser.save()
    const token = jwt.sign(
      {userId: userResponse._id},
      process.env.SECRET_KEY,
      { expiresIn: "60h" }
    )
    res.json({
      message: "user registered successfully",
      token:token,
      name: userResponse.name
    })
  }catch(err){
    console.log(err)
  }
}

const loginUser = async (req, res)=>{
  try{
    const {email, password} = req.body
    if(!email || !password){
       return res.status(400).json({message: "bad request Invalid credentails"})
    }
    const userDetails = await User.findOne({email: email})
  if(!userDetails){
    return res.status(401).json({message: "User does not exists"})
  }
  const pwdMatch = await bcrypt.compare(password, userDetails.password)
  if(!pwdMatch){
    return res.status(401).json({message: "Invalid credentials"})
  }
  const token = jwt.sign(
    {userId: userDetails._id},
    process.env.SECRET_KEY,
    { expiresIn: "60h" }
  )
  res.json({
    message: "user loggedinn successfully",
    token:token,
    name: userDetails.name
  })
  }catch(err){
console.log(err)
  }
}

module.exports = {registerUser, loginUser}