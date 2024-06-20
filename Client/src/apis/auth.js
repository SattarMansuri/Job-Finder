import axios from 'axios'

export const registrationForm = async({name, email, mobile, password}) => {
try {
  const url = 'http://localhost:4000/api/v2/auth/register'
  const reqPayload = {name, email, mobile, password}
  const response = axios.post(url, reqPayload)
  console.log(reqPayload)
  return response.data
} catch (error) {
  console.log(error)
}
}


export const loginForm =  async (email, password) => {
  try {
      const url = 'http://localhost:4000/api/v2/auth/login'
      const response = await axios.post(url, { email, password });
      return response.data;
  } catch (error) {
      console.log(error);
      alert('Invalid Credentials')
  }
};