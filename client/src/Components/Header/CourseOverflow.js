import React from "react";
import styles from "./CourseOverflow.module.css";

const CourseOverflow = () => {
  return (
    <div className={styles.container}>
      <a href="/" className={styles.link}>
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Flowbite Logo"
          className={styles.logo}
        />
        <span className={styles.text}>CourseOverflow</span>
      </a>
    </div>
  );
};

export default CourseOverflow;
