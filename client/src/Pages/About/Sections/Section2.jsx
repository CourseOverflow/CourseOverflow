import React from "react";
import styles from "./Section2.module.css";
import Features from "../../../Components/Features/Features";
const Section2 = () => {
  return (
    <div>
      <div className={`${styles.glow}`}></div>
      <h2 className={styles.title}>Explore the Features of CourseOverflow</h2>
      <Features />
    </div>
  );
};

export default Section2;
