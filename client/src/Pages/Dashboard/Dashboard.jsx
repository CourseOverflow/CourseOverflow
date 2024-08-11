import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Analytics from "../../Components/Analytics/Analytics";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import DashboardSkeleton from "../../Components/Skeleton/DashboardSkeleton";
import ActivityCalendar from "../../Components/ActivityCalendar/ActivityCalendar.jsx";
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
  }, [username]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  console.log(createdPlaylists);
  const analyticsData = createdPlaylists.slice(0, 5).map((playlist) => ({
    name: playlist.title,
    views: playlist.views,
    likes: playlist.likes,
    dislikes: playlist.dislikes,
    date: playlist.created_at,
  }));

  const sortByDate = (data) => {
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  sortByDate(analyticsData);

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
          <Analytics analyticsData={analyticsData} />
        </div>
      </div>
      <ActivityCalendar />
      <HomeFeed feedList={feedList} />
    </>
  );
};

export default Dashboard;
