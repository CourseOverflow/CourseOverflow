import React, { useEffect, useState, useRef } from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import FeedLeftBtn from "./FeedLeftBtn";
import FeedRightBtn from "./FeedRightBtn";

const Feed = (props) => {
  const { sidebarOpen } = useGlobalState();
  const [leftScrollPosition, setleftScrollPosition] = useState(0);
  const [rightScrollPosition, setrightScrollPosition] = useState(0);
  const feedContainerRef = useRef(null);

  useEffect(() => {
    const updateMaxWidth = () => {
      let sidebarWidth = sidebarOpen ? 300 : 150;
      let screenWidth = window.innerWidth - sidebarWidth;
      if (window.innerWidth <= 600) {
        screenWidth += 100;
      }

      // Set the maxWidth for the feed container
      if (feedContainerRef.current) {
        feedContainerRef.current.style.maxWidth = `${screenWidth}px`;
      }
    };

    const handleScroll = () => {
      if (feedContainerRef.current) {
        const container = feedContainerRef.current;
        const newleftScrollPosition = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const scrollableWidth = container.scrollWidth - containerWidth;
        const newrightScrollPosition = scrollableWidth - newleftScrollPosition;

        setleftScrollPosition(newleftScrollPosition);
        setrightScrollPosition(newrightScrollPosition);
      }
    };
    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);

    if (feedContainerRef.current) {
      feedContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", updateMaxWidth);

      if (feedContainerRef.current) {
        feedContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sidebarOpen]);

  return (
    <div className={styles.feed}>
      <h1>{props.category}</h1>

      <div className={styles["feed-container"]} ref={feedContainerRef}>
        <FeedLeftBtn
          leftScrollPosition={leftScrollPosition}
          setleftScrollPosition={setleftScrollPosition}
          feedContainerRef={feedContainerRef}
        />
        {props.data.map((item) => (
          <div key={item.id}>
            <Card data={item} />
          </div>
        ))}
        <FeedRightBtn
          rightScrollPosition={rightScrollPosition}
          setrightScrollPosition={setrightScrollPosition}
          feedContainerRef={feedContainerRef}
        />
      </div>
    </div>
  );
};

export default Feed;
