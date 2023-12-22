import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import styles from "./Todo.module.css";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";

const Todo = ({ updateDraft, index }) => {
  const { setNextStatus, playlistData, setPlaylistData } = usePlaylistContext();
  const [isEditing, setIsEditing] = useState(false);
  const [topic, setTopic] = useState(playlistData.topicList[index]);
  const inputRef = useRef(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    const newList = [...playlistData.topicList];
    newList[index] = topic;
    setPlaylistData({ ...playlistData, topicList: newList });
    updateDraft(newList);
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const removeTopic = () => {
    const newList = [...playlistData.topicList];
    newList.splice(index, 1);
    setPlaylistData({ ...playlistData, topicList: newList });
    updateDraft();
    if (newList.length === 0) {
      setNextStatus(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  let result;
  if (isEditing) {
    result = (
      <div className={styles.Todo}>
        <form className={styles["Todo-edit-form"]} onSubmit={handleUpdate}>
          <input
            ref={inputRef}
            onChange={handleChange}
            value={topic}
            type="text"
          />
          <button>
            <FaCheck />
          </button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className={styles.Todo}>
        <li>{playlistData.topicList[index]}</li>
        <div className={styles["Todo-buttons"]}>
          <button onClick={() => setIsEditing(!isEditing)}>
            <FaPen />
          </button>
          <button onClick={removeTopic}>
            <FaTrash />
          </button>
        </div>
      </div>
    );
  }
  return result;
};

export default Todo;
