import React, { useState, useEffect } from "react";
import styles from "./Video.module.css";
import VideoControls from "../VideoControls/VideoControls";
import api from "../../Config/apiConfig.js";

const Video = ({
  playlistData,
  bundleSize,
  currVideo,
  currVideoIdx,
  updateIdx,
  videoContainerRef,
  setVideoContainerHeight,
}) => {
  const [likes, setLikes] = useState(playlistData.likes);
  const [dislikes, setDislikes] = useState(playlistData.dislikes);
  const [liked, setLiked] = useState(playlistData.isLiked);
  const [disliked, setDisliked] = useState(playlistData.isDisliked);
  const [updating, setUpdating] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    const updateHeight = () => {
      setVideoContainerHeight(videoContainerRef.current?.clientHeight || 0);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [currVideoIdx, videoContainerRef, setVideoContainerHeight]);

  const updateLiked = async () => {
    if (!user || updating) {
      console.log("User not logged in or updating");
      return;
    }
    setUpdating(true);
    try {
      const newLikes = liked ? -1 : 1;
      const newDislikes = disliked ? -1 : 0;
      const res = await api.post(`playlist/update-like-dislike`, {
        playlistId: playlistData.id,
        liked: !liked,
        disliked: false,
        newLikes: newLikes,
        newDislikes: newDislikes,
      });

      setLikes(likes + newLikes);
      setDislikes(dislikes + newDislikes);
      setDisliked(false);
      setLiked(!liked);
      console.log(res.data.message);
    } catch (error) {
      console.error("Error updating like: ", error);
    } finally {
      setUpdating(false);
    }
  };

  const updateDisliked = async () => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    setUpdating(true);
    try {
      const newLikes = liked ? -1 : 0;
      const newDislikes = disliked ? -1 : 1;
      const res = await api.post(`playlist/update-like-dislike`, {
        playlistId: playlistData.id,
        liked: false,
        disliked: !disliked,
        newLikes: newLikes,
        newDislikes: newDislikes,
      });

      setLikes(likes + newLikes);
      setDislikes(dislikes + newDislikes);
      setDisliked(!disliked);
      setLiked(false);
      console.log(res.data.message);
    } catch (error) {
      console.error("Error updating dislike: ", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div ref={videoContainerRef}>
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
        bundleSize={bundleSize}
        updateIdx={updateIdx}
        currVideoIdx={currVideoIdx}
        desc={currVideo.description}
        updateLiked={updateLiked}
        updateDisliked={updateDisliked}
        isLiked={liked}
        isDisliked={disliked}
      />
    </div>
  );
};

export default Video;
