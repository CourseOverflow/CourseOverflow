import { createContext, useState, useContext } from "react";

export const usePlaylist = () => {
  const [stepNumber, setStepNumber] = useState(1);
  const [playlistId, setPlaylistId] = useState(null);
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
    authorId: 3,
  });

  return {
    stepNumber,
    setStepNumber,
    playlistId,
    setPlaylistId,
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
      "usePlaylistContext must be used within a PlaylistProvider"
    );
  }
  return playlist;
};
