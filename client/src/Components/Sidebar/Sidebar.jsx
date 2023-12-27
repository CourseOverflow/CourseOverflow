import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaHome, FaPlus, FaBookmark, FaPlay, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdOutlinePlaylistPlay } from "react-icons/md";

const Sidebar = (props) => {
  const location = useLocation();
  const userBookmarks = [
    {
      name: "Playlist 1",
      to: "/playlist1",
      icon: <MdOutlinePlaylistPlay />,
    },
    {
      name: "Playlist 2",
      to: "/playlist2",
      icon: <MdOutlinePlaylistPlay />,
    },
    {
      name: "Playlist 3",
      to: "/playlist3",
      icon: <MdOutlinePlaylistPlay />,
    },
  ];
  const menuItem = [
    {
      name: "Home",
      to: "/CourseOverflow",
      icon: <FaHome />,
    },
    {
      name: "Create",
      to: "/create",
      icon: <FaPlus />,
    },
    {
      name: "Play",
      to: "/play?playlistId=44&index=0",
      icon: <FaPlay />,
    },
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <FaUser />,
    },
  ];

  const bookmark = {
    name: "Bookmark",
    to: "/",
    icon: <FaBookmark />,
    ...userBookmarks,
  };

  return (
    <div
      className={`${styles.sidebar} ${
        props.isOpen ? styles["sidebar-open"] : styles["sidebar-close"]
      }`}
    >
      <div className={styles["sidebar-item-container"]}>
        {menuItem.map((item, index) => (
          <NavLink
            onClick={() => {
              props.setIsOpen(false);
            }}
            to={item.to}
            key={index}
            className={
              location.pathname === item.to
                ? `${styles.active} ${styles.link}`
                : styles.link
            }
          >
            <div className={styles.icon}>{item.icon}</div>
            <div
              style={{ display: props.isOpen ? "block" : "none" }}
              className={styles["link-text"]}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
