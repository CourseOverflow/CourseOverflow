import React, { useState } from "react";
import styles from "./Description.module.css";
import Modal from "./Modal";

const Description = (props) => {
  const descriptionText = props.desc;

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={styles.description}>
      <h1>Description</h1>
      <p>{descriptionText}</p>
      <button onClick={() => setShowFullDescription(true)}>Read More</button>

      {showFullDescription && (
        <Modal
          onClose={() => setShowFullDescription(false)}
          descriptionText={descriptionText}
        />
      )}
    </div>
  );
};

export default Description;
