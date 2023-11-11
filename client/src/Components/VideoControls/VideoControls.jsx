import React from "react";
import styles from "./VideoControls.module.css";
import Description from "./Description";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";

const VideoControls = (props) => {
  const handleNextClick = () => {
    const nextIndex = props.currVideoIdx + 1;
    if (nextIndex < props.bundleSize) {
      props.setVideoIndex(nextIndex);
    }
  };

  const handleBackClick = () => {
    const nextIndex = props.currVideoIdx - 1;
    if (nextIndex >= 0) {
      props.setVideoIndex(nextIndex);
    }
  };

  return (
    <>
      <div className={styles["videoHeader"]}>
        <div className={styles["videoTopic"]}>
          <h1>{props.title}</h1>
        </div>
      </div>

      <div className={styles["video-controls"]}>
        <div className="flex">
          <div className={styles.author}>
            <img
              title="SlimeMaster"
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Author Profile"
            />
            <span>
              <h1>SlimeMaster id:{props.author}</h1>
              <p>450K Subscribers</p>
            </span>
          </div>
          <div className={styles.likesDislikes}>
            <div className={`${styles["like"]} ${styles["flex"]}`}>
              <FaThumbsUp className={styles.icon} />
              <p>{props.likes}</p>
            </div>
            <div className={`${styles["dislike"]} ${styles["flex"]}`}>
              <FaThumbsDown className={styles.icon} />
              <p>{props.dislikes}</p>
            </div>
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.buttons}>
            <button
              className={`${styles["btn-hover"]} ${styles["color-5-back"]} ${styles["btn-hover-back"]}`}
              onClick={handleBackClick}
            >
              <div className={styles.nextFlex}>
                <FaAngleLeft className={styles.icon} />
                Back
              </div>
            </button>
          </div>

          <div className={styles.buttons}>
            <button
              className={`${styles["btn-hover"]} ${styles["color-5"]}`}
              onClick={handleNextClick}
            >
              <div className={styles.nextFlex}>
                Next
                <FaAngleRight className={styles.icon} />
              </div>
            </button>
          </div>
        </div>
      </div>
      <Description desc={props.desc} />
    </>
  );
};

export default VideoControls;
