import React from "react";
import styles from "./Alert.module.css";
import { MdError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Error = ({ message, onClose }) => {
  return (
    <div className={styles.alert}>
      <MdError className={`${styles.icon} ${styles.error}`} />
      <span className={`${styles.text} ${styles.error}`}>Error</span>
      <span className={styles.text}>{message}</span>
      <button
        className={`${styles.closeButton} ${styles.error}`}
        onClick={onClose}
      >
        <RxCross2 className={styles.closeIcon} />
      </button>
    </div>
  );
};

export default Error;
