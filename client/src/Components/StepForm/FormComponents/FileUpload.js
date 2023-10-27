import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";
import { IoMdClose } from "react-icons/io";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
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
        <h3 className={styles["headTitle"]}>Upload File</h3>
      )}
      <div className={styles["drop_box"]}>
        {selectedFile ? (
          <div className={styles["file_box"]}>
            <p>File Preview:</p>
            <span>{selectedFile.name}</span>
          </div>
        ) : (
          <>
            <header>
              <h4>Select File here</h4>
            </header>
            <p>Supported File Formats: PDF, DOC, TXT</p>
            <button
              className={styles["btn"]}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              Choose File
            </button>
          </>
        )}
        <input
          type="file"
          hidden
          accept=".pdf,.doc,.txt"
          id={styles["fileID"]}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
