import React, { useState, useEffect, useRef } from "react";
import styles from "./ProfileHeader.module.css";
import { FaPen } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../../Config/apiConfig.js";

const ProfileHeader = () => {
  const { username } = useParams();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: username,
    profilePic: "",
  });

  useEffect(() => {
    if (user.username === username) {
      setCurrentUser(user);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await api.get(`user/${username}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("user info updated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user info api called");
  };

  return (
    <div className={styles.profileHeader}>
      {username === user.username ? (
        <>
          <div className={styles.profilePicContainer}>
            <div className={styles.imageContainer}>
              <img
                className={styles.profilePicEditable}
                src={currentUser.profilePic}
                alt="Profile"
              />
              <div
                className={styles.overlay}
                onClick={() => console.log("to be implemented")}
              >
                <span>Edit</span>
              </div>
            </div>
          </div>
          <hr className={styles.horizontalLine} />
          <form className={styles.usernameEditable} onSubmit={handleSubmit}>
            <input
              id="usernameInput"
              className={styles.usernameInput}
              type="text"
              value={username}
              onChange={(e) => handleUpdate(e)}
              ref={inputRef}
            />
            <FaPen
              className={styles.editPen}
              onClick={() => setIsEditing(!isEditing)}
            />
          </form>
        </>
      ) : (
        <>
          <div className={styles.profilePicContainer}>
            <img
              className={styles.profilePic}
              src={currentUser.profilePic}
              alt="Profile"
            />
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.username}>{username}</div>
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
