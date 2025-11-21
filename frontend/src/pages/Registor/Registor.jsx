import React, { useRef } from "react";
import styles from "./Registor.module.css";
import axios from "../../axiosConfig.js";
import { useNavigate } from "react-router-dom";

const Registor = () => {
  const navigate = useNavigate();

  const usernameDom = useRef(null);
  const firstnameDom = useRef(null);
  const lastnameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
       await axios.post("/user/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      alert("Registration successful, please login");
      navigate("/login");
    } catch (error) {
      alert("somthing went wrong")
      console.log("Error details:", error.response?.data || error.message);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username :-- </span>
          <input ref={usernameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>First Name :-- </span>
          <input ref={firstnameDom} type="text" placeholder="first name" />
        </div>
        <br />
        <div>
          <span>Last Name :-- </span>
          <input ref={lastnameDom} type="text" placeholder="last name" />
        </div>
        <br />
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
};

export default Registor;
