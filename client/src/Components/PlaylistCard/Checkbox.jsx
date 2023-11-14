import React from "react";
import styles from "./Checkbox.module.css";
import { FaCheck, FaSquare } from "react-icons/fa";

const Checkbox = (props) => {
  const handleClick = () => {
    props.updateWatched(props.index, !props.watched);
  };

  return (
    <button onClick={handleClick} className={styles.checkbox}>
      <span>{props.watched ? <FaCheck /> : <FaSquare />}</span>
    </button>
  );
};

export default Checkbox;
