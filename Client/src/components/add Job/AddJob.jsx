import React, { useState } from 'react'
import styles from './AddJob.module.css'
import JobImg from '../../assets/job.png'
import { DEFAULT_SKILLS } from '../../utils/constant'
import { useLocation, useNavigate } from "react-router-dom";
import { createJobPost, updateJobPostById } from '../../apis/job';

const AddJob = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [stateData] = useState(state?.jobDetails);
  const [formData, setFormData] = useState({
      companyName: "" || stateData?.companyName,
      logoUrl: "" || stateData?.logoUrl,
      title: "" || stateData?.title,
      description: "" || stateData?.description,
      salary: "" || stateData?.salary,
      location: "" || stateData?.location,
      duration: "" || stateData?.duration,
      locationType: "" || stateData?.locationType,
      skills: stateData?.skills || [],
      information: "" || stateData?.information,
      jobType: "" || stateData?.jobType,
      aboutCompany: "" || stateData?.aboutCompany,
  });

  const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!formData.companyName || !formData.title || !formData.logoUrl || !formData.description || !formData.salary || !formData.location ||
      !formData.duration || !formData.locationType || !formData.skills
      ){
      alert("Please fill all the field")
    }
      if (state?.edit) {
          await updateJobPostById(stateData._id, formData);
          return;
      }
      const result = await createJobPost(formData);
      if(formData.companyName && formData.title && formData.logoUrl && formData.description && formData.salary && formData.location &&
        formData.duration && formData.locationType && formData.skills){
        navigate('/')
      }
  };

  const addSkills = (event) => {
    const skill = event.target.value;
    const actualSkillList = formData.skills;
    const filteredSkills = actualSkillList.filter(
        (element) => element == skill
    );
    if (!filteredSkills.length) {
        setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
};

const removeSkill = (skill) => {
  const originalSkills = formData.skills;
  const filteredSkills = originalSkills.filter(
      (element) => element !== skill
  );
  setFormData({ ...formData, skills: filteredSkills });
};
  
  return (
    <div className={styles.addJob}>
    <div className={styles.leftSection}>
      <div className={styles.title}>Add Job Description</div>
      <form className={styles.jobform} method="post">
        <span>Company Name</span><input type="text" required name="companyName" placeholder='Enter your company name' onChange={handleChange}  className={styles.first}/><br />
        
        <span>Add Logo  Url</span><input type="text" name="logoUrl" placeholder='Enter the link' onChange={handleChange} className={styles.second}/><br />
       
        <span>Job Position</span><input type="text" name="title" placeholder='Enter job position' onChange={handleChange} className={styles.third}/><br />
        
        <span>Monthly Salary</span><input type="text" name="salary" placeholder='Enter Amount in rupees' onChange={handleChange} className={styles.fourth}/><br />
        
        <span>Job Type</span><select
                        className={styles.fifth}
                        name="duration"
                        onChange={handleChange}
                    >
                         <option disabled selected value="Select job type">Select job type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                    </select><br />
        
        <span>Remote/office</span> <select
                        className={styles.sixth}
                        name="locationType"
                        onChange={handleChange}
                    >
                        <option disabled selected value="">Select location type</option>
                        <option value="Remote">Remote</option>
                        <option value="Office">Office</option>
                    </select>
          <br />
        
        <span>Location</span><input type="text" name="location" placeholder='Enter Location' onChange={handleChange} className={styles.seventh}/><br />
        
        <span style={{position: "relative", top: "-8vh"}}>Job Description</span><textarea type="text" name="description" placeholder='Type the job description' onChange={handleChange} className={styles.eighth} /><br />
        
        <span style={{position: "relative", top: "-8vh"}}>About Company</span><textarea type="text" name="aboutCompany" placeholder='Type about your company' onChange={handleChange} className={styles.ninth}/><br />
        
        <span>Skills Required</span><select name="skills" onChange={addSkills} className={styles.tenth}>
          <option selected disabled >Please select the skills</option>
          {DEFAULT_SKILLS.map((element)=><option key={element}>{element}</option>)}
          </select><br />
          <div className={styles.setSkills}>{formData?.skills?.map((element) => (
                        <div className={styles.indSkills}>
                            {element}&nbsp;
                            <button onClick={() => removeSkill(element)}>
                                X
                            </button>
                        </div>
                    ))}
                </div> <br />
        
        <span>Information</span><input type="text" name="information" placeholder='Enter the additional information' onChange={handleChange} className={styles.eleventh}/><br />
        
        <button className={styles.add} onClick={handleSubmit}>{state?.edit ? "Edit Job" : "+ Add Job "}</button>
      </form>
    </div>
    <div className={styles.rightSection}>
      <img src={JobImg} alt="Job Image" />
    </div>
    </div>
  )
}

export default AddJob