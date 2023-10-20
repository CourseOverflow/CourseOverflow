// CardImage.js
import React from "react";
import styles from "./Card.module.css";
import CardFooter from "./CardFooter";
import { FaPlay } from "react-icons/fa";

const CardImage = (props) => {
  const cardStyle = {
    backgroundImage: `url(${props.image})`, // Fixed the image prop
  };

  const clickHandler = () => {
    console.log("Card clicked, Play!");
  };

  const percentageWatched = props.watchPercentage;
  const hrWidth = `${percentageWatched}%`;

  return (
    <div className={styles.card}>
      <div className={styles.cardImage} style={cardStyle}></div>
      <div className={styles.cardContent} onClick={clickHandler}>
        <FaPlay className="text-3xl bg-transparent" />
      </div>
      <CardFooter
        isLiked={props.isLiked}
        isDisliked={props.isDisliked}
        isBookmarked={props.isBookmarked} // Fixed the prop name
        likesCount={props.likes}
        dislikesCount={props.dislikes} // Fixed the prop name
      />
      <hr className={styles.cardHr} style={{ width: hrWidth }} />
    </div>
  );
};

export default CardImage;
