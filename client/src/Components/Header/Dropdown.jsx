import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { FaUser, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import { logoutUser } from "../../Config/apiConfig";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ toggleDropdown }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);
  const toggleDarkMode = () => {
    console.log("toggle dark mode");
    setIsDark(!isDark);
  };

  const logoutHandler = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <div className={styles.dropdown}>
        <div className={styles.profile}>
          <img src={`${user.profilePicture}`} alt="display" />
          <h1>{`${user.first_name}`}</h1>
          <p>{`${user.email}`}</p>
        </div>
        <div className={styles.links}>
          <button
            onClick={() => {
              navigate(`/u/${user.username}`);
              toggleDropdown();
            }}
            className={styles.button}
            data-tooltip="Dashboard"
          >
            <FaUser />
          </button>
          <button
            onClick={logoutHandler}
            className={styles.button}
            data-tooltip="Log out"
          >
            <FaSignOutAlt />
          </button>
          <button
            onClick={toggleDarkMode}
            className={styles.button}
            data-tooltip={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDark ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
      <div onClick={toggleDropdown} className={styles.overlay} />
    </>
  );
};

export default Dropdown;
