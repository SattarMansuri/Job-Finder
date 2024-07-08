import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from "./pages/login page/LoginPage"
import RegisterPage from "./pages/register page/RegisterPage"
import AddJobPage from "./pages/addJob Page/AddJobPage"
import HomePage from "./pages/home page/HomePage"
import JobDetailsPage from "./pages/job details page/JobDetailsPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/addJob" element={<ProtectedRoute Component={AddJobPage}/>}/>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobDetails/:id" element={<JobDetailsPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
