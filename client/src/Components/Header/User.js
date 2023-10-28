import React from "react";
import styles from "./User.module.css";

const User = (props) => {
  return (
    <button className={`${styles.container}`}>
      <img
        title="SlimeMaster"
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="User Profile"
        className={`${styles["profile-image"]} `}
      />

      <span title="SlimeMaster" className={styles.username}>
        {props.username}
      </span>
    </button>
  );
};

export default User;
