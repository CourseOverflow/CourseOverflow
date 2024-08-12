import React, { useEffect, useState } from "react";
import styles from "./CreatePlaylist.module.css";
import CreateHeader from "../../Components/StepForm/FormHeader/CreateHeader";
import Step1 from "../../Components/StepForm/StepPages/Step1";
import Step2 from "../../Components/StepForm/StepPages/Step2";
import Step3 from "../../Components/StepForm/StepPages/Step3";
import FooterBar from "../../Components/StepForm/StepFooter/FooterBar";
import CreateSkeleton from "../../Components/Skeleton/CreateSkeleton.jsx";
import { PlaylistContext, usePlaylist } from "../../Contexts/PlaylistContext";
import { useSearchParams } from "react-router-dom";
import api from "../../Config/apiConfig.js";
import { useNavigate } from "react-router-dom";
import useAlerts from "../../Hooks/useAlerts";

const CreatePlaylist = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const { addAlert } = useAlerts();

  const {
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
  } = usePlaylist();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const draftId = searchParams.get("draftId");

  useEffect(() => {
    console.log("CreatePlaylist.jsx: ", user);
    if (!user) {
      addAlert("Error", "Log in to access this page.");
      navigate("/");
    }
    const fetchData = async () => {
      if (draftId) {
        setLoading(true);
        try {
          const response = await api.get(`draft/get-draft`, {
            params: { draftId },
          });
          const draftData = response.data;
          setPlaylistData(draftData);
          if (draftData.title.length > 0) {
            setNextStatus(true);
          }
        } catch (error) {
          console.error("Error fetching draft data: ", error);
          setSearchParams();
        }
      }
    };
    fetchData();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftId, setPlaylistData, setSearchParams, setNextStatus]);

  return (
    <PlaylistContext.Provider
      value={{
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
      }}
    >
      <div className={styles.container}>
        <div className={styles["createPlaylist-container"]}>
          <CreateHeader />
          {loading ? (
            <CreateSkeleton />
          ) : (
            <>
              {stepNumber === 1 && <Step1 />}
              {stepNumber === 2 && <Step2 />}
              {stepNumber === 3 && <Step3 />}
            </>
          )}
          <hr className={styles["createDivider"]} />
          <FooterBar setSearchParams={setSearchParams} />
        </div>
      </div>
    </PlaylistContext.Provider>
  );
};

export default CreatePlaylist;
