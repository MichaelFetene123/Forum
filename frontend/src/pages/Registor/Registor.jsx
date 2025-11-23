import React, { useRef, useState } from "react";
import classes from "./Registor.module.css";
import axios from "../../axiosConfig.js";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";;
import VisibilityIcon from "@mui/icons-material/Visibility";

const Registor = ({ onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Please provide all required information");
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
      onToggle(); // Switch to login form instead of navigating away
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg || "Something went wrong!");
      alert("somthing went wrong");
      console.log("Error details:", error.response?.data || error.message);
    }
  };

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Join the network</h2>
      <p className={classes.text}>
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className={classes.link}
          style={{ cursor: "pointer" }}
        >
          Sign in
        </span>
      </p>
      <form onSubmit={handleSubmit} className={classes.form_container}>
        <div className={classes.input_group}>
          <input
            ref={usernameDom}
            type="text"
            placeholder="User Name"
            required
          />
        </div>

        <div className={classes.input_name_container}>
          <div className={classes.input_group}>
            <input
              ref={firstnameDom}
              type="text"
              placeholder="First Name"
              required
            />
          </div>

          <div className={classes.input_group}>
            <input
              ref={lastnameDom}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div className={classes.input_group}>
          <input ref={emailDom} type="email" placeholder="Email" required />
        </div>

        <div className={classes.input_group} style={{ position: "relative" }}>
          <input
            ref={passwordDom}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              cursor: "pointer",
              paddingTop: "8px",
            }}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        </div>
        {errorMessage && (
          <p style={{ color: "red", paddingTop: "5px" }}>{errorMessage}</p>
        )}
        <button type="submit" className={classes.btn}>
          Agree and Join
        </button>

        <p className={classes.form_footer}>
          I agree to the{" "}
          <a href="#" className={classes.links}>
            privacy policy
          </a>{" "}
          and{" "}
          <a href="#" className={classes.links}>
            terms of service
          </a>
          .
        </p>
        <p>
          <span
            onClick={onToggle}
            className={classes.link}
            style={{ cursor: "pointer" }}
          >
            Already have an account?
          </span>
        </p>
      </form>
    </section>
  );
};

export default Registor;
