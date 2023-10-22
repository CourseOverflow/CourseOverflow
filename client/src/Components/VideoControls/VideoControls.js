import React from "react";
import styles from "./VideoControls.module.css";
import { FaThumbsUp, FaThumbsDown, FaArrowRight } from "react-icons/fa";
import Description from "./Description";

const VideoControls = (props) => {
  const handleNextClick = () => {
    const nextIndex = props.currentlyPlayingVideoIndex + 1;
    if (nextIndex < props.playlistSize) {
      props.setVideoIndex(nextIndex);
    }
  };
  return (
    <>
      <div className={styles["video-controls"]}>
        <div className={styles.likesDislikes}>
          <FaThumbsUp className={styles.icon} />
          <p>{props.likes}</p>
          <FaThumbsDown className={styles.icon} />
          <p>{props.dislikes}</p>
        </div>
        <div className={styles.next} onClick={handleNextClick}>
          <p>Next</p>
          <FaArrowRight className={styles.icon} />
        </div>
      </div>
      <Description desc={props.desc} />
    </>
  );
};

export default VideoControls;
