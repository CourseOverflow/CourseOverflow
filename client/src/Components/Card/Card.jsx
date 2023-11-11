// Card.js
import React from "react";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const handleFeedClick = (id) => {
    const playlistId = String(id); // Convert id to string format if in other format
    navigate(`/playlist/${playlistId}`);
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
      <CardInfo title={props.data.title} author={props.data.author} />
    </div>
  );
};

export default Card;
