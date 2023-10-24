import React from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from "./Playlist.module.css";

const Playlist = (props) => {
  const checkboxHandler = () => {
    console.log("not yet integrated: checkboxHandler");
  };

  const handleNextClick = (id) => {
    props.setVideoIndex(id);
  };
  console.log(props.id);
  return (
    <div
      style={!props.overflow ? { height: `${props.height}px` } : {}}
      className={`${styles.playlist} ${props.overflow && styles.overflow}`}
    >
      <PlaylistHeader
        title={props.playlistHeaderData.title}
        author={props.playlistHeaderData.author}
        duration={props.playlistHeaderData.duration}
        videoCount={props.playlistHeaderData.videoCount}
        watchedCount={props.playlistHeaderData.watchedCount}
      />
      <div
        style={!props.overflow ? { height: `${props.height - 130}px` } : {}}
        className={`${styles["playlist-items"]} ${
          props.overflow && `${styles.overflow}`
        }`}
      >
        {props.data.map((item, index) => {
          return (
            <PlaylistCard
              clickHandler={() => handleNextClick(item.index)}
              currVideo={props.currVideoIdx === item.index || 3 === item.index}
              rank={index + 1}
              author={item.author}
              key={item.id}
              topic={item.topic}
              thumbnail={item.thumbnail}
              duration={item.duration}
              desc={item.desc}
              isWatched={item.isWatched}
              checkboxHandler={checkboxHandler}
              playlistItem={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
