import React from "react";
import styles from "./Replies.module.css";
import CommentFooter from "./CommentFooter";

const Replies = ({ replies }) => {
  return replies.map((reply) => (
    <div className={styles.replies} key={reply.id}>
      <img src={reply.userProfile} alt="User" className={styles["user-image"]} />
      <div className={styles["reply-details"]}>
        <h1 className={styles["reply-name"]}>{reply.username}</h1>
        <p className={styles["reply-text"]}>{reply.text}</p>
        <CommentFooter
          mainComment={false}
          isLiked={reply.isLiked}
          isDisliked={reply.isDisliked}
          likes={reply.likes}
          dislikes={reply.dislikes}
        />
      </div>
    </div>
  ));
};

export default Replies;
