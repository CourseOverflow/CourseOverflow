import React from "react";
import styles from "./User.module.css";
import Dropdown from "./Dropdown";

const User = (props) => {
  const [dropdown, setDropdown] = React.useState(false);

  const toggleDropdown = () => {
    console.log("dropdown toggle: " + !dropdown);
    setDropdown(!dropdown);
  };

  return (
    <>
      <button onClick={toggleDropdown} className={`${styles.container}`}>
        <img
          title="SlimeMaster"
          src="images/logo.png"
          alt="User Profile"
          className={`${styles["profile-image"]} `}
        />
        <span title="SlimeMaster" className={styles.username}>
          {props.username}
        </span>
      </button>
      {dropdown && <Dropdown toggleDropdown={toggleDropdown} />}
    </>
  );
};

export default User;
