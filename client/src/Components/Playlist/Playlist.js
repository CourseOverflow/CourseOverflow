import React from "react";
import styles from "./Playlist.module.css";

const Playlist = (props) => {
  return (
    <div
      className={`${styles.playlist} ${
        props.overflow ? "min-h-screen" : "ml-3"
      }`}
    >
      {props.data.map((item) => {
        return (
          <div className={styles["playlist-item"]}>
            <h1>{item.title}</h1>
            <p>{item.duration}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
