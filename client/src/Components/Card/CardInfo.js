// CardInfo.js
import React from "react";
import styles from "./Card.module.css";

const CardInfo = (props) => {
  return (
    <>
      <h1 className={styles.title}>{props.title}</h1>
      <p className={styles.author}>{props.author}</p>
    </>
  );
};

export default CardInfo;
