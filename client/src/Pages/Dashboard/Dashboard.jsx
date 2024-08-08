import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Analytics from "../../Components/Analytics/Analytics";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import DashboardSkeleton from "../../Components/Skeleton/DashboardSkeleton";
import api from "../../Config/apiConfig.js";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { username } = useParams();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const [createdDrafts, setCreatedDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatedPlaylists = api.get(`playlist/user-playlists`, {
      params: { username },
    });
    const fetchLikedPlaylists = api.get(`playlist/user-liked-playlists`, {
      params: { username },
    });

    let fetchCreatedDrafts;

    if (user && username === user.username) {
      fetchCreatedDrafts = api.get(`draft/get-all-drafts`, {
        params: { username },
      });
    }

    const requests = [
      fetchCreatedPlaylists,
      fetchLikedPlaylists,
      fetchCreatedDrafts,
    ].filter(Boolean);

    Promise.all(requests)
      .then((responses) => {
        const [
          createdPlaylistsResponse,
          likedPlaylistsResponse,
          createdDraftsResponse,
        ] = responses;
        setCreatedPlaylists(createdPlaylistsResponse.data);
        setLikedPlaylists(likedPlaylistsResponse.data);
        if (createdDraftsResponse) {
          setCreatedDrafts(createdDraftsResponse.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching playlist data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

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

  if (!user || username !== user.username) {
    feedList.splice(2, 1);
  }

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
