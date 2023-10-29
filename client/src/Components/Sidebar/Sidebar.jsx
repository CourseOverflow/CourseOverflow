import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaHome, FaPlus, FaBookmark, FaPlay } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdOutlinePlaylistPlay } from "react-icons/md";

const Sidebar = (props, { children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
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
      to: "/play",
      icon: <FaPlay />,
    },
  ];

  const bookMark = {
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
      {menuItem.map((item, index) => (
        <NavLink
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
  );
};

export default Sidebar;
