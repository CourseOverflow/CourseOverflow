import React from "react";
import styles from "./Section1.module.css";
import Markdown from "..//Markdown.jsx";
const Section1 = () => {
  return (
    <div className={`${styles.container}`}>
      <img
        src="https://i.imgur.com/2Z3Q1ZP.png"
        alt="CourseOverflow Logo"
        className={`${styles.logo}`}
      />
      {/* <Markdown /> */}
    </div>
  );
};

export default Section1;
