import React from "react";
import styles from "./PreviewCard.module.css";

const PreviewCard = (props) => {
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
      </div>
    </div>
  );
};

export default PreviewCard;
