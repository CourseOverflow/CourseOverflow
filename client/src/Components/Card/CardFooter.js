import React from "react";
import styles from "./CardFooter.module.css";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

const CardFooter = (props) => {
  const bookmarkClickHandler = () => {
    console.log("Bookmark clicked!");
  };
  const likeClickHandler = () => {
    console.log("Like clicked!");
  };
  const dislikeClickHandler = () => {
    console.log("Dislike clicked!");
  };
  return (
    <div className={styles.cardFooter}>
      <div className={styles.likesDislikes}>
        {props.liked ? (
          <FaRegThumbsUp
            className="m-1 bg-transparent"
            onClick={likeClickHandler}
          />
        ) : (
          <FaThumbsUp
            className="m-1 bg-transparent"
            onClick={likeClickHandler}
          />
        )}
        420
        {props.disliked ? (
          <FaThumbsDown
            className="m-1 ml-3 bg-transparent"
            onClick={dislikeClickHandler}
          />
        ) : (
          <FaRegThumbsDown
            className="m-1 ml-3 bg-transparent"
            onClick={dislikeClickHandler}
          />
        )}
        69
      </div>
      <button className={styles.bookmarks}>
        {props.bookmarked ? (
          <FaBookmark
            className="mt-1 bg-transparent"
            onClick={bookmarkClickHandler}
          />
        ) : (
          <FaRegBookmark
            className="mt-1 bg-transparent"
            onClick={bookmarkClickHandler}
          />
        )}
      </button>
    </div>
  );
};

export default CardFooter;
