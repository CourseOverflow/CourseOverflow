import React from "react";
import styles from "./Alert.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Success = ({ message, onClose }) => {
  return (
    <div className={`${styles.alert}`}>
      <FaCheckCircle className={`${styles.icon} ${styles.success}`} />
      <span className={`${styles.text} ${styles.success}`}>Success</span>
      <span className={styles.text}>{message}</span>
      <button
        className={`${styles.closeButton} ${styles.success}`}
        onClick={onClose}
      >
        <RxCross2 className={styles.closeIcon} />
      </button>
    </div>
  );
};

export default Success;
