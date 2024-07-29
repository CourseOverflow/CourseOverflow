import React from "react";
import styles from "./User.module.css";
import Dropdown from "./Dropdown";
import { getUserDetails } from "../../Config/apiConfig";

const User = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const userData = getUserDetails();

  const isAuthenticated = userData.isAuthenticated;

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
            {`${userData.first_name}` || "Guest"}
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
  return <>{isAuthenticated ? <LoggedInUser /> : <GuestUser />}</>;
};

export default User;
