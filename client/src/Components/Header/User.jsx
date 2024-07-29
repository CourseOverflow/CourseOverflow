import React from "react";
import styles from "./User.module.css";
import Dropdown from "./Dropdown";
import { getUserDetails } from "../../Config/apiConfig";

const User = ({ props, isAuthenticated, logout }) => {
  const [dropdown, setDropdown] = React.useState(false);
  const userData = getUserDetails();

  isAuthenticated = userData ? true : false;
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
            src={`${userData.profilePicture}`}
            alt="User Profile"
            className={`${styles["profile-image"]} `}
          />
          <span title="UserName" className={styles.username}>
            {`${userData.first_name}`}
          </span>
        </button>
        {dropdown && (
          <Dropdown
            user={userData}
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
