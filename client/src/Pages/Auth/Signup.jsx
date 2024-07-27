import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./Auth.module.css";
import { signup } from "../../Actions/Auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Config/apiConfig";

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });
  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/o/google-oauth2/?redirect_uri=http:/localhost:3000/`,
      );

      console.log(res.data);
      window.location.replace(res.data.authorization_url);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== re_password) {
      console.log("Passwords do not match");
    } else {
      console.log("tryingggg to create and account....");
      // signup(first_name, last_name, email, password, re_password);
      try {
        const res = await api.post("/user/register/", {
          email,
          first_name,
          last_name,
          password,
        });
        console.log("Account created: ", res.data);
      } catch (err) {
        console.log(err);
      }
      setAccountCreated(true);
    }
  };

  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/CourseOverflow"); // Navigate if authenticated
    return null; // Or return something else if needed
  }
  if (accountCreated) {
    navigate("/login");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Sign up</h1>
      <hr className={styles.authLoader} />
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        action="/"
        method="post"
      >
        <div className={styles.authContainer}>
          <label htmlFor="uname">
            <b>Your Email</b>
          </label>

          <span className={styles.authPsw}>
            Already have an account?
            <a href="/login"> Log in</a>
          </span>
          <input
            type="text"
            placeholder="name@company.com"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className={styles.authInput}
            required
          />

          <label htmlFor="first_name">
            <b>First Name</b>
          </label>
          <input
            type="text"
            placeholder="John"
            name="first_name"
            value={first_name}
            onChange={(e) => onChange(e)}
            className={styles.authInput}
            required
          />
          <label htmlFor="last_name">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            placeholder="Doe"
            name="last_name"
            value={last_name}
            onChange={(e) => onChange(e)}
            className={styles.authInput}
            required
          />
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.showPasswordButton}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}{" "}
            {showPassword ? "Hide" : "Show"}
          </button>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength={6}
              required
              className={styles.authInput}
            />
          </div>
          <label htmlFor="cpsw">
            <b>Confirm Password</b>
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              minLength={6}
              required
              className={styles.authInput}
            />
          </div>

          <button type="submit" className={styles.authButton}>
            Sign up for free
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={styles.orBlock}
          >
            <hr className={styles.formLine} />
            OR
            <hr className={styles.formLine} />
          </div>

          <div className={styles.googleButton}>
            <img
              src={process.env.PUBLIC_URL + "/images/google-logo.png"}
              alt="Google Logo"
              className={styles.googleLogo}
            />
            <button onClick={continueWithGoogle}>Continue with Google</button>
          </div>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
