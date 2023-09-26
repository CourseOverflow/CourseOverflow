import React from "react";
import styles from "./User.module.css";

const User = (props) => {
  return (
    <div className={styles.container}>
      <img
        src="https://via.placeholder.com/50"
        alt="User Profile"
        className={styles["profile-image"]}
      />
      <span className={styles.username}>{props.username}</span>
    </div>
  );
};

export default User;
