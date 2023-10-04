import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";
import { IoMdClose } from "react-icons/io";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formKey, setFormKey] = useState(0); // New state for the form key
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormKey(formKey + 1); // Increment the form key to force a re-render
    }
    // Reset the value of the file input
    e.target.value = null;
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFormKey(formKey + 1); // Increment the form key to force a re-render
    // Reset the value of the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      <div className={styles["card"]}>
        {selectedFile ? (
          <div className={styles["headTitle"]}>
            <span className={styles["selectedFileName"]}>
              {selectedFile.name}
            </span>
            <button
              className={styles["removeFileBtn"]}
              onClick={handleRemoveFile}
            >
              <div className={styles["removeIcon"]}>
                <IoMdClose />
              </div>
            </button>
          </div>
        ) : (
          <h3 className={styles["headTitle"]}>Upload Image</h3>
        )}
        <div className={styles["drop_box"]}>
          {selectedFile ? (
            <div className={styles["img_box"]}>
              {" "}
              <img
                className={styles["Uplodedimg"]}
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
              />
            </div>
          ) : (
            <>
              <header>
                <h4>Select Image here</h4>
              </header>
              <p>Supported Image Formats: JPG, PNG, GIF</p>
              <button
                className={styles["btn"]}
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                Choose Image
              </button>
            </>
          )}
          <input
            type="file"
            hidden
            accept=".jpg,.jpeg,.png,.gif"
            id={styles["fileID"]}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
