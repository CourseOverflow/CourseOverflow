import React, { useEffect } from "react";
import styles from "./Step1.module.css";
import ImageUpload from "../FormComponents/ImageUpload";
import InputForm from "../FormComponents/InputForm";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";

const Step1 = () => {
  const { setBackStatus, playlistData } = usePlaylistContext();
  useEffect(() => {
    setBackStatus(playlistData.title.length > 0);
    const titleInput = document.getElementById("title");
    if (titleInput) {
      titleInput.focus();
    }
  }, []);

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
