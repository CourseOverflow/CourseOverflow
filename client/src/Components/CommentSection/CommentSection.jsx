import React, { useState } from "react";
import styles from "./CommentSection.module.css";
import PostComment from "./PostComment";
import Comment from "./Comment";
import api from "../../Config/apiConfig.js";
import useAlerts from "../../Hooks/useAlerts";

const CommentSection = (props) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const username = user?.username || "Guest";
  const userProfile =
    user?.profilePicture || process.env.PUBLIC_URL + "/logo.png";
  const [comments, setComments] = useState(props.comments);
  const { addAlert } = useAlerts();

  const addComment = async (text) => {
    if (!user) {
      addAlert("Warning", "You need to be logged in to post comments");
      return;
    }
    const requestData = {
      playlistId: props.playlistId,
      commentId: null,
      text: text,
    };
    await api
      .post("comment/post", requestData)
      .then((response) => {
        const modifiedResponse = {
          ...response.data,
          username: username,
          userProfile: userProfile,
          thread: [],
        };
        setComments([modifiedResponse, ...comments]);
        addAlert("Success", "Comment posted successfully");
      })
      .catch(() => {
        addAlert("Error", "Error posting comment");
      });
  };

  const addReply = async (index, text) => {
    if (!user) {
      addAlert("Warning", "You need to be logged in to post replies");
      return;
    }
    const requestData = {
      playlistId: props.playlistId,
      commentId: comments[index].id,
      text: text,
    };
    await api
      .post("comment/post", requestData)
      .then((response) => {
        const modifiedResponse = {
          ...response.data,
          username: username,
          userProfile: userProfile,
        };
        const newComments = [...comments];
        newComments[index].thread = [
          modifiedResponse,
          ...newComments[index].thread,
        ];
        setComments(newComments);
        addAlert("Success", "Reply posted successfully");
      })
      .catch(() => {
        addAlert("Error", "Error posting reply");
      });
  };

  const updateCommentInteraction = (
    i,
    liked,
    disliked,
    newLikes,
    newDislikes,
  ) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    const newComments = [...comments];
    newComments[i] = {
      ...newComments[i],
      isLiked: liked,
      isDisliked: disliked,
      likes: newComments[i].likes + newLikes,
      dislikes: newComments[i].dislikes + newDislikes,
    };
    setComments(newComments);
  };

  const updateReplyInteraction = (
    i,
    j,
    liked,
    disliked,
    newLikes,
    newDislikes,
  ) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    const newComments = [...comments];
    newComments[i].thread[j] = {
      ...newComments[i].thread[j],
      isLiked: liked,
      isDisliked: disliked,
      likes: newComments[i].thread[j].likes + newLikes,
      dislikes: newComments[i].thread[j].dislikes + newDislikes,
    };
    setComments(newComments);
  };

  return (
    <div className={styles.comments}>
      <h1 className={styles.heading}>{comments.length} Comments</h1>
      <PostComment addComment={addComment} />
      {comments.map((comment, index) => (
        <div className="bg-transparent" key={comment.id}>
          <hr />
          <Comment
            comment={comment}
            addReply={addReply}
            index={index}
            updateCommentInteraction={updateCommentInteraction}
            updateReplyInteraction={updateReplyInteraction}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
