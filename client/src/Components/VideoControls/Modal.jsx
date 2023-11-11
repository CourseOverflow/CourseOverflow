import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ onClose, descriptionText }) => {
  const handleOverlayClick = (event) => {
    event.stopPropagation();
    onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={handleOverlayClick} />
      <div className={styles.modal}>
        <header className={styles.header}>
          <h1>Description</h1>
          <IoMdClose className={styles.close} onClick={onClose} />
        </header>
        <div className={styles.modalContent}>
          <p>{descriptionText}</p>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
