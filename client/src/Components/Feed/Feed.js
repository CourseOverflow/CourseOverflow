import React, { useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

const Feed = (props) => {
  const { sidebarOpen } = useGlobalState();

  useEffect(() => {
    const feedContainer = document.querySelector(
      `.${styles["feed-container"]}`
    );

    function updateMaxWidth() {
      let sidebarWidth = 0;
      if (sidebarOpen) {
        sidebarWidth = 300;
      } else {
        sidebarWidth = 150;
      }

      let screenWidth = window.innerWidth - sidebarWidth;
      if (window.innerWidth <= 600) {
        screenWidth += 100;
      }
      feedContainer.style.maxWidth = `${screenWidth}px`;
    }

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);

    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, [sidebarOpen]);

  return (
    <div className={styles.feed}>
      <h1>{props.category}</h1>

      <div className={styles["feed-container"]}>
        <button
          className={`${styles["feed-btn-left"]} ${
            sidebarOpen ? styles["feed-btn-left-shift"] : ""
          }`}
        >
          <AiFillLeftCircle />
        </button>
        <div className={`${styles["dummy-padding"]}`}></div>
        {props.data.map((item) => (
          <div key={item.id}>
            {" "}
            <Card
              data={item}
            />
          </div>
        ))}
        <button className={styles["feed-btn-right"]}>
          <AiFillRightCircle />
        </button>
      </div>
    </div>
  );
};

export default Feed;
