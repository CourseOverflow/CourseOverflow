import React from "react";
import styles from "./PlaylistCard.module.css";
import { FaBars, FaPlay } from "react-icons/fa";
import Checkbox from "./Checkbox";

const PlaylistCard = (props) => {
  return (
    <div
      onClick={props.playlistItem ? () => props.setVideoIdx(props.index) : null}
      className={`${styles.container} ${props.isWatched && styles.played}`}
    >
      <div
        onClick={props.clickHandler}
        className={`${styles.playlistCard} ${props.isWatched && styles.played}`}
      >
        <span className={`${styles.videoIdx}`}>
          {props.isDraggable && <FaBars />}
          {props.currVideo ? <FaPlay /> : props.rank}
        </span>
        <div className={`${styles.imageContainer}`}>
          <img
            className={`${styles.thumbnail}`}
            src={props.thumbnail}
            alt={props.topic}
          />
          <p className={`${styles.duration}`}>{props.duration}</p>
        </div>
        <div className={`${styles.details}`}>
          <h5 className={`${styles.topic}`}>{props.topic}</h5>
          <p className={`${styles.author}`}>{props.author}</p>
        </div>
      </div>
      {props.playlistItem && (
        <Checkbox
          checkboxHandler={props.checkboxHandler}
          watched={props.isWatched}
        />
      )}
    </div>
  );
};

export default PlaylistCard;
