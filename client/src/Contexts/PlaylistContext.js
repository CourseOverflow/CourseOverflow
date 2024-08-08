import { createContext, useState, useContext } from "react";

export const usePlaylist = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user_id;
  const [stepNumber, setStepNumber] = useState(1);
  const [backStatus, setBackStatus] = useState(false);
  const [nextStatus, setNextStatus] = useState(false);
  const [fetchingVideos, setFetchingVideos] = useState(false);
  const [playlistData, setPlaylistData] = useState({
    draftId: null,
    title: "",
    desc: "",
    thumbnail: "",
    cloudinaryPublicId: null,
    topicList: [],
    videoList: [],
    coursePDF: null,
    authorId: userId,
  });

  return {
    stepNumber,
    setStepNumber,
    backStatus,
    setBackStatus,
    nextStatus,
    setNextStatus,
    fetchingVideos,
    setFetchingVideos,
    playlistData,
    setPlaylistData,
  };
};

export const PlaylistContext = createContext();

export const usePlaylistContext = () => {
  const playlist = useContext(PlaylistContext);
  if (!playlist) {
    throw new Error(
      "usePlaylistContext must be used within a PlaylistProvider",
    );
  }
  return playlist;
};
