import React, { useRef } from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Feed = ({ category, data, isDraft }) => {
  const feedContainerRef = useRef(null);
  const cardWidth = 295;

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
      {data.length ? (
        <div className={styles.container}>
          <button className={styles.leftButton} onClick={scrollLeft}>
            <FaAngleLeft />
          </button>

          <div className={styles["feed-container"]} ref={feedContainerRef}>
            {data.map((item) => (
              <Card key={item.id} data={item} isDraft={isDraft} />
            ))}
          </div>

          <button className={styles.rightButton} onClick={scrollRight}>
            <FaAngleRight />
          </button>
        </div>
      ) : (
        <div className={styles.noData}>No data</div>
      )}
    </div>
  );
};

export default Feed;
