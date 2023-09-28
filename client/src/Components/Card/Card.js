import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  const cardStyle = {
    backgroundImage: `url(${props.image})`,
  };

  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.cardImage}
        style={cardStyle}
      >
        <div className={styles.cardContent}>
          <h5 className={styles.title}>{props.title}</h5>
          <p className={styles.description}>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
