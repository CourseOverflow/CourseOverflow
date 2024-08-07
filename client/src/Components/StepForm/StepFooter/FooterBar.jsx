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
      addAlert("Updating draft...", "Info");
      const response = await api.post(`draft/update-draft`, playlistData);
      if (!playlistData.draftId) {
        setPlaylistData((prevData) => ({
          ...prevData,
          draftId: response.data.draftId,
        }));
        setSearchParams({ draftId: response.data.draftId });
        navigate(`/create?draftId=${response.data.draftId}`, { replace: true });
        addAlert("Draft created successfully", "Success");
      } else {
        addAlert("Draft updated successfully", "Success");
      }
    } catch (error) {
      console.error("Error fetching draft data: ", error);
      addAlert("Error updating draft", "Error");
      setSearchParams();
    }
  };

  const fetchVideos = async () => {
    setFetchingVideos(true);
    setNextStatus(false);
    try {
      addAlert("Fetching videos...", "Info");
      const response = await api.get(`draft/fetch-videos`, {
        params: { draftId: playlistData.draftId },
      });
      setPlaylistData((prevData) => ({
        ...prevData,
        videoList: response.data,
      }));
      addAlert("Videos fetched successfully", "Success");
    } catch (error) {
      console.error("Error fetching playlist:", error);
      addAlert("Error fetching videos", "Error");
    }
    setFetchingVideos(false);
    setNextStatus(true);
  };

  const publishPlaylist = async () => {
    try {
      addAlert("Publishing playlist...", "Info");
      await api.post(`draft/update-draft`, playlistData);
      const response = await api.post(`playlist/create-playlist`, {
        draftId: playlistData.draftId,
      });
      const data = response.data;
      navigate(`/play?playlistId=${data.playlistId}&index=0`);
      addAlert("Playlist published successfully", "Success");
    } catch (error) {
      console.error("Error publishing playlist:", error);
      addAlert("Error publishing playlist", "Error");
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
