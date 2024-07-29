import React, { useState, useEffect } from "react";
import styles from "./Auth.module.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Config/apiConfig";

const Activate = () => {
  const { uidb64, token } = useParams();
  const [activateStatus, setActivateStatus] = useState("Activating");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`auth/activate/${uidb64}/${token}`)
      .then((res) => {
        console.log("Activation success: ", res.data);
        setActivateStatus("Verified");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Activation failed: ", err);
        setActivateStatus("Failed");
      });
  }, [navigate, uidb64, token]);

  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>{activateStatus}</h1>
      <hr className={styles.authLoader} />
      <div className={styles.authContainer}>
        {activateStatus === "Activating" ? (
          <p>Please do not close this tab</p>
        ) : (
          <p>You can safely close this tab</p>
        )}
      </div>{" "}
    </div>
  );
};

export default Activate;
