import React, { useState } from "react";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import { reset_password } from "../../Actions/Auth";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };

  const navigate = useNavigate();

  if (requestSent) {
    navigate("/CourseOverflow"); // Navigate if authenticated
    return null; // Or return something else if needed
  }
  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Request Password Reset:</h1>
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
            Don't have an account?
            <a href="/signup"> Sign Up</a>
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

          <button type="submit" className={styles.authButton}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
// export default Login;
