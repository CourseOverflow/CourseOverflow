import React from "react";
import styles from "./CourseOverflow.module.css";
import { FaBars } from "react-icons/fa";

const CourseOverflow = (props) => {
  return (
    <>
      <div className={styles.container}>
        <FaBars onClick={props.toggleSidebar} />
        <a href="/" className={styles.link}>
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            className={styles.logo}
          />
          <span className={styles.text}>CourseOverflow</span>
        </a>
      </div>
    </>
  );
};

export default CourseOverflow;
