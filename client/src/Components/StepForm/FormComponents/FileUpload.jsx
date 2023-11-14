import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import baseURL from "../../../Config/apiConfig";
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadToServer = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Make a POST request to the server's upload route
      await axios.post(`${baseURL}/api/playlist/upload-pdf/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Optionally, you can handle the response or perform other actions after a successful upload
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const renderFilePreview = () => {
    if (selectedFile) {
      if (selectedFile.type.includes("image")) {
        // Display image preview
        return (
          <img src={URL.createObjectURL(selectedFile)} alt="File Preview" />
        );
      } else if (selectedFile.type === "application/pdf") {
        // Display PDF preview using an iframe
        return (
          <iframe
            src={URL.createObjectURL(selectedFile)}
            title="File Preview"
            width="100%"
            height="300px"
            className="previewFrame"
          />
        );
      } else {
        // Display a message for unsupported file types
        return <p>Unsupported File Format: {selectedFile.name}</p>;
      }
    }
    return null;
  };

  return (
    <div className={styles["card"]}>
      <div className={styles["headTitle"]}>
        <span className={styles["selectedFileName"]}>
          {selectedFile ? selectedFile.name : "No file selected"}
        </span>
        {selectedFile && (
          <button
            className={styles["removeFileBtn"]}
            onClick={handleRemoveFile}
          >
            <div className={styles["removeIcon"]}>
              <IoMdClose />
            </div>
          </button>
        )}
      </div>
      <div className={styles["drop_box"]}>
        <div className={styles["filePreview"]}>{renderFilePreview()}</div>
        <div className={styles["fileActions"]}>
          {!selectedFile && (
            <>
              <h4>Select File here</h4>
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
          {selectedFile && (
            <button className={styles["btn"]} onClick={uploadToServer}>
              Upload to Server
            </button>
          )}
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.txt,image/*" // Add supported image formats here
            id={styles["fileID"]}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
