import React, { useState } from "react";
import styles from "./VideoPlayer.module.css";
import Video from "../Video/Video";
import Playlist from "../Playlist/Playlist";
import CommentSection from "../CommentSection/CommentSection";

const VideoPlayer = ({ playlistData, videoList, commentData }) => {
  const [currVideoIdx, setVideoIdx] = useState(0);
  const currVideo = videoList[currVideoIdx];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.videoContainer}>
          <Video
            playlistData={playlistData}
            currVideo={currVideo}
            currVideoIdx={currVideoIdx}
            setVideoIndex={setVideoIdx}
          />
        </div>
        <div className={styles.playlistContainer}>
          <Playlist
            playlistData={playlistData}
            videoList={videoList}
            currVideoIdx={currVideoIdx}
            setVideoIndex={setVideoIdx}
          />
        </div>
      </div>
      <CommentSection comments={commentData} />
    </div>
  );
};

export default VideoPlayer;
