import React, { useState, useEffect, useRef } from "react";
import styles from "./NewTodoForm.module.css";
import { FaPlus } from "react-icons/fa";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";

function NewTodoForm({ updateDraft }) {
  const { setNextStatus, playlistData, setPlaylistData } = usePlaylistContext();
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput === "") return;

    setPlaylistData((prevData) => ({
      ...prevData,
      topicList: [...prevData.topicList, userInput],
    }));

    updateDraft([...playlistData.topicList, userInput]);
    setUserInput("");
    setNextStatus(true);
  };

  return (
    <div className={styles.container}>
      <form className={styles.NewTodoForm} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          id="topic"
          type="text"
          name="topic"
          placeholder="Add Topic"
        />
        <button>
          <FaPlus />
        </button>
      </form>
    </div>
  );
}

export default NewTodoForm;
