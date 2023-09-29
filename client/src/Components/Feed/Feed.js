import React, { useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

const Feed = (props) => {
  const { sidebarOpen } = useGlobalState();

  useEffect(() => {
    // Get a reference to the .feed-container element using a ref
    const feedContainer = document.querySelector(
      `.${styles["feed-container"]}`
    );

    // Update the max-width of the .feed-container to match the screen width
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

    // Call the updateMaxWidth function initially and whenever the window is resized
    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, [sidebarOpen]); // Include sidebarOpen as a dependency

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

        {props.data.map((item) => (
          <div key={item.id}>
            {" "}
            {/* Add a key to each mapped element */}
            <Card
              isDark={props.isDark}
              title={item.title}
              description={item.description}
              path={"/"}
              image={item.image}
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
