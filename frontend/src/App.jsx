import React,{useEffect} from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import About from './Components/About/about';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registor from './pages/Registor/Registor';
import axios from './axiosConfig.js';
function App() {
  const token = localStorage.getItem('token');
 const navigate = useNavigate()
const checkUser = async () =>{
  try {
  const {data} = await axios.get("/user/check", {
     headers: {
        Authorization: "Bearer " + token,
     },
   });
console.log(data)
  } catch (error) {
    console.log(error.response)
    navigate("/login");
  }
}

  useEffect(() => {
    checkUser();
  }, [])
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registor" element={<Registor />} />
      </Routes>
    </div>
  );
}

export default App;
