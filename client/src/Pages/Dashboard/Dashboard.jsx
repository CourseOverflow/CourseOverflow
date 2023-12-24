import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Analytics from "../../Components/Analytics/Analytics";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";
import DashboardSkeleton from "../../Components/Skeleton/DashboardSkeleton";

const Dashboard = () => {
  const [popularPlaylistData, setPopularPlaylistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPlaylistData = axios.get(
      `${baseURL}/api/playlist/popular/`
    );

    Promise.all([fetchPopularPlaylistData])
      .then((responses) => {
        setPopularPlaylistData(responses[0].data);
      })
      .catch((error) => {
        console.error("Error fetching playlist data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const feedList = [
    {
      id: 1,
      category: "Playlists",
      data: popularPlaylistData,
    },
    {
      id: 2,
      category: "Liked",
      data: popularPlaylistData,
    },
    {
      id: 3,
      category: "Drafts",
      data: popularPlaylistData,
    },
  ];

  return (
    <>
      <div className={styles.top}>
        <div className={styles.profileHeader}>
          <ProfileHeader />
        </div>
        <div className={styles.analytics}>
          <Analytics />
        </div>
      </div>
      <HomeFeed feedList={feedList} />
    </>
  );
};

export default Dashboard;
