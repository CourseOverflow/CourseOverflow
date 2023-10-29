import React from "react";
import styles from "./CommentFooter.module.css";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";

const CommentFooter = (props) => {
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
    <div className={styles["comment-footer"]}>
      {props.isLiked ? (
        <FaThumbsUp className="m-1 bg-transparent" onClick={likeClickHandler} />
      ) : (
        <FaRegThumbsUp
          className="m-1 bg-transparent"
          onClick={likeClickHandler}
        />
      )}
      <p>{props.likes}</p>
      {props.isDisliked ? (
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
      <p>{props.dislikes}</p>
      {props.mainComment && <button onClick={props.toggleReply}>Reply</button>}
    </div>
  );
};

export default CommentFooter;
