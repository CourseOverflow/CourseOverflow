import React from "react";
import { AiFillRightCircle } from "react-icons/ai";
import styles from "./FeedBtn.module.css";

const FeedRightBtn = ({
  rightScrollPosition,
  setrightScrollPosition,
  feedContainerRef,
}) => {
  const sidebarOpen = false;

  const feedRightBtnClass =
    rightScrollPosition >= 100 ? styles["feed-btn-right"] : styles["d-none"];

  const handleRightButtonClick = () => {
    const scrollContainer = feedContainerRef.current;
    const currentScrollPosition = scrollContainer.scrollLeft;
    const newScrollPosition = currentScrollPosition + 306; // Scroll 300 pixels to the right

    const scrollOptions = {
      left: newScrollPosition,
      behavior: "smooth", // Add smooth behavior for animation
    };

    // Use scrollTo method with animation
    if (scrollContainer) {
      scrollContainer.scrollTo(scrollOptions);
    }

    setrightScrollPosition(newScrollPosition);
  };

  return (
    <button
      className={`${feedRightBtnClass} ${
        sidebarOpen ? styles["feed-btn-right-shift"] : ""
      }`}
      onClick={handleRightButtonClick}
    >
      <AiFillRightCircle /> {/* Use the right arrow icon */}
    </button>
  );
};

export default FeedRightBtn;
