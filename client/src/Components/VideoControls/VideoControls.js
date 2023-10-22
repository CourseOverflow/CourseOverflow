import React from "react";
import styles from "./VideoControls.module.css";
import { FaThumbsUp, FaThumbsDown, FaArrowRight } from "react-icons/fa";
import Description from "./Description";

const VideoControls = () => {
  return (
    <>
      <div className={styles["video-controls"]}>
        <div className={styles.likesDislikes}>
          <FaThumbsUp className={styles.icon} />
          <p>1.2K</p>
          <FaThumbsDown className={styles.icon} />
          <p>42</p>
        </div>
        <div className={styles.next}>
          <p>Next</p>
          <FaArrowRight className={styles.icon} />
        </div>
      </div>
      <Description />
    </>
  );
};

export default VideoControls;
