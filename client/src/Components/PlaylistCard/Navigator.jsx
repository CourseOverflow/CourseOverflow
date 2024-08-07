import React from "react";
import styles from "./Navigator.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Navigator = ({ nextVideo, prevVideo }) => {
  return (
    <div className={styles.container}>
      <button onClick={prevVideo} className={styles.navButton}>
        <FaChevronLeft />
      </button>
      <button onClick={nextVideo} className={styles.navButton}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Navigator;
