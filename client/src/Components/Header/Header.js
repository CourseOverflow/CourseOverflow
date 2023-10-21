import React from "react";
import CourseOverflow from "./CourseOverflow";
import SearchBar from "./SearchBar";
import User from "./User";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <nav className={`${styles.container} ${styles["dark-container"]}`}>
      <div className="px-1 py-3 flex justify-between items-center">
        <CourseOverflow toggleSidebar={props.toggleSidebar} />
        <SearchBar />
        <User username={"SlimeMaster"} />
      </div>
    </nav>
  );
};

export default Header;