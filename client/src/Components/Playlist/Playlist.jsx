import React from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from "./Playlist.module.css";

const Playlist = ({ playlistData, videoList, currVideoIdx, setVideoIndex }) => {
  const checkboxHandler = () => {
    console.log("not yet integrated: checkboxHandler");
  };

  return (
    <div className={styles.playlist}>
      <PlaylistHeader
        title={playlistData.title}
        author={playlistData.authorId}
        duration={playlistData.duration}
        bundleSize={playlistData.bundleSize}
        watchCount={playlistData.watchCount}
      />
      <div className={styles["playlist-items"]}>
        {videoList.map((item, index) => {
          return (
            <PlaylistCard
              setVideoIdx={setVideoIndex}
              currVideo={currVideoIdx === item.index}
              index={index}
              author={item.author}
              key={item.id}
              topic={item.title}
              thumbnail="https://picsum.photos/seed/picsum/300/200"
              duration={item.duration}
              desc={item.description}
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
