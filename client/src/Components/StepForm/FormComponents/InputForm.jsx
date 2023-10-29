import React, { useState, useRef, useEffect } from "react";
import styles from "./InputForm.module.css";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTitleDivFocused, setIsTitleDivFocused] = useState(false);
  const [isDescDivFocused, setIsDescDivFocused] = useState(false);

  const titleInputRef = useRef(null);
  const descInputRef = useRef(null);

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 100) {
      setTitle(inputValue);
    }
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.textContent; // Get the text content
    if (inputValue.length <= 5000) {
      setDescription(inputValue);
    }
  };

  const handleSubmit = (e) => {
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
          <p className={styles["count"]}>{title.length}/100</p>
        </div>
        <input
          type="text"
          id="title"
          value={title}
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
          <p className={styles["count"]}>{description.length}/5000</p>
        </div>
        <div
          id="description"
          onInput={handleDescriptionChange} // Use onInput event
          className={styles["descInput"]}
          ref={descInputRef}
          contentEditable={true}
          data-placeholder="Enter a description for your Playlist..."
        ></div>
      </div>
    </form>
  );
};

export default InputForm;
