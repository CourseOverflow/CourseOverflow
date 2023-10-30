import React from "react";
import { AiFillLeftCircle } from "react-icons/ai";
import styles from "./FeedBtn.module.css";

const FeedLeftBtn = ({
  leftScrollPosition,
  setleftScrollPosition,
  feedContainerRef,
}) => {
  const sidebarOpen = false;
  const feedLeftBtnClass =
    leftScrollPosition >= 100 ? styles["feed-btn-left"] : styles["d-none"];

  const handleLeftButtonClick = () => {
    const scrollContainer = feedContainerRef.current;
    const newleftScrollPosition = leftScrollPosition - 306;

    const scrollOptions = {
      left: newleftScrollPosition,
      behavior: "smooth", // Add smooth behavior for animation
    };

    // Use scrollTo method with animation
    if (scrollContainer) {
      scrollContainer.scrollTo(scrollOptions);
    }

    setleftScrollPosition(newleftScrollPosition);
  };

  return (
    <button
      className={`${feedLeftBtnClass} ${
        sidebarOpen ? styles["feed-btn-left-shift"] : ""
      }`}
      onClick={handleLeftButtonClick}
    >
      <AiFillLeftCircle />
    </button>
  );
};

export default FeedLeftBtn;
