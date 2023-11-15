import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../ApiConfig/apiConfig.js";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer.jsx";
import PlaySkeleton from "../../Components/Skeleton/PlaySkeleton.jsx";
import { useParams } from "react-router-dom";

const Play = () => {
  const userId = 3;

  let { slug } = useParams();
  const urlPlayListId = slug;

  const [playlistData, setPlaylistData] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [watchedData, setWatchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const playlistResponse = await axios.get(
          `${baseURL}/api/playlist/${userId}/${urlPlayListId}/`
        );
        setPlaylistData(playlistResponse.data);
      } catch (error) {
        console.error("Error fetching playlist data: ", error);
      }
    };

    const fetchVideoList = async () => {
      try {
        const videoResponse = await axios.get(
          `${baseURL}/api/video/${userId}/${urlPlayListId}/`
        );
        setVideoList(videoResponse.data);
      } catch (error) {
        console.error("Error fetching video list: ", error);
      }
    };

    const fetchCommentData = async () => {
      try {
        const commentResponse = await axios.get(
          `${baseURL}/api/comment/${userId}/${urlPlayListId}/`
        );
        setCommentData(commentResponse.data);
      } catch (error) {
        console.error("Error fetching comment data: ", error);
      }
    };

    const fetchWatchedData = async () => {
      try {
        const watchedResponse = await axios.get(
          `${baseURL}/api/playlist/watched/${userId}/${urlPlayListId}/`
        );
        setWatchedData(watchedResponse.data);
      } catch (error) {
        console.error("Error fetching last watched: ", error);
      }
    };

    Promise.all([
      fetchPlaylistData(),
      fetchVideoList(),
      fetchCommentData(),
      fetchWatchedData(),
    ])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [urlPlayListId]);

  if (loading) {
    return <PlaySkeleton />;
  }

  return (
    <VideoPlayer
      userId={userId}
      playlistData={playlistData}
      initialVideoList={videoList}
      commentData={commentData}
      watchCount={watchedData.watchCount}
      lastWatched={watchedData.lastWatched}
    />
  );
};

export default Play;
