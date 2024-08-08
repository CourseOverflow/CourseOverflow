import React from "react";
import styles from "./Navigator.module.css";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";

const Navigator = ({ nextVideo, prevVideo, deleteVideo }) => {
  return (
    <div className={styles.container}>
      <button onClick={prevVideo} className={styles.navButton}>
        <FaChevronLeft />
      </button>
      <button onClick={nextVideo} className={styles.navButton}>
        <FaChevronRight />
      </button>
      <button onClick={deleteVideo} className={styles.deleteButton}>
        <FaTrash />
      </button>
    </div>
  );
};

export default Navigator;
