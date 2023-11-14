import React from "react";
import styles from "./CommentSection.module.css";
import PostComment from "./PostComment";
import Comment from "./Comment";

const CommentSection = (props) => {
  const addComment = (event) => {
    console.log(event);
  };

  const addReply = (reply) => {
    console.log(reply);
  };

  return (
    <div className={styles.comments}>
      <h1 className={styles.heading}>{props.comments.length} Comments</h1>
      <PostComment reply={false} addComment={addComment} />
      {props.comments.map((comment) => (
        <div className="bg-transparent" key={comment.id}>
          <hr />
          <Comment comment={comment} replyHandler={addReply} />
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
