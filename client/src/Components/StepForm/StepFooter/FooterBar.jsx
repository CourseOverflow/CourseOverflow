import React from "react";
import styles from "./FooterBar.module.css";
import { useNavigate } from "react-router-dom";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";
import api from "../../../Config/apiConfig";
import useAlert from "../../../Hooks/useAlerts";

const FooterBar = ({ setSearchParams }) => {
  const { addAlert } = useAlert();
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
      addAlert("Info", "Updating draft...");
      const response = await api.post(`draft/update-draft`, playlistData);
      if (!playlistData.draftId) {
        setPlaylistData((prevData) => ({
          ...prevData,
          draftId: response.data.draftId,
        }));
        setSearchParams({ draftId: response.data.draftId });
        navigate(`/create?draftId=${response.data.draftId}`, { replace: true });
        addAlert("Success", "Draft created successfully");
      } else {
        addAlert("Success", "Draft updated successfully");
      }
    } catch (error) {
      console.error("Error fetching draft data: ", error);
      addAlert("Error", "Error updating draft");
      setSearchParams();
    }
  };

  const fetchVideos = async () => {
    setFetchingVideos(true);
    setNextStatus(false);
    try {
      addAlert("Info", "Fetching videos...");
      const response = await api.get(`draft/fetch-videos`, {
        params: { draftId: playlistData.draftId },
      });
      setPlaylistData((prevData) => ({
        ...prevData,
        videoList: response.data,
      }));
      addAlert("Success", "Videos fetched successfully");
    } catch (error) {
      console.error("Error fetching playlist:", error);
      addAlert("Error", "Error fetching videos");
    }
    setFetchingVideos(false);
    setNextStatus(true);
  };

  const publishPlaylist = async () => {
    try {
      addAlert("Info", "Publishing playlist...");
      await api.post(`draft/update-draft`, playlistData);
      const response = await api.post(`playlist/create-playlist`, {
        draftId: playlistData.draftId,
      });
      const data = response.data;
      navigate(`/play?playlistId=${data.playlistId}&index=0`);
      addAlert("Success", "Playlist published successfully");
    } catch (error) {
      console.error("Error publishing playlist:", error);
      addAlert("Error", "Error publishing playlist");
    }
  };

  const handelBackClick = () => {
    updateDraft();
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
