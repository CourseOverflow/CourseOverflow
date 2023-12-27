import React, { useEffect } from "react";
import styles from "./CreatePlaylist.module.css";
import CreateHeader from "../../Components/StepForm/FormHeader/CreateHeader";
import Step1 from "../../Components/StepForm/StepPages/Step1";
import Step2 from "../../Components/StepForm/StepPages/Step2";
import Step3 from "../../Components/StepForm/StepPages/Step3";
import FooterBar from "../../Components/StepForm/StepFooter/FooterBar";
import { PlaylistContext, usePlaylist } from "../../Contexts/PlaylistContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";

const CreatePlaylist = () => {
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
  const draftId = searchParams.get("draftId");

  useEffect(() => {
    const fetchData = async () => {
      if (draftId) {
        try {
          const response = await axios.get(
            `${baseURL}/api/draft/get-draft/?draftId=${draftId}`
          );
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
  }, []);

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
          {stepNumber === 1 && <Step1 />}
          {stepNumber === 2 && <Step2 />}
          {stepNumber === 3 && <Step3 />}
          <hr className={styles["createDivider"]} />
          <FooterBar setSearchParams={setSearchParams} />
        </div>
      </div>
    </PlaylistContext.Provider>
  );
};

export default CreatePlaylist;
