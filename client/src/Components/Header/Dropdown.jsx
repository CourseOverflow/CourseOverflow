import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaMoon,
  FaSun,
  FaPlus,
} from "react-icons/fa";

const Dropdown = ({
  props,
  toggleDropdown,
  isAuthenticated,
  logout,
  userremove,
}) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [isDark, setIsDark] = useState(false);
  const toggleDarkMode = () => {
    console.log("toggle dark mode");
    setIsDark(!isDark);
  };

  const handleLogout = () => {
    logout();
  };

  const GuestUser = () => {
    return (
      <>
        <div className={styles.dropdown}>
          <div className={styles.profile}>
            <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="Guest" />
            <h1>Guest</h1>
            <p>email@gmail.com</p>
          </div>
          <div className={styles.links}>
            <Link to={"/signup"} className={styles.button}>
              <FaPlus />
            </Link>
            <Link to={"/login"} className={styles.button}>
              <FaSignInAlt />
            </Link>
            <button onClick={toggleDarkMode} className={styles.button}>
              {isDark ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
        <div onClick={toggleDropdown} className={styles.overlay} />
      </>
    );
  };

  const LoggedInUser = () => {
    return (
      <>
        <div className={styles.dropdown}>
          <div className={styles.profile}>
            <img src={`${user.profilePicture}`} alt="display" />
            <h1>{`${user.username}`}</h1>
            <p>{`${user.email}`}</p>
          </div>
          <div className={styles.links}>
            <Link to={"/dashboard"} className={styles.button}>
              <FaUser />
            </Link>
            <button onClick={handleLogout} className={styles.button}>
              <FaSignOutAlt />
            </button>
            <button onClick={toggleDarkMode} className={styles.button}>
              {isDark ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
        <div onClick={toggleDropdown} className={styles.overlay} />
      </>
    );
  };
  return <>{isAuthenticated && user ? <LoggedInUser /> : <GuestUser />}</>;
};

export default Dropdown;
