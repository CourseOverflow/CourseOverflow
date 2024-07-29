import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../../Config/apiConfig";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    api
      .post("/auth/token/", {
        email,
        password,
      })
      .then((res) => {
        setAccessToken(res.data.access);
        navigate("/");
        console.log("Login success: ", res.data);
      })
      .catch((err) => {
        console.error("Login failed: ", err);
      });
  };

  const continueWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => handleLoginSuccess(tokenResponse),
    onError: (error) => handleLoginFailure(error),
  });

  const handleLoginSuccess = (response) => {
    console.log("got response", response);
    const { credential } = response;
    api
      .post("auth/google-login/", {
        tokenId: credential,
      })
      .then((res) => {
        setAccessToken(res.data.access);
        navigate("/");
        console.log("Login success: ", res.data);
      })
      .catch((err) => {
        console.error("Login failed: ", err);
      });
  };

  const handleLoginFailure = (error) => {
    console.log("got error", error);
    console.error("Login failed: ", error);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Login</h1>
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
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")}>Sign Up</button>
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
            {" "}
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
          <span className={styles.authPsw}>
            <button onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </button>
          </span>
          <button type="submit" className={styles.authButton}>
            Login
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
          <div className={styles.googleButton} onClick={continueWithGoogle}>
            <img
              src={process.env.PUBLIC_URL + "/images/google-logo.png"}
              alt="Google Logo"
              className={styles.googleLogo}
            />
            <button type="button" onClick={continueWithGoogle}>
              Continue with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
