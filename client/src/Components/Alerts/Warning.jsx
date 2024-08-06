import React from "react";
import styles from "./Alert.module.css";
import { IoIosWarning } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Warning = ({ message, onClose }) => {
  return (
    <div className={`${styles.alert}`}>
      <IoIosWarning className={`${styles.icon} ${styles.warning}`} />
      <span className={`${styles.text} ${styles.warning}`}>Warning</span>
      <span className={styles.text}>{message}</span>
      <button
        className={`${styles.closeButton} ${styles.warning}`}
        onClick={onClose}
      >
        <RxCross2 className={styles.closeIcon} />
      </button>
    </div>
  );
};

export default Warning;
