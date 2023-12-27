import React from "react";
import styles from "./Reply.module.css";
import CommentFooter from "./CommentFooter";

const Reply = ({
  i,
  j,
  reply,
  updateReplyInteraction,
  postLikeDislikeUpdate,
}) => {
  const userId = 2;

  const likeHandler = () => {
    const liked = reply.isLiked ? false : true;
    const newLikes = reply.isLiked ? -1 : 1;
    const newDislikes = reply.isDisliked ? -1 : 0;
    const requestData = {
      userId: userId,
      commentId: reply.id,
      isLiked: liked,
      isDisliked: false,
      newLikes: newLikes,
      newDislikes: newDislikes,
    };
    postLikeDislikeUpdate(requestData);
    updateReplyInteraction(i, j, liked, false, newLikes, newDislikes);
  };

  const dislikeHandler = () => {
    const disliked = reply.isDisliked ? false : true;
    const newLikes = reply.isLiked ? -1 : 0;
    const newDislikes = reply.isDisliked ? -1 : 1;
    const requestData = {
      userId: userId,
      commentId: reply.id,
      isLiked: false,
      isDisliked: disliked,
      newLikes: newLikes,
      newDislikes: newDislikes,
    };
    postLikeDislikeUpdate(requestData);
    updateReplyInteraction(i, j, false, disliked, newLikes, newDislikes);
  };

  return (
    <div className={styles.reply}>
      <img
        src={reply.userProfile}
        alt="User"
        className={styles["user-image"]}
      />
      <div className={styles["reply-details"]}>
        <h1 className={styles["reply-name"]}>{reply.username}</h1>
        <p className={styles["reply-text"]}>{reply.text}</p>
        <CommentFooter
          mainComment={false}
          isLiked={reply.isLiked}
          isDisliked={reply.isDisliked}
          likes={reply.likes}
          dislikes={reply.dislikes}
          likeHandler={likeHandler}
          dislikeHandler={dislikeHandler}
        />
      </div>
    </div>
  );
};

export default Reply;
