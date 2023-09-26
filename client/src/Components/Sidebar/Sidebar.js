import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FaHome, FaPlus, FaListUl, FaSignInAlt, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
      name: "My List",
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
    <div className={styles.container}>
      <div
        style={{ width: isOpen ? "200px" : "50px" }}
        className={styles.sidebar}
      >
        <div className={styles["top-section"]}>
          <h3
            style={{ display: isOpen ? "block" : "none" }}
            className={styles.logo}
          >
          </h3>
          <div
            style={{ marginLeft: isOpen ? "70px" : "0px" }}
            className={styles.bars}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.to}
            key={index}
            className={styles.link}
            activeClassName={styles.active}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles["link-text"]}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
