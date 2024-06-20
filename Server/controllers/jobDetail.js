const Job = require('../modals/Job')

const createJobPost = async(req, res)=>{
  try{
    const {companyName, title, description, logoUrl, salary, location, duration, locationType, skills, aboutCompany, information} = req.body
    if(!companyName || !title || !description || !logoUrl || !salary || !location || !duration || !locationType || !skills || !aboutCompany){
      res.status(400).json({message: "Bad Request"})
    }
    const newJob = new Job(req.body)
    await newJob.save()
    res.json({message: "Job created sucessfully"})
  }catch(err){
    console.log(err)
  }
}
const getJobDetailsById = async(req, res)=>{
  try {
    const jobId = req.params.jobId
    const singleJob = await Job.findById(jobId)
    res.status(200).json(singleJob)
  } catch (error) {
    console.log(error)
  }
}
const getAllJobs = async(req, res)=>{
  try {
    const title = req.query.title || "";
    const skills = req.query.skills
    let filter = {}
    if(skills){
    const skillsFind = skills.split(",")
    if (skillsFind) {
      const regexArray = skillsFind.map(
          (value) => new RegExp(value, "i")
      );
      filter = {
          skills: { $in: regexArray },
      };
  }
  }
    
    const allJobs = await Job.find( 
      {
     title: { $regex: title, $options: "i" },
      ...filter,
  },
  {
      title: 1,
      salary: 1,
      logoUrl: 1,
      location: 1,
      skills: 1,
      companyName: 1,
  }
);
    res.status(200).json( allJobs)
  } catch (error) {
    console.log(error)
  }
}
const UpdateJobDetailsById = async(req, res)=>{
  try {
    const jobId = req.params.jobId
    const data = req.body
    const updateJob = await Job.findByIdAndUpdate(jobId, data, {
      new:true,
      runValidators: true
    })
    res.status(200).json(updateJob)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {createJobPost, getJobDetailsById, getAllJobs, UpdateJobDetailsById}