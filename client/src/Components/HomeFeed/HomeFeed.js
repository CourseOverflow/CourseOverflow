import React from "react";
import styles from "./HomeFeed.module.css";
import Feed from "../Feed/Feed";

const HomeFeed = (props) => {
  return (
    <div className="pt-10">
      <Feed category="Popular" data={props.data} isDark={props.isDark} />
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <Feed category="Popular" data={props.data} isDark={props.isDark} />
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <Feed category="Popular" data={props.data} isDark={props.isDark} />
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};

export default HomeFeed;
