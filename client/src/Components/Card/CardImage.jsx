import React from "react";
import styles from "./CardImage.module.css";
import CardFooter from "./CardFooter";
import { FaPlay } from "react-icons/fa";

const CardImage = (props) => {
  const cardStyle = {
    backgroundImage: `url(${props.image})`,
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage} style={cardStyle}></div>
      <div className={styles.cardContent} onClick={props.handleFeedClick}>
        <FaPlay className="text-3xl bg-transparent" />
      </div>
      <CardFooter
        id={props.id}
        isLiked={props.isLiked}
        isDisliked={props.isDisliked}
        isBookmarked={props.isBookmarked}
        likesCount={props.likes}
        dislikesCount={props.dislikes}
      />
      <hr
        className={styles.cardHr}
        style={{ width: `${props.watchPercentage}%` }}
      />
    </div>
  );
};

export default CardImage;
