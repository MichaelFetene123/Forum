import React from 'react'
import evangadilogo from '../../assets/evangadiLogo.png'
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import './Footer.css'


const Footer = () => {
  return (
    <footer className='main-footer'>
<div className='footer-container'>
    <div className='picture'>
<div className="log">
<img src={evangadilogo} alt="Logo" />
</div>
<div className="footer-icons">
    <FaFacebook/>
    <FaInstagram/>
    <FaYoutube/>
</div>
    </div>

    {/* useful links */}
    <div className='footer-section'>
 <h3>Useful Links</h3>
          <ul>
            <li>How it Works</li>
            <li>Terms of Services</li>
            <li>Privacy Policy</li>
          </ul>
    </div>
        {/* <!-- Contact Info --> */}
         <div className='footer-section'>
 <h3>Contact Info</h3>
           <ul>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1 202-386-2702</li>
          </ul>
    </div>



</div>
    </footer>
  )
}

export default Footer