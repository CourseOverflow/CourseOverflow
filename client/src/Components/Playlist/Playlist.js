import React from "react";
import styles from "./Playlist.module.css";

const Playlist = (props) => {
  // function testClick(id) {
  //   console.log("clicked " + id);
  // }

  const handleNextClick = (id) => {
    props.setVideoIndex(id);
    // console.log("clicked " + id);
    // console.log(props.currentlyPlayingVideoIndex);
  };

  return (
    <div
      style={!props.overflow ? { height: `${props.height}px` } : {}}
      className={`${styles.playlist} ${props.overflow ? styles.overflow : ""}`}
    >
      {props.data.map((item) => {
        return (
          <div
            className={styles["playlist-item"]}
            onClick={() => handleNextClick(item.index)}
          >
            <h1>{item.topic}</h1>
            <p>{item.duration}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
