import React from "react";
import Feed from "../Feed/Feed";
import styles from "./HomeFeed.module.css";

const HomeFeed = ({ feedList }) => {
  return (
    <div className={styles.homeFeedContainer}>
      {feedList.map((feed) => (
        <div key={feed.id}>
          <Feed
            category={feed.category}
            data={feed.data}
            isDraft={feed.isDraft}
          />
          <hr className={styles.hrLine} />
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;
