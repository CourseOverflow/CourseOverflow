import React from "react";
import styles from "./CommentFooter.module.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const CommentFooter = (props) => {
  return (
    <div className={styles["comment-footer"]}>
      <FaThumbsUp
        className={`${styles.icon} ${props.isLiked && styles.selected}`}
        onClick={props.likeHandler}
      />
      <p>{props.likes}</p>
      <FaThumbsDown
        className={`${styles.icon} ${props.isDisliked && styles.selected}`}
        onClick={props.dislikeHandler}
      />
      <p>{props.dislikes}</p>
      {props.mainComment && <button onClick={props.toggleReply}>Reply</button>}
    </div>
  );
};

export default CommentFooter;
