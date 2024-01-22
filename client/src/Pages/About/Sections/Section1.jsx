import React from "react";
import styles from "./Section1.module.css";
import { useNavigate } from "react-router-dom";

const Section1 = ({ scrollRef }) => {
  const navigate = useNavigate();

  const getStarted = () => {
    navigate("/signup");
  };

  const contactUs = () => {
    // Scroll to the bottom of the page with smooth scrolling
    if (scrollRef.current) {
      console.log(scrollRef.current);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.jumbo}>
        <div className={styles.heroContainer}>
          <h1 data-text="Make Your Study Playlist at ease.">
            Make Your Study Playlist at ease.
          </h1>
        </div>
        <p className={styles.heroChild}>From Students for Students</p>
        <div className={styles.btnGrp}>
          <button onClick={getStarted} className={styles.mirrorGlowBtn}>
            Get Started
          </button>
          <button onClick={contactUs} className={styles.mirrorGlowBtn}>
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section1;
