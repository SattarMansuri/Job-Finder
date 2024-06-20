import React,{ useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import HomeImg from '../../assets/login.png'
import {loginForm} from '../../apis/auth'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData]=useState({
    email: '',
    password: ''
  })
  const changeHandler = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
    console.log(data)
  }
  const submitHandler = async (e)=>{
    e.preventDefault()
    const response = await loginForm(data.email, data.password)
    console.log(response)
    if(response?.name){
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.name)
      navigate('/')
    }
  }
  return (
  <div className={styles.login}>
 <div className={styles.leftSection}>
 <h1>Already have an account? </h1>
      <h5>Your personal job finder is here</h5>
      <div className={styles.loginForm}>
        <input type="email" name="email" placeholder='Email' onChange={changeHandler}/><br />
        <input type="password" name="password" placeholder='Password' onChange={changeHandler}/><br />
        <button onClick={submitHandler}>Sign in</button>
        </div>
      <span>Don't have an account? <b onClick={()=>navigate('/register')} style={{cursor: "pointer"}}><u>Sign Up</u></b></span>
 </div>
 <div className={styles.rightSection}>
  <img src={HomeImg} alt="" />
 </div>
  </ div>
  )
}

export default Login