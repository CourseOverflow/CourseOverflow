import React from "react";
import styles from "./BookmarkList.module.css";
import { useNavigate } from "react-router-dom";

const BookmarkList = ({ bookmarks, setIsOpen }) => {
  const navigate = useNavigate();

  const handleClick = (bookmark) => {
    setIsOpen(false);
    navigate(`/play?playlistId=${bookmark.id}&index=${bookmark.lastWatched}`);
  };

  return (
    <div className={styles.container}>
      {bookmarks.map((bookmark, index) => (
        <button
          onClick={() => handleClick(bookmark)}
          key={index}
          className={styles.bookmarkItem}
        >
          {bookmark.title}
        </button>
      ))}
    </div>
  );
};

export default BookmarkList;
