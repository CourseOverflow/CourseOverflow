import React, { useState } from "react";
import styles from "./VideoPlayer.module.css";
import Video from "../Video/Video";
import Playlist from "../Playlist/Playlist";
import CommentSection from "../CommentSection/CommentSection";
import axios from "axios";
import baseURL from "../../ApiConfig/apiConfig";

const VideoPlayer = ({
  userId,
  playlistData,
  initialVideoList,
  commentData,
  watchCount,
  lastWatched,
}) => {
  const [totalWatched, setTotalWatched] = useState(watchCount);
  const [currVideoIdx, setVideoIdx] = useState(lastWatched);
  const [videoList, setVideoList] = useState(initialVideoList);

  const currVideo = videoList[currVideoIdx];

  const updateIdx = (idx) => {
    const requestData = { lastWatched: idx };
    axios
      .post(
        `${baseURL}/api/playlist/setLastWatched/${userId}/${playlistData.id}/`,
        requestData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating last watched: ", error);
      });
    setVideoIdx(idx);
  };

  const updateWatched = (idx, isWatched) => {
    const updatedVideoList = [...videoList];
    updatedVideoList[idx].isWatched = isWatched;
    console.log(idx + " " + isWatched)
    const requestData = { index: idx };
    axios
      .post(
        `${baseURL}/api/playlist/updateWatched/${
          isWatched ? "add" : "delete"
        }/${userId}/${playlistData.id}/${idx}/`,
        requestData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating watched data: ", error);
      });
    setVideoList(updatedVideoList);
    setTotalWatched(isWatched ? totalWatched + 1 : totalWatched - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.videoContainer}>
          <Video
            playlistData={playlistData}
            currVideo={currVideo}
            currVideoIdx={currVideoIdx}
            updateIdx={updateIdx}
          />
        </div>
        <div className={styles.playlistContainer}>
          <Playlist
            playlistData={playlistData}
            videoList={videoList}
            currVideoIdx={currVideoIdx}
            updateIdx={updateIdx}
            totalWatched={totalWatched}
            updateWatched={updateWatched}
          />
        </div>
      </div>
      <CommentSection comments={commentData} />
    </div>
  );
};

export default VideoPlayer;
