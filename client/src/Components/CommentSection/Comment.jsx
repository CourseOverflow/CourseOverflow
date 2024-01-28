import React, { useState } from "react";
import styles from "./Comment.module.css";
import Reply from "./Reply";
import CommentFooter from "./CommentFooter";
import PostComment from "./PostComment";
import api from "../../Config/apiConfig.js";
import { useSelector } from "react-redux";

const Comment = ({
  comment,
  addReply,
  index,
  updateCommentInteraction,
  updateReplyInteraction,
}) => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  const replies = comment.thread;
  const [openReplies, setOpenReplies] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const toggleReply = () => {
    setOpenReply(!openReply);
  };

  const replyHandler = (text) => {
    addReply(index, text);
    setOpenReply(false);
    setOpenReplies(true);
  };

  const postLikeDislikeUpdate = (requestData) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    api.post(`comment/update-like-dislike`, requestData).catch((error) => {
      console.error("Error updating like/dislike: ", error);
    });
  };

  const likeHandler = () => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    const liked = comment.isLiked ? false : true;
    const newLikes = comment.isLiked ? -1 : 1;
    const newDislikes = comment.isDisliked ? -1 : 0;
    const requestData = {
      commentId: comment.id,
      isLiked: liked,
      isDisliked: false,
      newLikes: newLikes,
      newDislikes: newDislikes,
    };
    postLikeDislikeUpdate(requestData);
    updateCommentInteraction(index, liked, false, newLikes, newDislikes);
  };

  const dislikeHandler = () => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    const disliked = comment.isDisliked ? false : true;
    const newLikes = comment.isLiked ? -1 : 0;
    const newDislikes = comment.isDisliked ? -1 : 1;
    const requestData = {
      commentId: comment.id,
      isLiked: false,
      isDisliked: disliked,
      newLikes: newLikes,
      newDislikes: newDislikes,
    };
    postLikeDislikeUpdate(requestData);
    updateCommentInteraction(index, false, disliked, newLikes, newDislikes);
  };

  return (
    <div className={styles.comment}>
      <img
        src={comment.userProfile}
        alt="User Profile"
        className={styles["user-image"]}
      />
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
          likeHandler={likeHandler}
          dislikeHandler={dislikeHandler}
        />
        {openReply && <PostComment reply={true} addComment={replyHandler} />}

        {replies.length > 0 && (
          <button
            className={styles["reply-button"]}
            onClick={() => setOpenReplies(!openReplies)}
          >
            {openReplies ? "Hide Replies" : "Show Replies"}
          </button>
        )}
        {openReplies &&
          replies.map((reply, j) => (
            <Reply
              key={reply.id}
              i={index}
              j={j}
              reply={reply}
              updateReplyInteraction={updateReplyInteraction}
              postLikeDislikeUpdate={postLikeDislikeUpdate}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
