import React from "react";
import styles from "./Step1.module.css";
import ImageUpload from "../FormComponents/ImageUpload";
import InputForm from "../FormComponents/InputForm";

const Step1 = () => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles["column50"]}>
        <InputForm />
      </div>
      <div className={styles["column50"]}>
        <ImageUpload />
      </div>
    </div>
  );
};

export default Step1;
