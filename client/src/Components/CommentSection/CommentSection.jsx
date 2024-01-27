import React, { useState } from "react";
import styles from "./CommentSection.module.css";
import PostComment from "./PostComment";
import Comment from "./Comment";
import axios from "axios";
import baseURL from "../../Config/apiConfig";
import { useSelector } from "react-redux";

const CommentSection = (props) => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const userId = user?.id || 1;
  const username = user?.username || "Guest";

  const userProfile = process.env.PUBLIC_URL + "/logo.png";

  const [comments, setComments] = useState(props.comments);

  const addComment = (text) => {
    const requestData = {
      userId: userId,
      playlistId: props.playlistId,
      commentId: null,
      text: text,
    };
    axios
      .post(`${baseURL}/api/comment/post/`, requestData)
      .then((response) => {
        const modifiedResponse = {
          ...response.data,
          username: username,
          userProfile: userProfile,
          thread: [],
        };
        setComments([modifiedResponse, ...comments]);
      })
      .catch((error) => {
        console.error("Error posting comment: ", error);
      });
  };

  const addReply = (index, text) => {
    const requestData = {
      userId: userId,
      playlistId: props.playlistId,
      commentId: comments[index].id,
      text: text,
    };
    axios
      .post(`${baseURL}/api/comment/post/`, requestData)
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
      })
      .catch((error) => {
        console.error("Error posting reply: ", error);
      });
  };

  const updateCommentInteraction = (
    i,
    liked,
    disliked,
    newLikes,
    newDislikes
  ) => {
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
    newDislikes
  ) => {
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
