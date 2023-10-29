import React from "react";
import styles from "./Step1.module.css";
import ImageUpload from "../FormComponents/ImageUpload";
import InputForm from "../FormComponents/InputForm";

const Step1 = () => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.uploadContainer}>
        <ImageUpload />
      </div>
      <div className={styles.detailsContainer}>
        <InputForm />
      </div>
    </div>
  );
};

export default Step1;
