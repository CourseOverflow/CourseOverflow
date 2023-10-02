import React, { useState, useRef } from "react";
import styles from "./Step1.module.css"; // You may need to adjust the styles import
import FileUpload from "../FormComponents/FileUpload";

const Step2 = () => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.column50}></div>
      <div className={styles["col2"]}>
        {/* Right Side */}
        <FileUpload />
      </div>
    </div>
  );
};

export default Step2;
