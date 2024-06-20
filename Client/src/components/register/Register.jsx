import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import HomeImg from '../../assets/login.png'
import { registrationForm } from '../../apis/auth'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  })
  const [error, setError] = useState({})
  const onChangeHandler = (e) =>{
  setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    const response = await registrationForm({...formData})
    console.log(formData)
    if(formData.email && formData.mobile && formData.name && formData.password){
      navigate('/login')
    }

    const error = {}
    if(!formData.name.length){
      error.name = "Name Required"
    }
    if(!formData.email.length){
      error.email = "Email required"
    }
    if(!formData.password.length){
      error.password = "Password required"
    }
    setError(error)
useEffect(()=>{
  console.log(error)
}, error)
  }
  return (
    <div className={styles.register}>
    <div className={styles.leftSection}>
      <h1>Create an account</h1>
      <h5>Your personal job finder is here</h5>
      <form method="post">
      {error.name? <p className={styles.error}>{error.name}</p>:<></>}
        <input type="text" name="name"  placeholder='Name' onChange={onChangeHandler}/><br />
        {error.email? <p className={styles.error}>{error.email}</p>:<></>}
        <input type="email" name="email" placeholder='Email' onChange={onChangeHandler}/><br />
        <input type="tel" name="mobile" placeholder='Mobile' onChange={onChangeHandler}/><br />
        {error.password? <p className={styles.error}>{error.password}</p>:<></>}
        <input type="password" name="password" placeholder='Password' onChange={onChangeHandler}/><br />
        <button onClick={onSubmitHandler}>Create Account</button>
      </form>
      <span>Already have an account?<b onClick={()=>navigate('/login')} style={{cursor: "pointer"}}><u>Sign in</u></b></span>
    </div>
    <div className={styles.rightSection}>
      <img src={HomeImg} alt="Home Image" />
    </div>
    </div>
  )
}

export default Register