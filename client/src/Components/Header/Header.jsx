import React from "react";
import CourseOverflow from "./CourseOverflow";
import SearchBar from "./SearchBar";
import User from "./User";
import styles from "./Header.module.css";
import { IoRocketSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <nav className={`${styles.container}`}>
      <CourseOverflow
        isAboutPage={props.isAboutPage}
        toggleSidebar={props.toggleSidebar}
        closeSidebar={props.closeSidebar}
      />
      {!props.isAboutPage ? (
        <>
          <SearchBar /> <User />
        </>
      ) : (
        <>
          <div className={`${styles.btnGrp}`}>
            <button
              onClick={() => navigate("/")}
              className={`${styles.glowBtn}`}
            >
              <span className={`${styles.btnIcon}`}>
                <IoRocketSharp />
              </span>
              &nbsp; Explore Playlist
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
