import styles from './Navbar.module.css'
import Profile from '../../assets/Profile.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const name = localStorage.getItem('name')
 const navigate = useNavigate()
  const logouthandle = () =>{
    localStorage.clear()
    navigate('/register')
  }
  return (
    <div className={styles.navBar}>
      <div className={styles.title}>Jobfinder</div>
      <div className={styles.user}>
      {!name ? <div><button onClick={()=>navigate('/login')} className={styles.login}>Login</button>
        <button onClick={()=>navigate('/register')}  className={styles.register}>Register</button> </div> : <div> <p className={styles.logout}><span onClick={logouthandle} style={{cursor: "pointer"}}>Logout</span>&nbsp; &nbsp; &nbsp;<span style={{cursor: "pointer"}}>Hello! {name}</span>&nbsp; &nbsp;&nbsp; &nbsp;<img style={{cursor: "pointer"}} src={Profile} alt="Profile Picture" /></p> </div>} 
        
      </div>
    </div>
  )
}

export default Navbar