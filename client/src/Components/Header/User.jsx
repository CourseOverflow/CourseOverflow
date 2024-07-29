import React from "react";
import styles from "./User.module.css";
import Dropdown from "./Dropdown";

const User = ({ props, isAuthenticated, logout }) => {
  const [dropdown, setDropdown] = React.useState(false);

  isAuthenticated = false;
  const user = {
    first_name: "SlimeMaster",
    profilePicture: process.env.PUBLIC_URL + "/logo.png",
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const GuestUser = () => {
    return (
      <>
        <button onClick={toggleDropdown} className={`${styles.container}`}>
          <img
            title="SlimeMaster"
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="User Profile"
            className={`${styles["profile-image"]} `}
          />
          <span title="SlimeMaster" className={styles.username}>
            Guest
          </span>
        </button>
        {dropdown && (
          <Dropdown
            toggleDropdown={toggleDropdown}
            isAuthenticated={isAuthenticated}
          />
        )}
      </>
    );
  };

  const LoggedInUser = () => {
    return (
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
        {dropdown && (
          <Dropdown
            user={user}
            toggleDropdown={toggleDropdown}
            isAuthenticated={isAuthenticated}
          />
        )}
      </>
    );
  };
  return <>{isAuthenticated && user ? <LoggedInUser /> : <GuestUser />}</>;
};

export default User;
