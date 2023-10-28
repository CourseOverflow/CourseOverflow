import React from "react";
import styles from "./Dropdown.module.css";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

const Dropdown = (props) => {
  const clickHandler = () => {
    props.toggleDropdown();
    console.log("Dropdown.js clickHandler");
    <Link to={"/login"} />;
  };

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
          <button onClick={clickHandler} className={styles.button}>
            <FaUser />
            <p>Profile</p>
          </button>

          <button onClick={clickHandler} className={styles.button}>
            <FaSignOutAlt />
            <p>Log Out</p>
          </button>

          <button onClick={toggleDarkMode} className={styles.button}>
            {isDark ? (
              <>
                <FaMoon /> <p>Dark</p>
              </>
            ) : (
              <>
                <FaSun /> <p>Light</p>
              </>
            )}
          </button>
        </div>
      </div>
      <div onClick={props.toggleDropdown} className={styles.overlay} />
    </>
  );
};

export default Dropdown;
