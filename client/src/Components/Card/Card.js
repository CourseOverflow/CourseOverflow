import React from "react";
import styles from "./Card.module.css";
import CardFooter from "./CardFooter";
import { FaPlay } from "react-icons/fa";
const Card = (props) => {
  const cardStyle = {
    backgroundImage: `url(${props.data.image}})`,
  };
  const clickHandler = () => {
    console.log("Card clicked, Play!");
  };
  const percentageWatched = props.data.watchPercentage;
  const hrWidth = `${percentageWatched}%`;
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage} style={cardStyle}></div>
        <div className={styles.cardContent} onClick={clickHandler}>
          <FaPlay className="text-3xl bg-transparent" />
        </div>
        <CardFooter likes={true} disliked={false} bookmarked={true} />
        <hr className={styles.cardHr} style={{ width: hrWidth }} />
      </div>
      <h1 className={styles.title}>{props.data.title}</h1>
      <p className={styles.author}>{props.data.author}</p>
    </>
  );
};

export default Card;
