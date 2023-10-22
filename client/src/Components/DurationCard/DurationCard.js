import React from "react";
import styles from "./DurationCard.module.css";

const DurationCard = (props) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Image}>
        <img src={props.thumbnail} alt="thumbnail" />
      </div>
      <div className={styles.Topic}>{props.topic}</div>
    </div>
  );
};

export default DurationCard;
