require("dotenv").config();
const express = require('express')
const app = express()
const auth = require('./routes/auth')
const jobDetails = require('./routes/jobDetails')
const cors = require('cors')
app.use(express.json())
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use('/api/v2/auth', auth)
app.use('/api/v2/jobDetails', jobDetails)

app.listen(4000, (err)=>{
  if(err){
    console.log(err)
  }else{
  console.log("server is started")
  }
})

