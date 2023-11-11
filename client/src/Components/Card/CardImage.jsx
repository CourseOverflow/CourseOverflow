// CardImage.js
import React from "react";
import styles from "./Card.module.css";
import CardFooter from "./CardFooter";
import { FaPlay } from "react-icons/fa";

const CardImage = (props) => {
  const cardStyle = {
    backgroundImage: `url(${props.image})`,
  };

  const clickHandler = () => {
    console.log("Card clicked, Play!");
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage} style={cardStyle}></div>
      <div className={styles.cardContent} onClick={clickHandler}>
        <FaPlay className="text-3xl bg-transparent" />
      </div>
      <CardFooter
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
