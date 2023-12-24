import React from "react";
import styles from "./Step2.module.css";
import FileUpload from "../FormComponents/FileUpload";
import TodoList from "../TodoList/TodoList";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";

const Step2 = () => {
  const { setBackStatus } = usePlaylistContext();
  setBackStatus(true);

  return (
    <div className={styles.flexContainer}>
      <div className={styles.uploadContainer}>
        <FileUpload />
      </div>
      <div className={styles.listContainer}>
        <TodoList />
      </div>
    </div>
  );
};

export default Step2;
