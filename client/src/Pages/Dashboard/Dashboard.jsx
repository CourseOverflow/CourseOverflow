import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Analytics from "../../Components/Analytics/Analytics";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import DashboardSkeleton from "../../Components/Skeleton/DashboardSkeleton";
import api from "../../Config/apiConfig.js";
import { getUserDetails } from "../../Config/apiConfig";

const Dashboard = () => {
  const user = getUserDetails();

  const url = window.location.href;
  const profileId = url.split("/").pop().split("-").pop();

  const userId = user?.id || 1;
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const [createdDrafts, setCreatedDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatedPlaylists = api.get(`playlist/user-playlists`, {
      params: { userId },
    });
    const fetchLikedPlaylists = api.get(`playlist/user-liked-playlists`, {
      params: { userId },
    });
    const fetchCreatedDrafts = api.get(`draft/get-all-drafts`, {
      params: { userId },
    });
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
        },
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
          <ProfileHeader user={user} />
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
