import React, { useRef } from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Feed = ({ category, data }) => {
  const feedContainerRef = useRef(null);
  const cardWidth = 320;

  const scrollLeft = () => {
    if (feedContainerRef.current) {
      const scrollAmount = cardWidth;
      feedContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (feedContainerRef.current) {
      const scrollAmount = cardWidth;
      feedContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.feed}>
      <h1>{category}</h1>
      <div className={styles["feed-container"]} ref={feedContainerRef}>
        <button className={styles.leftButton} onClick={scrollLeft}>
          <FaAngleLeft />
        </button>
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
        <button className={styles.rightButton} onClick={scrollRight}>
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Feed;
