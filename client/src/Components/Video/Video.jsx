import React, { useState } from "react";
import styles from "./Video.module.css";
import VideoControls from "../VideoControls/VideoControls";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";

const Video = ({
  userId,
  playlistData,
  currVideo,
  currVideoIdx,
  updateIdx,
}) => {
  const [likes, setLikes] = useState(playlistData.likes);
  const [dislikes, setDislikes] = useState(playlistData.dislikes);
  const [liked, setLiked] = useState(playlistData.isLiked);
  const [disliked, setDisliked] = useState(playlistData.isDisliked);

  const updateLiked = () => {
    const newLikes = liked ? -1 : 1;
    const newDislikes = disliked ? -1 : 0;
    const requestData = {
      userId: userId,
      playlistId: playlistData.id,
      liked: !liked,
      disliked: false,
      newLikes: newLikes,
      newDislikes: newDislikes,
    };
    axios
      .post(`${baseURL}/api/playlist/updateLikeDislike/`, requestData)
      .then((response) => {
        setLikes(likes + newLikes);
        setDislikes(dislikes + newDislikes);
        setDisliked(false);
        setLiked(!liked);
      })
      .catch((error) => {
        console.error("Error updating like: ", error);
      });
  };

  const updateDisliked = () => {
    const newLikes = liked ? -1 : 0;
    const newDislikes = disliked ? -1 : 1;
    const requestData = {
      userId: userId,
      playlistId: playlistData.id,
      liked: false,
      disliked: !disliked,
      newLikes: newLikes,
      newDislikes: newDislikes,
    };
    axios
      .post(`${baseURL}/api/playlist/updateLikeDislike/`, requestData)
      .then((response) => {
        setLikes(likes + newLikes);
        setDislikes(dislikes + newDislikes);
        setDisliked(!disliked);
        setLiked(false);
      })
      .catch((error) => {
        console.error("Error updating dislike: ", error);
      });
  };

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
        likes={likes}
        dislikes={dislikes}
        bundleSize={playlistData.bundleSize}
        updateIdx={updateIdx}
        currVideoIdx={currVideoIdx}
        desc={currVideo.description}
        updateLiked={updateLiked}
        updateDisliked={updateDisliked}
        isLiked={liked}
        isDisliked={disliked}
      />
    </>
  );
};

export default Video;
