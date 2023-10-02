import React, { useState } from "react";
import styles from "./CreatePlaylist.module.css";
import CreateHeader from "../../Components/StepForm/FormHeader/CreateHeader";
import Step1 from "../../Components/StepForm/StepPages/Step1";
import Step2 from "../../Components/StepForm/StepPages/Step2";
import Step3 from "../../Components/StepForm/StepPages/Step3";

const CreatePlaylist = () => {
  // Define and initialize the stepNumber state variable
  // 1 2 3 4
  const [stepNumber, setStepNumber] = useState(1);
  const handelNextClick = () => {
    if (stepNumber < 3) {
      setStepNumber(stepNumber + 1);
    }
  };
  const handelBackClick = () => {
    if (stepNumber > 1) {
      setStepNumber(stepNumber - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["createPlaylist-container"]}>
        {/* Pass the stepNumber state as a prop to CreateHeader */}
        <CreateHeader stepNumber={stepNumber} />
        {stepNumber === 1 && <Step1 />}
        {stepNumber === 2 && <Step2 />}
        {stepNumber === 3 && <Step3 />}
        <hr className={styles["createDivider"]} />
        <div className="FotterCreatePlaylist">
          <button onClick={handelBackClick} className={styles["BackBtn"]}>
            BACK
          </button>
          <button onClick={handelNextClick} className={styles["NextBtn"]}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;
