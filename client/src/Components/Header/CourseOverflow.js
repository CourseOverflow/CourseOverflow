import React from "react";
import styles from "./CourseOverflow.module.css";
import { FaBars } from "react-icons/fa";

const CourseOverflow = (props) => {
  return (
    <>
      <div className={styles.container}>
        <FaBars onClick={props.toggleSidebar} className={styles.FaBars} />
        <a href="/home" className={styles.link}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
            alt="Course Overflow Logo"
            className={styles.logo}
          />
          <span className={styles.text}>CourseOverflow</span>
        </a>
      </div>
    </>
  );
};

export default CourseOverflow;
