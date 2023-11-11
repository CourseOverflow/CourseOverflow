import React, { useState } from "react";
import styles from "./Comment.module.css";
import Replies from "./Replies";
import CommentFooter from "./CommentFooter";
import PostComment from "./PostComment";

const Comment = ({ comment, replyHandler }) => {
  const [openReplies, setOpenReplies] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const toggleReply = (reply) => {
    setOpenReply(!openReply);
  };

  return (
    <div className={styles.comment} key={comment.id}>
      <img src={comment.userProfile} alt="User Profile" className={styles["user-image"]} />
      <div className={styles["comment-details"]}>
        <h1 className={styles["user-name"]}>{comment.username}</h1>
        <p className={styles["comment-text"]}>{comment.text}</p>
        <CommentFooter
          isLiked={comment.isLiked}
          isDisliked={comment.isDisliked}
          likes={comment.likes}
          dislikes={comment.dislikes}
          mainComment={true}
          toggleReply={toggleReply}
        />
        {openReply && <PostComment reply={true} addComment={replyHandler} />}

        {comment.thread && comment.thread.length > 0 && (
          <button
            className={styles["reply-button"]}
            onClick={() => setOpenReplies(!openReplies)}
          >
            {openReplies ? "Hide Replies" : "View Replies"}
          </button>
        )}
        {openReplies && <Replies replies={comment.thread} />}
      </div>
    </div>
  );
};

export default Comment;
