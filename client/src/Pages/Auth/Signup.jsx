import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./Auth.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.prevnetDefault();
    //login(emiail,password)
  };

  // is the user authenticated?
  // redirect them to the dashboard

  const [showPassword, setShowPassword] = useState(false);

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
              name="psw"
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
              name="cpsw"
              required
              className={styles.authInput}
            />
          </div>
          {/* <label className={styles.rememberBtn}>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>
          <span className={styles.authPsw}>
            <a href="/">Forgot password?</a>
          </span> */}
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
            <button type="submit">Continue with Google</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
