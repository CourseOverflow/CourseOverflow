import React from "react";
import styles from "./Card.module.css";
import CardImage from "./CardImage";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const handleFeedClick = (id) => {
    const playlistId = String(id);
    navigate(`/play/${playlistId}`);
  };

  const watchPercentage = Math.floor(
    (props.data.watchedCount / props.data.videoCount) * 100
  );

  return (
    <div key={props.data.id} onClick={() => handleFeedClick(props.data.id)}>
      <CardImage
        image={props.data.thumbnail}
        likes={props.data.likes}
        dislikes={props.data.dislikes}
        isLiked={props.data.isLiked}
        isDisliked={props.data.isDisliked}
        isBookmarked={props.data.isBookmarked}
        watchPercentage={watchPercentage}
      />
      <div className={styles.cardDetails}>
        <h1 className={styles.title}>{props.data.title}</h1>
        <p className={styles.author}>{props.data.authorId}</p>
      </div>
    </div>
  );
};

export default Card;
