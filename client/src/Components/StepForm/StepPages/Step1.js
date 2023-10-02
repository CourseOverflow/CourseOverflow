import React, { useState, useRef, useEffect } from "react";
import styles from "./Step1.module.css";
import ImageUpload from "../FormComponents/ImageUpload";
const Step1 = () => {
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
    const inputValue = e.target.value;
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
    <div className={styles.flexContainer}>
      <div className={styles.column50}>
        <form onSubmit={handleSubmit}>
          <div
            className={`${styles["titleDiv"]} ${
              isTitleDivFocused ? styles["titleDivFocused"] : ""
            }`}
            onClick={focusTitleInput}
          >
            <label htmlFor="title" className={styles["titleLabel"]}>
              Title (required) :
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className={styles["titleInput"]}
              ref={titleInputRef}
            />
            <p className={styles["count"]}>{title.length}/100</p>
          </div>
          <div
            className={`${styles["descDiv"]} ${
              isDescDivFocused ? styles["descDivFocused"] : ""
            }`}
            onClick={focusDescInput}
          >
            <label htmlFor="description" className={styles["descLabel"]}>
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className={styles["descInput"]}
              ref={descInputRef}
            ></textarea>
            <p className={styles["count"]}>{description.length}/5000</p>
          </div>
        </form>
      </div>
      <div className={styles["col2"]}>
        <ImageUpload />
      </div>
    </div>
  );
};

export default Step1;
