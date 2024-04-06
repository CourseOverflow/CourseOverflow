import React from "react";
import styles from "./Alert.module.css";
import { IoMdInformationCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Info = ({ message, onClose }) => {
  return (
    <div className={`${styles.alert}`}>
      <IoMdInformationCircle className={`${styles.icon} ${styles.info}`} />
      <span className={`${styles.text} ${styles.info}`}>Info</span>
      <span className={styles.text}>{message}</span>
      <button
        className={`${styles.closeButton} ${styles.info}`}
        onClick={onClose}
      >
        <RxCross2 className={styles.closeIcon} />
      </button>
    </div>
  );
};

export default Info;
