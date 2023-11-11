import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../ApiConfig/apiConfig.js";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer.jsx";
import PlaySkeleton from "../../Components/Skeleton/PlaySkeleton.jsx";

const Play = () => {
  const [playlistData, setPlaylistData] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const playlistResponse = await axios.get(`${baseURL}/api/playlist/4/`);
        setPlaylistData(playlistResponse.data);
      } catch (error) {
        console.error("Error fetching playlist data: ", error);
      }
    };

    const fetchVideoList = async () => {
      try {
        const videoResponse = await axios.get(`${baseURL}/api/video/`);
        setVideoList(videoResponse.data);
      } catch (error) {
        console.error("Error fetching video list: ", error);
      }
    };

    const fetchCommentData = async () => {
      try {
        const commentResponse = await axios.get(`${baseURL}/api/comment/4`);
        setCommentData(commentResponse.data);
      } catch (error) {
        console.error("Error fetching comment data: ", error);
      }
    };

    Promise.all([fetchPlaylistData(), fetchVideoList(), fetchCommentData()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <PlaySkeleton />;
  }

  return <VideoPlayer playlistData={playlistData} videoList={videoList} commentData={commentData} />;
};

export default Play;
