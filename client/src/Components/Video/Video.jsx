import React from "react";
import styles from "./Video.module.css";
import VideoControls from "../VideoControls/VideoControls";

const Video = ({ playlistData, currVideo, currVideoIdx, setVideoIndex }) => {
  return (
    <>
      <div className={styles["video-container"]}>
        <iframe
          title={currVideo.title}
          src={`https://youtube.com/embed/${currVideo.youtubeHash}?autoplay=0`}
          allowFullScreen
        ></iframe>
      </div>
      <VideoControls
        title={currVideo.title}
        authorName={playlistData.authorName}
        authorProfile={playlistData.authorProfile}
        likes={playlistData.likes}
        dislikes={playlistData.dislikes}
        bundleSize={playlistData.bundleSize}
        setVideoIndex={setVideoIndex}
        currVideoIdx={currVideoIdx}
        desc={currVideo.description}
      />
    </>
  );
};

export default Video;
