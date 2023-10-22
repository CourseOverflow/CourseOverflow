import React from "react";
import styles from "./Playlist.module.css";

const Playlist = (props) => {
  console.log(props.height);
  return (
    <div
      style={!props.overflow ? { height: `${props.height}px` } : {}}
      className={`${styles.playlist} ${props.overflow && `${styles.overflow}`}`}
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
