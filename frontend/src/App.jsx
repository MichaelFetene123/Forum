import React,{useEffect, useState, createContext} from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import About from './Components/About/about';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registor from './pages/Registor/Registor';
import axios from './axiosConfig.js';


export const AppState = createContext();

function App() {

  const [user, setUser] = useState({});

  const token = localStorage.getItem('token');
 const navigate = useNavigate()
const checkUser = async () =>{
  try {
  const {data} = await axios.get("/user/check", {
     headers: {
        Authorization: "Bearer " + token,
     },
   });
setUser(data)
  } catch (error) {
    console.log(error.response)
    navigate("/login");
  }
}

  useEffect(() => {
    checkUser();
  }, [])
  
const logout = () =>{
  setUser({})
  localStorage.removeItem("token")
  navigate("/login");
}
  return (
    <div>
      <AppState.Provider value={{ user, setUser }}>
          <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registor />} />
        </Routes>
      </AppState.Provider>
    </div>
  );
}

export default App;
