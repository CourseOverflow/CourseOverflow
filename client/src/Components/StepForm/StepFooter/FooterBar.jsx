import React from "react";
import styles from "./FooterBar.module.css";

const FooterBar = (props) => {
  const backStatus = props.backStatus;
  const nextStatus = props.nextStatus;

  const handelNextClick = () => {
    if (props.stepNumber === 1) {
      props.handelStep1NextClick();
    }
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
        NEXT
      </button>
    </div>
  );
};

export default FooterBar;
