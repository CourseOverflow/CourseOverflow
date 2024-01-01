import React from "react";
import styles from "./Section1.module.css";

const Section1 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.jumbo}>
        <h1 className={styles.hero}>Make Your Study Playlist at ease.</h1>
        <p className={styles.heroChild}>From Students for Students</p>
        <div className={styles.btnGrp}>
          <button className={styles.mirrorGlowBtn}>Sign up for free</button>
          <button className={styles.mirrorGlowBtn}>Contact us</button>
        </div>
      </div>
    </div>
  );
};

export default Section1;
