import React from "react";
import styles from "./FooterBar.module.css";
import { useNavigate } from "react-router-dom";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";
import baseURL from "../../../Config/apiConfig";

const FooterBar = ({ setSearchParams }) => {
  console.log("baseURL:", baseURL);
  const navigate = useNavigate();
  const {
    stepNumber,
    setStepNumber,
    backStatus,
    setBackStatus,
    nextStatus,
    setNextStatus,
    setFetchingVideos,
    playlistData,
    setPlaylistData,
  } = usePlaylistContext();

  const updateDraft = async () => {
    try {
      const response = await fetch(`${baseURL}/api/draft/update-draft/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playlistData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Playlist updated successfully");
        console.log(data);
        if (!playlistData.draftId) {
          setPlaylistData((prevData) => ({
            ...prevData,
            draftId: data.draftId,
          }));
          setSearchParams({ draftId: data.draftId });
          navigate(`/create?draftId=${data.draftId}`, { replace: true });
        }
      } else {
        console.error("Failed to update playlist");
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const fetchVideos = async () => {
    setFetchingVideos(true);
    setNextStatus(false);
    try {
      const response = await fetch(
        `${baseURL}/api/draft/fetch-videos/?draftId=${playlistData.draftId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Playlist fetched successfully");
        console.log(data);
        setPlaylistData((prevData) => ({
          ...prevData,
          videoList: data,
        }));
      } else {
        console.error("Failed to fetch playlist");
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
    setFetchingVideos(false);
    setNextStatus(true);
  };

  const publishPlaylist = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/playlist/create-playlist/?draftId=${playlistData.draftId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Playlist published successfully");
        console.log(data);
        navigate(`/play?playlistId=${data.playlistId}&index=0`);
      } else {
        console.error("Failed to publish playlist");
      }
    } catch (error) {
      console.error("Error publishing playlist:", error);
    }
  };

  const handelBackClick = () => {
    updateDraft();
    console.log(playlistData);
    setStepNumber(stepNumber - 1);
    if (stepNumber === 2) {
      setBackStatus(false);
    }
  };

  const handelNextClick = async () => {
    if (stepNumber === 2) {
      fetchVideos();
    } else if (stepNumber === 3) {
      await publishPlaylist();
    } else {
      updateDraft();
    }
    console.log(playlistData);
    setStepNumber(stepNumber + 1);
  };

  return (
    <div className={styles.createFooter}>
      <button
        onClick={handelBackClick}
        className={`${styles["BackBtn"]} ${
          backStatus ? "" : styles["disabledBtn"]
        }`}
        disabled={!backStatus}
      >
        BACK
      </button>
      <button
        onClick={handelNextClick}
        className={`${styles["NextBtn"]} ${
          nextStatus ? "" : styles["disabledBtn"]
        }`}
        disabled={!nextStatus}
      >
        {stepNumber === 3 ? "FINISH" : "NEXT"}
      </button>
    </div>
  );
};

export default FooterBar;
