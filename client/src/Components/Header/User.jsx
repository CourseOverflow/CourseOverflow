import React, { useEffect } from "react";
import styles from "./User.module.css";
import Dropdown from "./Dropdown";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { load_user } from "../../Actions/Auth";

const User = ({ props, isAuthenticated, logout }) => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      load_user();
    }
  }, [isAuthenticated]);

  const [dropdown, setDropdown] = React.useState(false);
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
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(User);
