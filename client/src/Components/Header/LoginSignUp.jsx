import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginSignUp.module.css";
import { FaUser } from "react-icons/fa";

const LoginSignUp = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.loginSignUp}>
      <button className={styles.login} onClick={() => navigate("/login")}>
        Login
      </button>
      <button className={styles.signup} onClick={() => navigate("/signup")}>
        <FaUser className={styles.icon} />
        <p>Sign Up</p>
      </button>
    </div>
  );
};

export default LoginSignUp;
