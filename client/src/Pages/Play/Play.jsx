import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Play.module.css";
import Video from "../../Components/Video/Video.jsx";
import Playlist from "../../Components/Playlist/Playlist.jsx";
import CommentSection from "../../Components/CommentSection/CommentSection.jsx";
import PlaySkeleton from "../../Components/Skeleton/PlaySkeleton.jsx";
import api from "../../Config/apiConfig.js";
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
        ] = await Promise.all([
          api.get("playlist/get-playlist", { params: { playlistId } }),
          api.get("video/video-detail", { params: { playlistId } }),
          api.get("comment/section", { params: { playlistId } }),
          api.get("playlist/watch-count", { params: { playlistId } }),
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

  const updateIdx = async (idx) => {
    try {
      if (user) {
        await api.post("playlist/set-last-watched", {
          playlistId: playlistData.id,
          lastWatched: idx,
        });
      }
      navigate(`/play?playlistId=${playlistId}&index=${idx}`, {
        replace: true,
      });
    } catch (error) {
      console.error("Error updating last watched: ", error);
    }
  };

  const updateWatched = async (idx, isWatched) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    try {
      const updatedVideoList = [...videoList];
      updatedVideoList[idx].isWatched = isWatched;

      await api.post("playlist/update-watched", {
        playlistId: playlistData.id,
        index: idx,
        add: isWatched,
      });

      setVideoList(updatedVideoList);
      setTotalWatched((prevWatched) =>
        isWatched ? prevWatched + 1 : prevWatched - 1
      );
    } catch (error) {
      console.error("Error updating watched data: ", error);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PlaySkeleton />
      </div>
    );
  }

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
