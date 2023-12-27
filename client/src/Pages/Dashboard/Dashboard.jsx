import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Analytics from "../../Components/Analytics/Analytics";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";
import DashboardSkeleton from "../../Components/Skeleton/DashboardSkeleton";

const Dashboard = () => {
  // const userId = localStorage.getItem("userId");
  const userId = 3;
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const [createdDrafts, setCreatedDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatedPlaylists = axios.get(
      `${baseURL}/api/playlist/user-playlists/?userId=${userId}`
    );
    const fetchLikedPlaylists = axios.get(
      `${baseURL}/api/playlist/user-liked-playlists/?userId=${userId}`
    );
    const fetchCreatedDrafts = axios.get(
      `${baseURL}/api/draft/get-all-drafts/?userId=${userId}`
    );

    Promise.all([
      fetchCreatedPlaylists,
      fetchLikedPlaylists,
      fetchCreatedDrafts,
    ])
      .then(
        ([
          createdPlaylistsResponse,
          likedPlaylistsResponse,
          createdDraftsResponse,
        ]) => {
          setCreatedPlaylists(createdPlaylistsResponse.data);
          setLikedPlaylists(likedPlaylistsResponse.data);
          setCreatedDrafts(createdDraftsResponse.data);
        }
      )
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
      data: createdPlaylists,
    },
    {
      id: 2,
      category: "Liked",
      data: likedPlaylists,
    },
    {
      id: 3,
      category: "Drafts",
      data: createdDrafts,
      isDraft: true,
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
