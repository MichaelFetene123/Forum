import React, { useRef } from "react";
import styles from "./Registor.module.css";
import axios from "../../axiosConfig.js";

const Registor = () => {
  const usernameDom = useRef(null);
  const firstnameDom = useRef(null);
  const lastnameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameDom.current.value;
    const firstname = firstnameDom.current.value;
    const lastname = lastnameDom.current.value;
    const email = emailDom.current.value;
    const password = passwordDom.current.value;

    if(!username || !firstname || !lastname || !email || !password){
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/user/register", {
        username: usernameDom.current.value.trim(),
        firstname: firstnameDom.current.value.trim(),
        lastname: lastnameDom.current.value.trim(),
        email: emailDom.current.value.trim(),
        password: passwordDom.current.value.trim(),
      });
      console.log("Registration successful:");
    } catch (error) {
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
