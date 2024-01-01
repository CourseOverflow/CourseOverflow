import React, { useEffect } from "react";
import styles from "./User.module.css";
import Dropdown from "./Dropdown";
import { connect } from "react-redux";

const User = ({ props, logout, isAuthenticated, user }) => {
  const [dropdown, setDropdown] = React.useState(false);
  // Log user details if available
  useEffect(() => {
    if (user) {
      console.log("User details:", user);
    }
  }, [user]);

  const toggleDropdown = () => {
    console.log("dropdown toggle: " + !dropdown);
    setDropdown(!dropdown);
  };
  const GuestUser = () => {
    return (
      <>
        <button onClick={toggleDropdown} className={`${styles.container}`}>
          <img
            title="SlimeMaster"
            src={process.env.PUBLIC_URL + "/logo192.png"}
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
            title="SlimeMaster"
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="User Profile"
            className={`${styles["profile-image"]} `}
          />
          <span title="SlimeMaster" className={styles.username}>
            SlimeMaster
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
  return <>{isAuthenticated ? <LoggedInUser /> : <GuestUser />}</>;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(User);
