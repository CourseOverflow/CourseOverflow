import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../Config/apiConfig";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const reset_password = async (email) => {
    api
      .post("auth/reset-password/", { email })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
    setFormData({ email: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    reset_password(email);
  };

  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Request Password Reset</h1>
      <hr className={styles.authLoader} />
      <form onSubmit={(e) => onSubmit(e)} action="/" method="post">
        <div className={styles.authContainer}>
          <label htmlFor="uname">
            <b>Your Email</b>
          </label>
          <span className={styles.authPsw}>
            Don't have an account?
            <button
              className={styles.signUpButton}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </span>
          <input
            type="text"
            placeholder="name@gmail.com"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className={styles.authInput}
            required
          />
          <button type="submit" className={styles.authButton}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
