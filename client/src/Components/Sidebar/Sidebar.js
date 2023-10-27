import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaHome, FaPlus, FaBookmark, FaPlay } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdOutlineExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
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
      to: "/home",
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
    to: "/bookmark",
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
      {/* <Dropdown /> */}
      <Link
        to={bookMark.to}
        className={
          location.pathname === bookMark.to
            ? `${styles.active} ${styles.link}`
            : styles.link
        }
      >
        <div className={styles.icon}>{bookMark.icon}</div>
        <div
          style={{ display: props.isOpen ? "block" : "none" }}
          className={styles["link-text"]}
        >
          {bookMark.name}
        </div>
      </Link>
      <hr
        className={styles.line}
        style={{ display: props.isOpen ? "block" : "none" }}
      />
      <div className={`flex mt-3  `}>
        <div
          style={{ display: props.isOpen ? "block" : "none" }}
          className={`${styles["link-text"]}  ml-0.5 `}
        >
          {isOpen && (
            <div>
              {userBookmarks.map((item, index) => (
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
              {/* <hr className={styles.line}  style={{ display: props.isOpen ? "block" : "none" }}/> */}
            </div>
          )}
          {isOpen ? (
            <div className="flex">
              <MdOutlineExpandMore
                style={{ display: props.isOpen ? "block" : "none" }}
                className={`${styles.expand} ml- 1  `}
                onClick={() => setIsOpen(!isOpen)}
                fontSize="2rem"
                color="#fff"
              />
              <span className="ml-2 " onClick={() => setIsOpen(!isOpen)}>
                Show Less
              </span>
            </div>
          ) : (
            <div className="flex">
              <MdOutlineExpandMore
                style={{ display: props.isOpen ? "block" : "none" }}
                className={`${styles.expand} ml-2 `}
                onClick={() => setIsOpen(!isOpen)}
                fontSize="2rem"
                color="#fff"
              />
              <span className="ml-2" onClick={() => setIsOpen(!isOpen)}>
                Show More
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
