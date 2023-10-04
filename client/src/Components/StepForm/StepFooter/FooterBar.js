import React from "react";
import styles from "./FooterBar.module.css";

const FooterBar = (props) => {
  const handelNextClick = () => {
    if (props.stepNumber < 3) {
      props.setStepNumber(props.stepNumber + 1);
    }
  };
  const handelBackClick = () => {
    if (props.stepNumber > 1) {
      props.setStepNumber(props.stepNumber - 1);
    }
  };
  return (
    <div className="FotterCreatePlaylist">
      <button onClick={handelBackClick} className={styles["BackBtn"]}>
        BACK
      </button>
      <button onClick={handelNextClick} className={styles["NextBtn"]}>
        NEXT
      </button>
    </div>
  );
};

export default FooterBar;
