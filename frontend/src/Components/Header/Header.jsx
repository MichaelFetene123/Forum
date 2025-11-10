import React,{useState, useEffect} from 'react';
import {Link, useNavigate } from "react-router-dom";
import evangadilogo from '../../assets/evangadiLogo.png'

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
<div className='nav-container'>
<Link to={token ? "/" : "/login"}  className="logo">
 <img src={evangadilogo} alt="evangadi logo" />
</Link>
<nav className='nav-links'>

    <Link to={token ? "/" : "/login"} className='links'>
        Home
    </Link>

    <Link to="how-it-works" className='links'>
        How it Works
    </Link>
<button className='nav-btn btn-blue' onClick={onClickChange}>
    {token ? "Log Out" : "Sign In"}
</button>

</nav>
</div>
  </header>
  </>
  )
}

export default Header

