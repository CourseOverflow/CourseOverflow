import React from "react";
import styles from "./ListItem.module.css";
const ListItem = (props) => {
  return (
    <div id={props.key} className={styles["playlist-item"]}>
      <h1>{props.item.title}</h1>
      <p>{props.item.duration}</p>
    </div>
  );
};

export default ListItem;
