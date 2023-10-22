import React from "react";
import styles from "./Replies.module.css";
import CommentFooter from "./CommentFooter";

const Replies = (props) => {
  return props.replies.map((reply) => (
    <div className={styles.replies} key={props.replies.id}>
      <img src="images/logo.png" alt="User" className={styles["user-image"]} />
      <div className={styles["reply-details"]}>
        <h1 className={styles["reply-name"]}>{reply.name}</h1>
        <p className={styles["reply-text"]}>{reply.text}</p>
        <CommentFooter mainComment={false} />
      </div>
    </div>
  ));
};

export default Replies;
