import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import { login } from "../../Actions/Auth";
import { useNavigate } from "react-router-dom";
import api, { fetchAccessToken } from "../../Config/apiConfig";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();
  const hiddenGoogleLoginRef = React.useRef(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);
    try {
      const res = await api.post("/user/token/", {
        email,
        password,
      });
      Cookies.set("access_token", res.data.access, { expires: 1 }); // expires in 1 day
      Cookies.set("refresh_token", res.data.refresh, { expires: 7 }); // expires in 7 days
      console.log("Login success: ", res.data);
      console.log("Login success: ", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const continueWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => handleLoginSuccess(tokenResponse),
    onError: (error) => handleLoginFailure(error),
  });

  const handleLoginSuccess = (response) => {
    console.log("got response", response);
    const { credential } = response;
    api
      .post("user/google-login/", {
        tokenId: credential,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        setUser({
          email: response.profileObj.email,
          name: response.profileObj.name,
          imageUrl: response.profileObj.imageUrl,
        });
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) {
    navigate("/"); // Navigate if authenticated
    return null; // Or return something else if needed
  }
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
          {/* <label className={styles.rememberBtn}>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label> */}
          <span className={styles.authPsw}>
            <a href="/reset-password">Forgot password?</a>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
