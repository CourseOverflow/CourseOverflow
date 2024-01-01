import React from "react";
import styles from "./Section2.module.css";
import Features from "../../../Components/Features/Features";
const Section2 = () => {
  return (
    <div>
      <div className={`${styles.glow}`}></div>
      <p className={`${styles.title}`}>
        What all features CourseOverflow offers{" "}
      </p>
      <Features />
    </div>
  );
};

export default Section2;
