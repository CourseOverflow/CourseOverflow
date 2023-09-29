import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the eye icons from react-icons
import styles from "./Auth.module.css";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Sign up</h1>
      <hr className={styles.authLoader} />
      <form action="/" method="post">
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
            required
            className={styles.authInput}
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
            {showPassword ? "Hide" : "Show"} {/* Use the eye icons */}
          </button>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="psw"
              required
              className={styles.authInput}
            />
          </div>
          <label className={styles.rememberBtn}>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>
          <span className={styles.authPsw}>
            <a href="#">Forgot password?</a>
          </span>
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
              src="/images/google-logo.png"
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

export default Auth;
