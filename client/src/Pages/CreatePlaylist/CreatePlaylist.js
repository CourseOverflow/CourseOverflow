import React, { useState } from "react";
import styles from "./CreatePlaylist.module.css";
import CreateHeader from "../../Components/StepForm/FormHeader/CreateHeader";
import Step1 from "../../Components/StepForm/StepPages/Step1";
import Step2 from "../../Components/StepForm/StepPages/Step2";
import Step3 from "../../Components/StepForm/StepPages/Step3";
import FooterBar from "../../Components/StepForm/StepFooter/FooterBar";
const CreatePlaylist = () => {
  // Define and initialize the stepNumber state variable
  // 1 2 3 4
  const [stepNumber, setStepNumber] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles["createPlaylist-container"]}>
        {/* Pass the stepNumber state as a prop to CreateHeader */}
        <CreateHeader stepNumber={stepNumber} />
        {stepNumber === 1 && <Step1 />}
        {stepNumber === 2 && <Step2 />}
        {stepNumber === 3 && <Step3 />}
        <hr className={styles["createDivider"]} />
        <FooterBar stepNumber={stepNumber} setStepNumber={setStepNumber} />
      </div>
    </div>
  );
};

export default CreatePlaylist;
