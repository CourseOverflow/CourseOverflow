import React from "react";
import styles from "./Step1.module.css";
import ImageUpload from "../FormComponents/ImageUpload";
import InputForm from "../FormComponents/InputForm";

const Step1 = (props) => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.uploadContainer}>
        <ImageUpload
          playlistTitle={props.playlistTitle}
          nextStatus={props.nextStatus}
          setNextStatus={props.setNextStatus}
          playlistThumbnail={props.playlistThumbnail}
          setPlaylistThumbnail={props.setPlaylistThumbnail}
          cloudinaryPublicId={props.cloudinaryPublicId}
          setCloudinaryPublicId={props.setCloudinaryPublicId}
          selectedImage={props.selectedImage}
          setSelectedImage={props.setSelectedImage}
        />
      </div>
      <div className={styles.detailsContainer}>
        <InputForm
          playlistTitle={props.playlistTitle}
          setPlaylistTitle={props.setPlaylistTitle}
          playlistDesc={props.playlistDesc}
          setPlaylistDesc={props.setPlaylistDesc}
        />
      </div>
    </div>
  );
};

export default Step1;
