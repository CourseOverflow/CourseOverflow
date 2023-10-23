import React from "react";
import styles from "./Checkbox.module.css";
import { FaCheck, FaSquare } from "react-icons/fa";

const Checkbox = (props) => {
  return (
    <div className={styles.checkbox}>
      <span onClick={props.checkboxHandler}>
        {props.watched ? <FaCheck /> : <FaSquare />}
      </span>
    </div>
  );
};

export default Checkbox;
