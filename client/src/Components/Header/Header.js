import React from "react";
import CourseOverflow from "./CourseOverflow";
import SearchBar from "./SearchBar";
import User from "./User";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={`${styles.container} ${styles["dark-container"]}`}>
      <div className="container mx-auto px-1 py-3 flex justify-between items-center">
        <CourseOverflow />
        <SearchBar />
        <User username={"SlimeMaster"} />
      </div>
    </nav>
  );
};

export default Header;
