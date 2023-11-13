import React, { useState, useRef } from "react";
import styles from "./ImageUpload.module.css";
import { IoMdClose } from "react-icons/io";

const LoadingImg = () => {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
    >
      <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const ImageUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formKey, setFormKey] = useState(0); // New state for the form key
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormKey(formKey + 1); // Increment the form key to force a re-render
      setUploading(true);
      props.setNextStatus(false);
      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "neetqub9");
      formData.append("folder", "playlistThumbnail");
      fetch("https://api.cloudinary.com/v1_1/dsum3x8ok/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          props.setCloudinaryPublicId(data.public_id);
          props.setPlaylistThumbnail(data.secure_url);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setUploading(false);
          if (!uploading) {
            if (props.playlistTitle.length > 0) props.setNextStatus(true);
          }
        });
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
            {uploading ? (
              <span className={styles["selectedFileName"]}>Uploading...</span>
            ) : (
              <>
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
              </>
            )}
          </div>
        ) : (
          <h3 className={styles["headTitle"]}>Upload Image</h3>
        )}
        <div className={styles["drop_box"]}>
          {selectedFile ? (
            <div className={styles["img_box"]}>
              {" "}
              {uploading ? (
                <LoadingImg />
              ) : (
                <img
                  className={styles["Uplodedimg"]}
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name}
                />
              )}
            </div>
          ) : (
            <>
              <header>
                <h4>Drop Image here</h4>
              </header>
              <p>Supported Image Formats: JPG, PNG, JPEG</p>
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
