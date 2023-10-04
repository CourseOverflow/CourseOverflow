import React from "react";
import styles from "./CommentFooter.module.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const CommentFooter = (props) => {
  return (
    <div className={styles["comment-footer"]}>
      <FaThumbsUp className={styles.icon} />
      <p>{props.likes}21</p>
      <FaThumbsDown className={styles.icon} />
      <p>{props.dislikes}4</p>
      {props.mainComment && <button onClick={props.toggleReply}>Reply</button>}
    </div>
  );
};

export default CommentFooter;
