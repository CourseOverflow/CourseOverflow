import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaHome, FaPlus, FaListUl, FaSignInAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = (props, { children }) => {
  const location = useLocation();
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
      name: "MyList",
      to: "/list",
      icon: <FaListUl />,
    },
    {
      name: "Auth",
      to: "/",
      icon: <FaSignInAlt />,
    },
  ];

  return (
    <div
      style={{ width: props.isOpen ? "200px" : "50px" }}
      className={styles.sidebar}
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
