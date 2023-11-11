import React, { useState } from "react";
import styles from "./PreviewCard.module.css";
import Modal from "../VideoControls/Modal";

const PreviewCard = (props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.imageContainer}`}>
        <img
          className={`${styles.thumbnail}`}
          src={props.thumbnail}
          alt={props.title}
        />
        <p className={`${styles.duration}`}>{props.duration}</p>
      </div>
      <div className={styles.contents}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.description}>{props.desc}</p>
        <button
          className={styles.button}
          onClick={() => setShowFullDescription(true)}
        >
          Read More
        </button>
        {showFullDescription && (
          <Modal
            onClose={() => setShowFullDescription(false)}
            descriptionText={props.desc}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
