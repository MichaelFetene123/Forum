import styles from './Login.module.css'
import { useRef } from 'react';
import axios from "../../axiosConfig.js"

const Login = () => {

  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please fill in all fields");
      return;
    }
    try {
       await axios.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });

      alert("Registration successful, please login");
      navigate("/Home");
    } catch (error) {
      alert("somthing went wrong");
      console.log("Error details:", error.response?.data || error.message);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>email :-- </span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>Password :-- </span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Registor</button>
      </form>
    </section>
  );
}

export default Login