import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  FaHome,
  FaPlus,
  FaBookmark,
  FaUser,
  FaAngleDown,
  FaAngleRight,
} from "react-icons/fa";
import BookmarkList from "./BookmarkList";
import { NavLink } from "react-router-dom";
import api from "../../Config/apiConfig";
import useAlerts from "../../Hooks/useAlerts";

const Sidebar = (props) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const { addAlert } = useAlerts();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await api.get(
          "playlist/user-bookmarked-playlists?light=true",
        );
        setBookmarks(response.data);
      } catch (error) {
        addAlert("Error", "Failed to fetch bookmarks");
      }
    };
    if (user) {
      fetchBookmarks();
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

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
        {!loading && user && (
          <div>
            <div className={styles.link}>
              <div className={styles.icon}>
                <FaBookmark />
              </div>
              <div
                style={{ display: props.isOpen ? "block" : "none" }}
                className={styles["link-text"]}
              >
                Bookmarks
              </div>
              {props.isOpen && (
                <button
                  onClick={() => setBookmarkOpen(!bookmarkOpen)}
                  className={styles.icon}
                >
                  {bookmarkOpen ? <FaAngleDown /> : <FaAngleRight />}
                </button>
              )}
            </div>

            {props.isOpen && bookmarkOpen && (
              <BookmarkList bookmarks={bookmarks} setIsOpen={props.setIsOpen} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
