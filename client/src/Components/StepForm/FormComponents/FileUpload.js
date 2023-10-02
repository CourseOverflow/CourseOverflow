import React, { useState, useRef } from "react";
import styles from "./FileUpload.module.css";
// import { FaFileUpload } from "react-icons/fa";

const FileUpload = () => {
  const [fileName, setFileName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setShowForm(true);
    }
  };

  return (
    <>
      <div className={styles["card"]}>
        <h3 className={styles["headTitle"]}>Upload Files</h3>
        <div className={styles["drop_box"]}>
          <header>
            <h4>Select File here</h4>
          </header>
          <p>Files Supported: PDF, TEXT, DOC, DOCX</p>
          <input
            type="file"
            hidden
            accept=".doc,.docx,.pdf"
            id={styles["fileID"]}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
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
        </div>
      </div>
      {showForm && (
        <form action="" method="post" className={styles["form"]}>
          <h4>{fileName}</h4>
          <button className={styles["btn"]}>Upload</button>
        </form>
      )}
    </>
  );
};

export default FileUpload;
