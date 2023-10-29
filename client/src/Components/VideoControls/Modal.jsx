import React from "react";
import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ onClose, descriptionText }) => {
  const handleOverlayClick = (event) => {
    const classNames = event.target.className || "";
    if (typeof classNames === "string" && classNames.includes("modal")) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <header className={styles.header}>
          <h1>Description</h1>
          <IoMdClose className={styles.close} onClick={onClose} />
        </header>
        <p>{descriptionText}</p>
      </div>
    </div>
  );
};

export default Modal;
