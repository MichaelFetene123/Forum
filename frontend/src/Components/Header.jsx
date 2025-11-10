import React,{useState, useEffect} from 'react';
import {Link, useNavigate } from "react-router-dom";

const Header = ({logout=()=>{}}) => {

    const [sticky, setSticky] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")


    
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 1);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
     }, []);
  
     const onClickChange = () =>{
        if(token){
            logout()
            localStorage.removeItem("token")
            navigate("/login")
        }
        if(!token){
            navigate("/")
        }
     }

     const logPage = () =>{
        navigate('/login')
     }
  return (<>
  <header className={`header ${sticky ? 'sticky' : ''}`}>
<div>
Hello Header
</div>
  </header>
  </>
  )
}

export default Header

