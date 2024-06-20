import React, { useEffect, useState } from 'react'
import styles from './JobDetails.module.css'
import Navbar from '../navbar/Navbar'
import {useParams, useNavigate} from 'react-router-dom'
import { PiMoneyFill } from "react-icons/pi";
import { FaCalendar } from "react-icons/fa";
import { getJobDetailsById } from '../../apis/job'


const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [jobDetails, setJobDetails] = useState(null)


  const fetchJobDeatilsById = async () =>{
    if(!id) return;
    const response = await getJobDetailsById(id)
    setJobDetails(response)
    
  }
  const clickHandle = () =>{
    navigate('/addJob', {state: {
      jobDetails: jobDetails,
      edit: true
    }})
  }
  useEffect(()=>{
    fetchJobDeatilsById()
  },[])
  return (
    <div className={styles.jobdetails}>
      <div className={styles.navBar}>
        <Navbar/>
      </div>
      <div className={styles.info}>
      {jobDetails?.title} {jobDetails?.locationType} {jobDetails?.duration} at {jobDetails?.companyName}
      </div>
      <div className={styles.jd}>
        <span style={{color: '#999999'}}>1w ago . {jobDetails?.duration}</span>
        <h1>{jobDetails?.title}</h1>
        
        <span style={{color: "#ED5353"}}>{jobDetails?.location}</span><button onClick={clickHandle} className={styles.edit}>Edit job</button><br /><br />
        <span style={{color:'#999999', fontSize: '1.2vw'}}><PiMoneyFill size={25}/> <sup>Stipend</sup> </span><br />
        <span style={{color: '#595959', fontWeight: "600"}}>{jobDetails?.salary}</span>
        <span className={styles.duration}><FaCalendar /> Duration <br /><span className={styles.months}>{jobDetails?.duration}</span></span><br /><br />
        <h2>About company</h2> <br />
        <p>{jobDetails?.aboutCompany}</p><br /><br />
        <h2>About the job/internship</h2><br /><br />
        <p>{jobDetails?.description}</p><br /><br />
<h2>Skill(s) required</h2>
<p><span className={styles.skills}>{jobDetails?.skills.map((skill)=>(
  <button>{skill}</button>
))}</span></p><br /><br />
<h2>Additional Information</h2><br /><br />
<p>{jobDetails?.information}.</p>
      </div>
    </div>
  )
}

export default JobDetails