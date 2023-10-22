import React, { useState, useEffect, useRef } from "react";
import styles from "./Play.module.css";
import Playlist from "../../Components/Playlist/Playlist";
import Comments from "../../Components/CommentSection/CommentSection";
import VideoControls from "../../Components/VideoControls/VideoControls";
import dummyData from "./dummyData";
import dummyComments from "./dummyComments";

const VideoPlayer = () => {
  const youtubeVideoId = "dA1yY59MNUY";
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [videoDescriptionHeight, setVideoDescriptionHeight] = useState(0);
  const minWidth = 1000;
  const videoDescriptionRef = useRef(null);

  const toggleDisplay = () => {
    setShowPlaylist(!showPlaylist);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (videoDescriptionRef.current) {
        setVideoDescriptionHeight(videoDescriptionRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles["player"]}>
        <div ref={videoDescriptionRef} className={styles["video-description"]}>
          <div className={styles["video-container"]}>
            <iframe
              title="YouTube Video"
              src={`https://youtube.com/embed/${youtubeVideoId}?autoplay=0`}
              allowFullScreen
            ></iframe>
          </div>
          <VideoControls />
          {windowWidth <= minWidth && (
            <>
              <button className={styles["tab-switch"]} onClick={toggleDisplay}>
                {showPlaylist ? "Show Comments" : "Show Playlist"}
              </button>
              {showPlaylist ? (
                <Playlist
                  data={dummyData}
                  overflow={true}
                  height={videoDescriptionHeight}
                />
              ) : (
                <Comments comments={dummyComments} overflow={true} />
              )}
            </>
          )}
        </div>
        {windowWidth > minWidth && (
          <Playlist
            data={dummyData}
            overflow={false}
            height={videoDescriptionHeight}
          />
        )}
      </div>
      {windowWidth > minWidth && (
        <Comments comments={dummyComments} overflow={false} />
      )}
    </>
  );
};

export default VideoPlayer;
