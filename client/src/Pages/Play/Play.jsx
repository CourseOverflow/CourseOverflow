import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Play.module.css";
import Video from "../../Components/Video/Video.jsx";
import Playlist from "../../Components/Playlist/Playlist.jsx";
import CommentSection from "../../Components/CommentSection/CommentSection.jsx";
import PlaySkeleton from "../../Components/Skeleton/PlaySkeleton.jsx";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";
import { useSelector } from "react-redux";

const Play = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const userId = user?.id || 1;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get("playlistId");
  const index = searchParams.get("index");

  const videoContainerRef = useRef(null);
  const [videoContainerHeight, setVideoContainerHeight] = useState(0);

  const [playlistData, setPlaylistData] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [totalWatched, setTotalWatched] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          playlistResponse,
          videoResponse,
          commentResponse,
          watchedResponse,
        ] = await axios.all([
          axios.get(`${baseURL}/api/playlist/${userId}/${playlistId}/`),
          axios.get(`${baseURL}/api/video/${userId}/${playlistId}/`),
          axios.get(`${baseURL}/api/comment/${userId}/${playlistId}/`),
          axios.get(
            `${baseURL}/api/playlist/watch-count/${userId}/${playlistId}/`
          ),
        ]);

        setPlaylistData(playlistResponse.data);
        setVideoList(videoResponse.data);
        setCommentData(commentResponse.data);
        setTotalWatched(watchedResponse.data.watchCount);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
      }
    };

    fetchData();
  }, [playlistId]);

  const updateIdx = (idx) => {
    navigate(`/play?playlistId=${playlistId}&index=${idx}`, {
      replace: true,
    });

    const requestData = {
      userId: userId,
      playlistId: playlistData.id,
      lastWatched: idx,
    };
    axios
      .post(`${baseURL}/api/playlist/setLastWatched/`, requestData)
      .catch((error) => {
        console.error("Error updating last watched: ", error);
      });
  };

  const updateWatched = (idx, isWatched) => {
    const updatedVideoList = [...videoList];
    updatedVideoList[idx].isWatched = isWatched;
    const requestData = {
      userId: userId,
      playlistId: playlistData.id,
      index: idx,
      add: isWatched,
    };
    axios
      .post(`${baseURL}/api/playlist/updateWatched/`, requestData)
      .catch((error) => {
        console.error("Error updating watched data: ", error);
      });
    setVideoList(updatedVideoList);
    setTotalWatched(isWatched ? totalWatched + 1 : totalWatched - 1);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PlaySkeleton />
      </div>
    );
  }
  console.log(videoList);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.videoContainer}>
          <Video
            userId={userId}
            playlistData={playlistData}
            bundleSize={videoList.length}
            currVideo={videoList[index]}
            currVideoIdx={index}
            updateIdx={updateIdx}
            videoContainerRef={videoContainerRef}
            setVideoContainerHeight={setVideoContainerHeight}
          />
        </div>
        <div className={styles.playlistContainer}>
          <Playlist
            playlistData={playlistData}
            videoList={videoList}
            currVideoIdx={parseInt(index)}
            updateIdx={updateIdx}
            totalWatched={totalWatched}
            updateWatched={updateWatched}
            videoContainerHeight={videoContainerHeight}
          />
        </div>
      </div>
      <CommentSection playlistId={playlistData.id} comments={commentData} />
    </div>
  );
};

export default Play;
