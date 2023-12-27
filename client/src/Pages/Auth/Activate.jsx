import React, { useState } from "react";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import { verify } from "../../Actions/Auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Activate = ({ verify }) => {
  const { uid, token } = useParams();
  const [verified, setVerified] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    verify(uid, token);
    setVerified(true);
  };
  const navigate = useNavigate();
  if (verified) {
    navigate("/CourseOverflow");
  }
  return (
    <div className={styles["form-container"]}>
      <h1 className={styles.authHeader}>Verify Your Account:</h1>
      <hr className={styles.authLoader} />
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        action="/"
        method="post"
      >
        <div className={styles.authContainer}>
          <button type="submit" className={styles.authButton}>
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { verify })(Activate);
// export default Login;
