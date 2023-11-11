// Card.js
import React from "react";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const createSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-");
  };

  const handleFeedClick = (title, id) => {
    const stringId = String(id); // Convert id to string format if in other format
    const slug = createSlug(title) + "-" + stringId;
    navigate(`/playlist/${slug}`);
  };

  const watchPercentage = Math.floor(
    (props.data.watchedCount / props.data.videoCount) * 100
  );

  return (
    <div
      key={props.data.id}
      onClick={() => handleFeedClick(props.data.title, props.data.id)}
    >
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
