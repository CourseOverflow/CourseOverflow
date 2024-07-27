import React, { useState } from "react";
import styles from "./Auth.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Config/apiConfig";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    new_password_confirm: "",
  });
  const { new_password, new_password_confirm } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const reset_password_confirm = async (
    uidb64,
    token,
    new_password,
    new_password_confirm
  ) => {
    api
      .post(`user/reset-password-confirm/${uidb64}/${token}/`, {
        new_password,
        new_password_confirm,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
    setFormData({ new_password: "", new_password_confirm: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (new_password !== new_password_confirm) {
      console.error("Passwords do not match");
      return;
    }
    reset_password_confirm(uidb64, token, new_password, new_password_confirm);
  };

  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Reset Password:</h1>
      <hr className={styles.authLoader} />
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        action="/"
        method="post"
      >
        <div className={styles.authContainer}>
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showPasswordButton}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}{" "}
            {showPassword ? "Hide" : "Show"}
          </button>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              name="new_password"
              value={new_password}
              onChange={(e) => onChange(e)}
              minLength={6}
              required
              className={styles.authInput}
            />
          </div>

          <label htmlFor="psw">
            <b>Confirm Password</b>
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showPasswordButton}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}{" "}
            {showPassword ? "Hide" : "Show"}
          </button>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              name="new_password_confirm"
              value={new_password_confirm}
              onChange={(e) => onChange(e)}
              minLength={6}
              required
              className={styles.authInput}
            />
          </div>
          <button type="submit" className={styles.authButton}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
