import React from "react";
import styles from "./PlaylistCard.module.css";

const PlaylistCard = (props) => {
  return (
    <div className={styles["playlist-item"]}>
      <h1>{props.data.title}</h1>
      <p>{props.data.duration}</p>
    </div>
  );
};

export default PlaylistCard;
