import React, { useState, useRef, useEffect } from "react";
import styles from "./InputForm.module.css";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";

const InputForm = () => {
  const { setNextStatus, playlistData, setPlaylistData } = usePlaylistContext();
  const [isTitleDivFocused, setIsTitleDivFocused] = useState(false);
  const [isDescDivFocused, setIsDescDivFocused] = useState(false);

  const titleInputRef = useRef(null);
  const descInputRef = useRef(null);

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length === 0) {
      setNextStatus(false);
    } else {
      setNextStatus(true);
    }
    if (inputValue.length <= 100) {
      setPlaylistData((prevData) => ({
        ...prevData,
        title: inputValue,
      }));
    }
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 5000) {
      setPlaylistData((prevData) => ({
        ...prevData,
        desc: inputValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const focusTitleInput = () => {
    titleInputRef.current.focus();
    setIsTitleDivFocused(true);
    setIsDescDivFocused(false);
  };

  const focusDescInput = () => {
    descInputRef.current.focus();
    setIsDescDivFocused(true);
    setIsTitleDivFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (titleInputRef.current && !titleInputRef.current.contains(e.target)) {
        setIsTitleDivFocused(false);
      }
      if (descInputRef.current && !descInputRef.current.contains(e.target)) {
        setIsDescDivFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`${styles["titleDiv"]} ${
          isTitleDivFocused ? styles["titleDivFocused"] : ""
        }`}
        onClick={focusTitleInput}
      >
        <div className={styles["inputHeader"]}>
          <label htmlFor="title" className={styles["titleLabel"]}>
            Title <span className={styles["required"]}>*</span>
          </label>
          <p className={styles["count"]}>{playlistData.title.length}/100</p>
        </div>
        <input
          type="text"
          id="title"
          value={playlistData.title}
          placeholder="Enter a title for your Playlist"
          onChange={handleTitleChange}
          className={styles["titleInput"]}
          ref={titleInputRef}
        />
      </div>
      <div
        className={`${styles["descDiv"]} ${
          isDescDivFocused ? styles["descDivFocused"] : ""
        }`}
        onClick={focusDescInput}
      >
        <div className={styles["inputHeader"]}>
          <label htmlFor="description" className={styles["descLabel"]}>
            Description
          </label>
          <p className={styles["count"]}>{playlistData.desc.length}/5000</p>
        </div>
        <textarea
          id="description"
          onInput={handleDescriptionChange}
          className={styles["descInput"]}
          ref={descInputRef}
          placeholder="Enter a description for your Playlist..."
          value={playlistData.desc}
        />
      </div>
    </form>
  );
};

export default InputForm;
