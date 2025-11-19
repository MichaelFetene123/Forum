import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import About from './Components/About/about';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registor from './pages/Registor/Registor';
function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Registor' element={<Registor />} />
        <Route path='/footer' element={<Footer />} />
    </Routes>
  );
}

export default App;
