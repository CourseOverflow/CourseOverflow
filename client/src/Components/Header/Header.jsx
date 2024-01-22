import React from "react";
import CourseOverflow from "./CourseOverflow";
import SearchBar from "./SearchBar";
import User from "./User";
import styles from "./Header.module.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const exploreBtn = (e) => {
    e.preventDefault();
    navigate(`/`);
  };

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
            {/* Remove the parentheses after exploreBtn */}
            <button onClick={exploreBtn} className={`${styles.glowBtn}`}>
              <span className={`${styles.btnIcon}`}>
                <FaArrowAltCircleRight />
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
