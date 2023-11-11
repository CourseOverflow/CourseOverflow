import React from "react";
import styles from "./PlaylistHeader.module.css";

const PlaylistHeader = (props) => {
  const watchPercentage = Math.floor(
    (props.watchCount / props.bundleSize) * 100
  );
  return (
    <>
      <div className={styles.playlistHeader}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.author}>{props.author}</p>
        <div className={styles.status}>
          <p className={styles.duration}>
            {props.watchCount} / {props.bundleSize}
          </p>
          <p className={styles.duration}>{props.duration}</p>
        </div>
      </div>
      <hr
        className={styles.statusLine}
        style={{ width: `${watchPercentage}%` }}
      />
    </>
  );
};

export default PlaylistHeader;
