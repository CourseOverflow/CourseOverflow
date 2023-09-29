import React from "react";
import Feed from "../Feed/Feed";
const HomeFeed = (props) => {
  return (
    <div>
      <Feed
        data={props.data}
        category="Trending"
        sidebarOpen={props.sidebarOpen}
      />
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </div>
  );
};

export default HomeFeed;
