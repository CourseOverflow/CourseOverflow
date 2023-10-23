// Card.js
import React from "react";
import CardImage from "./CardImage";
import CardInfo from "./CardInfo";

const Card = (props) => {
  const watchPercentage = Math.floor(
    (props.data.watchedCount / props.data.videoCount) * 100
  );
  return (
    <div>
      <CardImage
        image={props.data.image}
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
