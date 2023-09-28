import React from "react";
import Card from "../Card/Card";
import styles from "./Feed.module.css";

const Feed = (props) => {
  return (
    <div className={styles.feed}>
      <h1>{props.category}</h1>
      <ul className={styles["feed-container"]}>
        {props.data.map((item) => {
          return (
            <li>
              <Card
                isDark={props.isDark}
                title={item.title}
                description={item.description}
                path={"/"}
                image={item.image}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Feed;
