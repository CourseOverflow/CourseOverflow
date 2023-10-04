import React from "react";
import styles from "./CommentSection.module.css";
import PostComment from "./PostComment";
import Comment from "./Comment";

const Comments = (props) => {
  const addComment = (event) => {
    console.log(event);
  };

  const addReply = (reply) => {
    console.log(reply);
  };

  return (
    <div className={`${styles.comments} ${!props.overflow && "ml-5 mr-5"}`}>
      <h1 className={styles.heading}>435 Comments</h1>
      <PostComment reply={false} addComment={addComment} />
      {props.comments.map((comment) => {
        return (
          <>
            <hr />
            <Comment comment={comment} replyHandler={addReply} />
          </>
        );
      })}
    </div>
  );
};

export default Comments;
