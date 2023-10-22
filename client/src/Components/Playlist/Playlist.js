import React from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from "./Playlist.module.css";

const Playlist = (props) => {
  return (
    <div
      style={!props.overflow ? { height: `${props.height}px` } : {}}
      className={styles.playlist}
    >
      <PlaylistHeader
        title={props.title}
        author={props.author}
        duration={props.duration}
      />
      <div
        style={!props.overflow ? { height: `${props.height}px` } : {}}
        className={`${styles["playlist-items"]} ${
          props.overflow && `${styles.overflow}`
        }`}
      >
        {props.data.map((item) => {
          return <PlaylistCard key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Playlist;
