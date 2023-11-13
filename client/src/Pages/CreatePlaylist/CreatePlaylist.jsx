import React, { useState, useEffect } from "react";
import styles from "./CreatePlaylist.module.css";
import CreateHeader from "../../Components/StepForm/FormHeader/CreateHeader";
import Step1 from "../../Components/StepForm/StepPages/Step1";
import Step2 from "../../Components/StepForm/StepPages/Step2";
import Step3 from "../../Components/StepForm/StepPages/Step3";
import FooterBar from "../../Components/StepForm/StepFooter/FooterBar";
import baseURL from "../../Config/apiConfig";

const CreatePlaylist = () => {
  const [stepNumber, setStepNumber] = useState(1);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState(null);
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(null);
  const [backStatus, setBackStatus] = useState(false);
  const [nextStatus, setNextStatus] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    // Run this logic after the initial render
    if (stepNumber === 1) {
      setBackStatus(false);
      setNextStatus(playlistTitle.length > 0);
    } else {
      setBackStatus(true);
    }
  }, [playlistTitle, stepNumber]);

  const sendStep1Data = async () => {
    const loggedInUser = 4;
    console.log(playlistThumbnail);
    try {
      const response = await fetch(`${baseURL}/api/playlist/create-playlist/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: playlistTitle,
          desc: playlistDesc,
          authorId: loggedInUser,
          playlistThumbnail: playlistThumbnail,
          cloudinaryPublicId: cloudinaryPublicId,
        }),
      });

      if (response.ok) {
        // Handle successful response, e.g., show a success message
        console.log("Playlist created successfully");
      } else {
        // Handle error response, e.g., show an error message
        console.error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handelStep1NextClick = () => {
    if (stepNumber === 1) {
      sendStep1Data();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["createPlaylist-container"]}>
        {/* Pass the stepNumber state as a prop to CreateHeader */}
        <CreateHeader stepNumber={stepNumber} />
        {stepNumber === 1 && (
          <Step1
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            playlistDesc={playlistDesc}
            setPlaylistDesc={setPlaylistDesc}
            playlistThumbnail={playlistThumbnail}
            setPlaylistThumbnail={setPlaylistThumbnail}
            setCloudinaryPublicId={setCloudinaryPublicId}
            nextStatus={nextStatus}
            setNextStatus={setNextStatus}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}
        {stepNumber === 2 && <Step2 />}
        {stepNumber === 3 && <Step3 />}
        <hr className={styles["createDivider"]} />
        <FooterBar
          handelStep1NextClick={handelStep1NextClick}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
          backStatus={backStatus}
          nextStatus={nextStatus}
        />
      </div>
    </div>
  );
};

export default CreatePlaylist;
