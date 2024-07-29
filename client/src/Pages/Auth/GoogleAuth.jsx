import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import api, { setAccessToken } from "../../Config/apiConfig";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

const GoogleAuth = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("access")) {
    console.log("Already logged in");
    navigate("/");
  }

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
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
    console.error("Login failed: ", error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className={styles.googleButtonWrapper}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          useOneTap
          theme="filled_black"
          shape="rectangular"
          logo_alignment="center"
          width="370"
          text="continue_with"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
