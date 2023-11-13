import React from "react";
import Feed from "../Feed/Feed";
import styles from "./HomeFeed.module.css";

const HomeFeed = ({
  recommendedPlaylistData,
  popularPlaylistData,
  recentUploadsPlaylistData,
  sidebarOpen,
}) => {
  return (
    <div className={styles.homeFeedContainer}>
      <Feed
        category="Recommended for you"
        data={recommendedPlaylistData}
        sidebarOpen={sidebarOpen}
      />
      <hr className={styles.hrLine} />
      <Feed
        category="Popular"
        data={popularPlaylistData}
        sidebarOpen={sidebarOpen}
      />
      <hr className={styles.hrLine} />
      <Feed
        category="Recently Uploaded"
        data={recentUploadsPlaylistData}
        sidebarOpen={sidebarOpen}
      />
      <hr className={styles.hrLine} />
    </div>
  );
};

export default HomeFeed;
