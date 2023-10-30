import React from "react";
import CourseOverflow from "./CourseOverflow";
import SearchBar from "./SearchBar";
import User from "./User";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <nav className={`${styles.container}`}>
      <CourseOverflow toggleSidebar={props.toggleSidebar} closeSidebar={props.closeSidebar}/>
      <SearchBar />
      <User username={"SlimeMaster"} />
    </nav>
  );
};

export default Header;
