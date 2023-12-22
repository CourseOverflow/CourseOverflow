import React, { useState } from "react";
import styles from "./PreviewCard.module.css";
import Modal from "../VideoControls/Modal";
import { usePlaylistContext } from "../../Contexts/PlaylistContext";

const PreviewCard = () => {
  const { playlistData } = usePlaylistContext();
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.imageContainer}`}>
        <img
          className={`${styles.thumbnail}`}
          src={playlistData.thumbnail}
          alt={playlistData.title}
        />
        <p className={`${styles.duration}`}>{playlistData.duration}</p>
      </div>
      <div className={styles.contents}>
        <h1 className={styles.title}>{playlistData.title}</h1>
        <p className={styles.description}>{playlistData.desc}</p>
        <button
          className={styles.button}
          onClick={() => setShowFullDescription(true)}
        >
          Read More
        </button>
        {showFullDescription && (
          <Modal
            onClose={() => setShowFullDescription(false)}
            descriptionText={playlistData.desc}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
