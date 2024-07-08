import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import ind from '../../assets/ind.png'
import { IoSearch } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import Navbar from '../navbar/Navbar'
import { getAllJobPost } from '../../apis/job'
import { DEFAULT_SKILLS } from '../../utils/constant'

const Home = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState();
 const token = localStorage.getItem('token')

  const fetchAllJobs = async () => {
      const result = await getAllJobPost({ title: title, skills: skills });
      setJobs(result);
  };
  const handleSkill = (event) => {
    const newArr = skills.filter((skill) => skill === event.target.value);
    if (!newArr.length) {
        setSkills([...skills, event.target.value]);
    }
};

const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newArr]);
};
 
 useEffect(()=>{
    fetchAllJobs()
  }, [])
  return (
    <div className={styles.home}>
    <div className={styles.navBar}><Navbar/></div>
    <div className={styles.search}>
      <input type="search" name="title" value={title} onChange={(event) => setTitle(event.target.value)}placeholder='Type any job title' />
      <IoSearch size={25} className={styles.searchlogo}/>
      <select name="" onChange={handleSkill} className={styles.skills} >
        <option disabled selected>Skills</option>
        {DEFAULT_SKILLS?.map((skill)=>(
          <option>{skill}</option>
        ))}
      </select>
      <div className={styles.skillsArr}>
      {skills?.map((skill)=>(
        <span className={styles.skill}>{skill}&nbsp;<button onClick={() =>removeSkill(skill)}>X</button></span>
        
      ))}
      </div>
      {token ? <button onClick={()=>navigate('/addJob')} className={styles.add}>+ Add Job</button> : '' }
      <button onClick={fetchAllJobs} className={styles.filter}>Apply Filter</button>
      {skills.length ? <span onClick={()=>setSkills([])} className={styles.clear}>Clear</span> : ''}
      
    </div>
    {jobs?.length ? <div className={styles.result}>
        {jobs?.map((data)=>{
          return(
          <div key={data?._id} className={styles.job}>
        <img className={styles.company} src={data?.logoUrl} alt="Logo" />
        <p className={styles.details}>
        <span style={{fontSize: "1vw"}}>{data?.title}</span><br />
      <sub><MdPeopleAlt size={17} color='#919191'/></sub> <span style={{fontSize: ".8vw", color: "#919191", fontWeight: "500"}}>11-50</span>&nbsp; &nbsp;&nbsp; &nbsp;<span style={{fontSize: ".9vw", color: "#919191", fontWeight: "500"}}>₹ {data?.salary}</span><br />
       <span style={{fontSize: ".7vw", color: "red", fontWeight: "500"}}>{data?.location} &nbsp;&nbsp;&nbsp;&nbsp; {data?.jobType}</span>
        </p>
        <p className={styles.displaySkills}>{data?.skills?.map((skill)=>(
          <span>{skill}&nbsp;</span>
        ))}</p>
        <div className={styles.flag}>
          <img src={ind} alt="Logo" /><span className={styles.location}>{data?.location}</span>
        </div>
        <button className={styles.edit} onClick={()=>{navigate('/addjob', {state:{
    jobDetails: data,
    edit:true
  }})}}>Edit Job</button>
        <button className={styles.description} onClick={() => navigate(`/jobDetails/${data._id}`)}>View details</button>
        </div>
        )
      })}
    </div>: <h1 className={styles.no}>No such Job</h1>}
    </div>
  )
}

export default Home
