import React from "react";
import styles from "./Dropdown.module.css";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

const Dropdown = (props) => {
  const [isDark, setIsDark] = React.useState(false);
  const toggleDarkMode = () => {
    console.log("toggle dark mode");
    setIsDark(!isDark);
  };

  return (
    <>
      <div className={styles.dropdown}>
        <div className={styles.profile}>
          <img src="images/logo.png" alt="SlimeMaster" />
          <h1>SlimeMaster</h1>
          <p>slimemaster@gmail.com</p>
        </div>
        <div className={styles.links}>
          <Link to={"/dashboard"} className={styles.button}>
            <FaUser />
          </Link>
          <Link to={"/login"} className={styles.button}>
            <FaSignOutAlt />
          </Link>
          <button onClick={toggleDarkMode} className={styles.button}>
            {isDark ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
      <div onClick={props.toggleDropdown} className={styles.overlay} />
    </>
  );
};

export default Dropdown;
