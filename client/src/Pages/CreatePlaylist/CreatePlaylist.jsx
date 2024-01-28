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
import { useSelector } from "react-redux";

const CreatePlaylist = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const draftId = searchParams.get("draftId");

  useEffect(() => {
    if (!user) {
      console.log("User not logged in");
      return;
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
  }, [user, draftId, setPlaylistData, setSearchParams, setNextStatus]);

  if (!user) {
    console.log("User not logged in");
    return <h1>You need to log in to access this feature</h1>;
  }

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
