import styles from "./Login.module.css";
import { useRef, useState } from "react";
import axios from "../../axiosConfig.js";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = ({ onToggle }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    setEmailError("");
    setPasswordError("");
    setLoginError("");
    let hasError = false;
    if (!emailValue) {
      setEmailError("Email is required!");
      hasError = true;
    }
    if (!passwordValue) {
      setPasswordError("Password is required!");
      hasError = true;
    }
    if (hasError) return;

    try {
      const { data } = await axios.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem("token", data.token);
      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
      console.log("Error details:", error.response?.data || error.message);
    }
  };
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Login to your account</h2>
      <p className={classes.text}>
        {" "}
        Don't have an account?
        <span onClick={onToggle} className={classes.link}>
          {" "}
          Create a new account
        </span>
      </p>
      <div className={classes.form_container}>
        <form onSubmit={handleSubmit}>
          <div className={classes.input_group}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email"
              style={{
                border: emailError ? "1px solid #f04438" : "1px solid #ccc",
              }}
            />
            {emailError && (
              <small style={{ paddingTop: "5px", color: "red" }}>
                {emailError}
              </small>
            )}
          </div>
          <br />
          <div className={classes.input_group}>
            <input
              ref={passwordDom}
              type="password"
              placeholder="Password"
              style={{
                border: passwordError ? "1px solid #f04438" : "1px solid #ccc",
              }}
            />
            {passwordError && (
              <small style={{ paddingTop: "5px", color: "red" }}>
                {passwordError}
              </small>
            )}
          </div>
          <button type="submit" className={classes.btn}>
            Login
          </button>
          <p className={classes.form_footer}>
            <span
              onClick={onToggle}
              className={classes.link}
              style={{ cursor: "pointer" }}
            >
              Create a new account
            </span>
          </p>
        </form>
        {loginError && (
          <small style={{ paddingTop: "5px", color: "red" }}>
            {loginError}
          </small>
        )}
      </div>
    </section>
  );
};

export default Login;
