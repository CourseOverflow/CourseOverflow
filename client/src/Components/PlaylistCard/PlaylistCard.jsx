import React from "react";
import styles from "./PlaylistCard.module.css";
import { FaBars, FaPlay } from "react-icons/fa";
import Checkbox from "./Checkbox";
import Navigator from "./Navigator";
import { formatDuration } from "../../Utils/format.js";

const PlaylistCard = (props) => {
  return (
    <div
      className={`${styles.container} ${props.isWatched && styles.played} ${
        props.currVideo && styles.currVideo
      }`}
    >
      <div
        onClick={props.playlistItem ? () => props.updateIdx(props.index) : null}
        className={styles.playlistCard}
      >
        <span className={styles.videoIdx}>
          {props.isDraggable ? (
            <FaBars />
          ) : props.currVideo ? (
            <FaPlay />
          ) : (
            props.index + 1
          )}
        </span>

        <div className={styles.imageContainer}>
          <img
            className={styles.thumbnail}
            src={props.thumbnail}
            alt={props.topic}
          />
          <p className={styles.duration}>{formatDuration(props.duration)}</p>
        </div>
        <div className={styles.details}>
          <h5 className={styles.topic}>{props.topic}</h5>
          <p className={styles.author}>{props.author}</p>
        </div>
      </div>
      {props.playlistItem && (
        <Checkbox
          updateWatched={props.updateWatched}
          watched={props.isWatched}
          index={props.index}
        />
      )}
      {props.isScrollable && (
        <Navigator
          nextVideo={props.nextVideo}
          prevVideo={props.prevVideo}
          deleteVideo={props.deleteVideo}
        />
      )}
    </div>
  );
};

export default PlaylistCard;
