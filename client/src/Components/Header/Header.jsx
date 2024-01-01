import React from "react";
import CourseOverflow from "./CourseOverflow";
import SearchBar from "./SearchBar";
import User from "./User";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <nav className={`${styles.container}`}>
      <CourseOverflow
        isAboutPage={props.isAboutPage}
        toggleSidebar={props.toggleSidebar}
        closeSidebar={props.closeSidebar}
      />
      {!props.isAboutPage ? (
        <>
          <SearchBar /> <User username={"SlimeMaster"} />
        </>
      ) : (
        <>
          <div className={`${styles.btnGrp}`}>
            <button className={`${styles.glowBtn}`}> Sign up</button>
            <button className={`${styles.glowBtn}`}> Contact us</button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
