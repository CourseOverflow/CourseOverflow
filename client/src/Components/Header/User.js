import React from "react";
import styles from "./User.module.css";

const User = (props) => {
  return (
    <button className={styles.container}>
      <img
        src="images/logo.png"
        alt="User Profile"
        className={styles["profile-image"]}
      />
      <span className={styles.username}>{props.username}</span>
    </button>
  );
};

export default User;
