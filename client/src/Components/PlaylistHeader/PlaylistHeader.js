import React from "react";
import styles from "./PlaylistHeader.module.css";

const PlaylistHeader = (props) => {
  return (
    <div className={styles.playlistHeader}>
      <h1>{props.title}how to get slimy</h1>
      <p>{props.author}slimemaster</p>
      <p>{props.duration}13 hrs</p>
    </div>
  );
};

export default PlaylistHeader;
