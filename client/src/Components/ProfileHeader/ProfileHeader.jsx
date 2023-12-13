import React from 'react';
import styles from './ProfileHeader.module.css';

const ProfileHeader = ({ username, profilePic }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profilePicContainer}>
        <img className={styles.profilePic} src={profilePic} alt="Profile" />
      </div>
      <hr className={styles.horizontalLine} />
      <div className={styles.username}>{username}</div>
    </div>
  );
};

export default ProfileHeader;
