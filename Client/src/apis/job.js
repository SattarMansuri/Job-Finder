import axios from 'axios'
export const getJobDetailsById =  async (jobId) => {
  try {
      const url = `http://localhost:4000/api/v2/jobDetails/details/${jobId}`
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.log(error);
  }
};

export const createJobPost =  async (jobPostPayload) => {
  try {
      const url = `http://localhost:4000/api/v2/jobDetails/create`
      const token = localStorage.getItem('token')
      axios.defaults.headers.common["Authorization"] = token
      const response = await axios.post(url, jobPostPayload);
  } catch (error) {
    alert('Login to post job')
      console.log(error);
  }
};

export const updateJobPostById =  async (jobId,  updateJobPost) => {
  try {
      const url = `http://localhost:4000/api/v2/jobDetails/edit/${jobId}`
      const token = localStorage.getItem('token')
      axios.defaults.headers.common["Authorization"] = token
      const response = await axios.put(url, updateJobPost);
      return response?.data
  } catch (error) {
    alert('Login to update job')
      console.log(error);
  }
};

export const getAllJobPost =  async (filter) => {
  try {
      const url = `http://localhost:4000/api/v2/jobDetails/all-jobs?title=${filter.title || ''}&skills=${filter.skills || ''}`
      const response = await axios.get(url);
      return response?.data
  } catch (error) {
      console.log(error);
  }
};