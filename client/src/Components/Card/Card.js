import React from "react";
import styles from "./Card.module.css";
import CardFooter from "./CardFooter";
import { FaPlay } from "react-icons/fa";
const Card = (props) => {
  const cardStyle = {
    backgroundImage: `url(https://images.unsplash.com/photo-1614090332617-e7dd5bd107e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMHJhdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80)`,
  };
  const clickHandler = () => {
    console.log("Card clicked, Play!");
  };
  const percentageWatched = 64;
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
