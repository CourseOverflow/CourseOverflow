import React from "react";
import styles from "./CourseOverflow.module.css";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const CourseOverflow = (props) => {
  return (
    <div className={styles.container}>
      {!props.isAboutPage ? (
        <FaBars onClick={props.toggleSidebar} className={styles.FaBars} />
      ) : (
        <></>
      )}
      <Link onClick={props.closeSidebar} className={styles.link} to={"/"}>
        <Logo />
        <span className={styles.text}>CourseOverflow</span>
      </Link>
    </div>
  );
};

export default CourseOverflow;
