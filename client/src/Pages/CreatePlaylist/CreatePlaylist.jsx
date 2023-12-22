import React from "react";
import styles from "./CreatePlaylist.module.css";
import CreateHeader from "../../Components/StepForm/FormHeader/CreateHeader";
import Step1 from "../../Components/StepForm/StepPages/Step1";
import Step2 from "../../Components/StepForm/StepPages/Step2";
import Step3 from "../../Components/StepForm/StepPages/Step3";
import FooterBar from "../../Components/StepForm/StepFooter/FooterBar";
import { PlaylistContext, usePlaylist } from "../../Contexts/PlaylistContext";

const CreatePlaylist = () => {
  const {
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
  } = usePlaylist();

  return (
    <PlaylistContext.Provider
      value={{
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
      }}
    >
      <div className={styles.container}>
        <div className={styles["createPlaylist-container"]}>
          <CreateHeader />
          {stepNumber === 1 && <Step1 />}
          {stepNumber === 2 && <Step2 />}
          {stepNumber === 3 && <Step3 />}
          <hr className={styles["createDivider"]} />
          <FooterBar />
        </div>
      </div>
    </PlaylistContext.Provider>
  );
};

export default CreatePlaylist;
