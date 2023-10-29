import React from "react";
import styles from "./PlaylistHeader.module.css";

const PlaylistHeader = (props) => {
  const watchedPercentage = Math.floor(
    (props.watchedCount / props.videoCount) * 100
  );
  return (
    <>
      <div className={styles.playlistHeader}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.author}>{props.author}</p>
        <div className={styles.status}>
          <p className={styles.duration}>
            {props.watchedCount} / {props.videoCount}
          </p>
          <p className={styles.duration}>{props.duration}</p>
        </div>
      </div>
      <hr
        className={styles.statusLine}
        style={{ width: `${watchedPercentage}%` }}
      />
    </>
  );
};

export default PlaylistHeader;
