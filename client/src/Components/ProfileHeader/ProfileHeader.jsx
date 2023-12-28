import React, { useState, useEffect } from "react";
import styles from "./ProfileHeader.module.css";
import { FaPen } from "react-icons/fa";

const ProfileHeader = () => {
  const userId = 2;
  const loggedInUserId = 2;
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("SlimeMaster");
  const profilePic = process.env.PUBLIC_URL + "/logo.png";

  useEffect(() => {
    if (isEditing) {
      document.getElementById("usernameInput").focus();
    }
  }, [isEditing]);

  const handleUsernameUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    document.getElementById("usernameInput").blur();
    console.log("Username updated");
  };

  const handleProfilePicUpdate = () => {
    console.log("Profile pic updated");
  };

  return (
    <div className={styles.profileHeader}>
      {userId === loggedInUserId ? (
        <>
          <div className={styles.profilePicContainer}>
            <div className={styles.imageContainer}>
              <img
                className={styles.profilePicEditable}
                src={profilePic}
                alt="Profile"
              />
              <div className={styles.overlay} onClick={handleProfilePicUpdate}>
                <span>Edit</span>
              </div>
            </div>
          </div>
          <hr className={styles.horizontalLine} />
          <form
            className={styles.usernameEditable}
            onSubmit={handleUsernameUpdate}
          >
            <input
              id="usernameInput"
              className={styles.usernameInput}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <img className={styles.profilePic} src={profilePic} alt="Profile" />
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.username}>{username}</div>
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
