import React from "react";
import { FaCircle, FaCheckCircle } from "react-icons/fa";
import styles from "./CreateHeader.module.css";

const CreateHeader = ({ stepNumber }) => {
  return (
    <>
      <h1 className={styles["createHeader"]}>Create Playlist</h1>
      <hr className={styles["createDivider"]} />

      <div className={styles["top-list"]}>
        <div className={styles["step-icon"]}>
          {stepNumber > 1 ? (
            <div className={styles["stepCleared"]}>
              <FaCheckCircle />
            </div>
          ) : (
            <div className={` ${stepNumber === 1 ? styles.themeIcon : ""}`}>
              <FaCircle />
            </div>
          )}
        </div>
        <div>
          <hr className={styles["connector"]} />
        </div>
        <div className={styles["step-icon"]}>
          {stepNumber > 2 ? (
            <div className={styles["stepCleared"]}>
              <FaCheckCircle />
            </div>
          ) : (
            <div className={` ${stepNumber === 2 ? styles.themeIcon : ""}`}>
              <FaCircle />
            </div>
          )}
        </div>
        <div>
          <hr className={styles["connector"]} />
        </div>
        <div className={styles["step-icon"]}>
          {stepNumber > 3 ? (
            <div className={styles["stepCleared"]}>
              <FaCheckCircle />
            </div>
          ) : (
            <div className={` ${stepNumber === 3 ? styles["themeIcon"] : ""}`}>
              <FaCircle />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateHeader;
