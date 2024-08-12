import React, { useState, useEffect, useRef } from "react";
import styles from "./ProfileHeader.module.css";
import { FaPen } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../../Config/apiConfig.js";
import useAlerts from "../../Hooks/useAlerts";

const ProfileHeader = ({ currentUser, setCurrentUser }) => {
  const { username } = useParams();
  const { addAlert } = useAlerts();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const updateProfilePic = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "imageupload");
      formData.append("folder", "profilePicture");

      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser((prevUser) => ({
            ...prevUser,
            profilePicture: data.secure_url,
          }));

          api
            .post(`user/update-user-profile`, {
              new_profile_picture: data.secure_url,
              cloudinary_public_id: data.public_id,
            })
            .then(() => {
              addAlert("Success", "Profile picture updated successfully");
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...user,
                  profilePicture: data.secure_url,
                }),
              );
              console.log(localStorage.getItem("user"));
            });
        })
        .catch((error) => {
          addAlert("Error", "Error uploading image");
          console.error("Error uploading image:", error);
        });
    } else {
      addAlert("Error", "No file selected");
    }
  };
  return (
    <div className={styles.profileHeader}>
      {username === user?.username ? (
        <>
          <div className={styles.profilePicContainer}>
            <div className={styles.imageContainer} onChange={updateProfilePic}>
              <img
                className={styles.profilePicEditable}
                src={currentUser.profilePicture}
                alt="Profile"
              />
              <div className={styles.overlay} onChange={updateProfilePic}>
                <label htmlFor="fileInput">
                  <span>Edit</span>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={updateProfilePic}
                />
              </div>
            </div>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.username}>{username}</div>
          {/* <form className={styles.usernameEditable} onSubmit={handleSubmit}> */}
          {/*   <input */}
          {/*     id="usernameInput" */}
          {/*     className={styles.usernameInput} */}
          {/*     type="text" */}
          {/*     value={username} */}
          {/*     onChange={(e) => handleUpdate(e)} */}
          {/*     ref={inputRef} */}
          {/*   /> */}
          {/*   <FaPen */}
          {/*     className={styles.editPen} */}
          {/*     onClick={() => setIsEditing(!isEditing)} */}
          {/*   /> */}
          {/* </form> */}
        </>
      ) : (
        <>
          <div className={styles.profilePicContainer}>
            <img
              className={styles.profilePic}
              src={currentUser.profilePicture}
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
