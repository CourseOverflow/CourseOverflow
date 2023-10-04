import React, { useState } from "react";
import styles from "./Comment.module.css";
import Replies from "./Replies";
import CommentFooter from "./CommentFooter";
import PostComment from "./PostComment";

const Comment = (props) => {
  const [openReplies, setOpenReplies] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const toggleReply = (reply) => {
    setOpenReply(!openReply);
  };

  const replyHandler = (reply) => {
    setOpenReply(!openReply);
    props.replyHandler(reply);
  };

  return (
    <div className={styles.comment} key={props.comment.id}>
      <img src="images/logo.png" alt="User" className={styles["user-image"]} />
      <div className={styles["comment-details"]}>
        <h1 className={styles["user-name"]}>{props.comment.name}</h1>
        <p className={styles["comment-text"]}>{props.comment.text}</p>
        <CommentFooter mainComment={true} toggleReply={toggleReply} />
        {openReply && <PostComment reply={true} addComment={replyHandler} />}

        {props.comment.thread && props.comment.thread.length > 0 && (
          <button
            className={styles["reply-button"]}
            onClick={() => setOpenReplies(!openReplies)}
          >
            {openReplies ? "Hide Replies" : "View Replies"}
          </button>
        )}
        {openReplies && <Replies replies={props.comment.thread} />}
      </div>
    </div>
  );
};

export default Comment;
