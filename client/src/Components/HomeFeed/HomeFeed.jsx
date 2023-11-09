import React from "react";
import Feed from "../Feed/Feed";
import styles from "./HomeFeed.module.css";

const HomeFeed = (props) => {
  return (
    <div className={styles.homeFeedContainer}>
      <Feed
        category="Popular"
        data={props.data}
        sidebarOpen={props.sidebarOpen}
      />
      <hr className={styles.hrLine} />
      <Feed
        category="Recently Uploaded"
        data={props.data}
        sidebarOpen={props.sidebarOpen}
      />
      <hr className={styles.hrLine} />
      <Feed
        category="Recommended for you"
        data={props.data}
        sidebarOpen={props.sidebarOpen}
      />
      <hr className={styles.hrLine} />
    </div>
  );
};

export default HomeFeed;
