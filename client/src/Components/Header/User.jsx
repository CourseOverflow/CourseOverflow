import React, { useState } from "react";
import styles from "./User.module.css";
import Dropdown from "./Dropdown";
import LoginSignUp from "./LoginSignUp";

const User = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return user ? (
    <>
      <button onClick={toggleDropdown} className={`${styles.container}`}>
        <img
          title="UserName"
          src={`${user.profilePicture}`}
          alt="User Profile"
          className={`${styles["profile-image"]} `}
        />
        <span title="UserName" className={styles.username}>
          {`${user.first_name}`}
        </span>
      </button>
      {dropdown && <Dropdown toggleDropdown={toggleDropdown} />}
    </>
  ) : (
    <LoginSignUp />
  );
};

export default User;
