import React, { useState, useEffect, useRef } from "react";
import styles from "./Play.module.css";
import Playlist from "../../Components/Playlist/Playlist";
import Comments from "../../Components/CommentSection/CommentSection";
import VideoControls from "../../Components/VideoControls/VideoControls";
import CommentData from "../../Data/CommentData";
import CourseData from "../../Data/CourseData";
import PlayListData from "../../Data/PlayListData";

const VideoPlayer = () => {
  // data of the playlist currently playing
  const playlistHeaderData = CourseData[0];
  //data of the playlist currently playing
  const currentlyPlayingPlaylist = CourseData[0].PlayListId;
  //index of the video currently playing
  const currentlyPlayingVideo = PlayListData[currentlyPlayingPlaylist];
  //Bundle => data of the playlist currently playing
  const [currentlyPlayingVideoIndex, setCurrentlyPlayingVideoIndex] =
    useState(0);
  //id of the video currently playing
  const currPlaylistData = currentlyPlayingVideo.bundle;
  const [youtubeVideoId, setYoutubeVideoId] = useState(
    currPlaylistData[currentlyPlayingVideoIndex].videoId
  );

  // Function to set the currentlyPlayingVideoIndex state
  const setVideoIndex = (index) => {
    setCurrentlyPlayingVideoIndex(index);
  };

  // Listen for changes in currPlaylistData and update currentlyPlayingVideoIndex
  useEffect(() => {
    setYoutubeVideoId(currPlaylistData[currentlyPlayingVideoIndex].videoId);
  }, [currentlyPlayingVideoIndex]);

  const [showPlaylist, setShowPlaylist] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const[pausing,setpausing]= useState(0);

  const [videoDescriptionHeight, setVideoDescriptionHeight] = useState(0);
  const minWidth = 1000;

  const videoDescriptionRef = useRef(null);

  // before predy work/bp

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
          <VideoControls
            currPlaylistData={currPlaylistData[currentlyPlayingVideoIndex]}
            likes={currPlaylistData[currentlyPlayingVideoIndex].likes}
            dislikes={currPlaylistData[currentlyPlayingVideoIndex].dislikes}
            playlistSize={currPlaylistData.length}
            setVideoIndex={setVideoIndex}
            currentlyPlayingVideoIndex={currentlyPlayingVideoIndex}
            desc={currPlaylistData[currentlyPlayingVideoIndex].desc}
          />
          {windowWidth <= minWidth && (
            <>
              <button className={styles["tab-switch"]} onClick={toggleDisplay}>
                {showPlaylist ? "Show Comments" : "Show Playlist"}
              </button>
              {showPlaylist ? (
                <Playlist
                  currVideoIdx={currentlyPlayingVideoIndex}
                  setVideoIndex={setVideoIndex}
                  data={currPlaylistData}
                  playlistHeaderData={playlistHeaderData}
                  overflow={true}
                  height={videoDescriptionHeight}
                />
              ) : (
                <Comments comments={CommentData[1].comments} overflow={true} />
              )}
            </>
          )}
        </div>
        {windowWidth > minWidth && (
          <Playlist
          currVideoIdx={currentlyPlayingVideoIndex}
            setVideoIndex={setVideoIndex}
            data={currPlaylistData}
            playlistHeaderData={playlistHeaderData}
            overflow={false}
            height={videoDescriptionHeight}
          />
        )}
      </div>
      {windowWidth > minWidth && (
        <Comments comments={CommentData[1].comments} overflow={false} />
      )}
    </>
  );
};

export default VideoPlayer;
