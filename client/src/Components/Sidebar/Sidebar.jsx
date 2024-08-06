import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaHome, FaPlus, FaPlay, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const location = useLocation();
  const menuItem = [
    {
      name: "Home",
      to: "/",
      icon: <FaHome />,
    },
    {
      name: "Create",
      to: "/create",
      icon: <FaPlus />,
    },
    {
      name: "Play",
      to: "/play?playlistId=1&index=0",
      icon: <FaPlay />,
    },
    {
      name: "Dashboard",
      to: user ? `/u/${user.username}` : "/login",
      icon: <FaUser />,
    },
  ];

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
