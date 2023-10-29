import React from "react";
import styles from "./Replies.module.css";
import CommentFooter from "./CommentFooter";
import UserData from "../../Data/UserData";

const Replies = (props) => {
  return props.replies.map((reply) => (
    <div className={styles.replies} key={props.replies.id}>
      <img src="images/logo.png" alt="User" className={styles["user-image"]} />
      <div className={styles["reply-details"]}>
        <h1 className={styles["reply-name"]}>{UserData[0].name}</h1>
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
