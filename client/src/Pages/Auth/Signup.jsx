import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../../Config/apiConfig";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = () => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== re_password) {
      console.log("Passwords do not match");
      return;
    }
    api
      .post("auth/register/", {
        email,
        first_name,
        last_name,
        password,
      })
      .then((res) => {
        console.log("Signup success: ", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Signup failed: ", err);
      });
  };

  const navigate = useNavigate();

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
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>Log in</button>
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
            onClick={() => setShowPassword(!showPassword)}
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

export default Signup;
