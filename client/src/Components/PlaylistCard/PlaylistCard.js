import React from "react";
import styles from "./PlayListCard.module.css";
const PlayListCard = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.thumbnail} alt={props.topic} />
      <h1>{props.title}</h1>
      <p>{props.duration}</p>
      <p>{props.desc}</p>
    </div>
  );
};

export default PlayListCard;
