import React, { useState, useEffect } from "react";
import styles from "./PostComment.module.css";
import { useSelector } from "react-redux";

const PostComment = (props) => {
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  const imgSrc = user
    ? user.profilePicture
    : process.env.PUBLIC_URL + "/logo.png";

  useEffect(() => {
    setCharCount(comment.length);
  }, [comment]);

  const handleInput = (e) => {
    if (e.target.value.length <= 500) {
      setComment(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.addComment(comment);
    setComment("");
  };

  return (
    <div className={styles["post-comment"]}>
      <img
        src={imgSrc}
        alt="User"
        className={`${styles["user-image"]} ${props.reply && styles.reply}`}
      />
      <form className={styles["user-input"]} onSubmit={submitHandler}>
        <div className={styles["input-area"]}>
          <textarea
            placeholder={`Add a comment`}
            className={styles["comment-input"]}
            value={comment}
            onChange={handleInput}
          />
          <div className={styles["char-count"]}>{charCount}/500</div>
        </div>
        <button className={styles["post-button"]}>Post</button>
      </form>
    </div>
  );
};

export default PostComment;
