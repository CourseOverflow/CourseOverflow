import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import Analytics from "../../Components/Analytics/Analytics";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import DashboardSkeleton from "../../Components/Skeleton/DashboardSkeleton";
// import ActivityCalendar from "../../Components/ActivityCalendar/ActivityCalendar.jsx";
import api from "../../Config/apiConfig.js";
import useAlerts from "../../Hooks/useAlerts";
import { useParams, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const { username } = useParams();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [currentUser, setCurrentUser] = useState({});
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const [createdDrafts, setCreatedDrafts] = useState([]);
  const [bookmarkedPlaylists, setBookmarkedPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = api.get(`user/${username}`);
    const fetchCreatedPlaylists = api.get(`playlist/user-playlists`, {
      params: { username },
    });
    const fetchLikedPlaylists = api.get(`playlist/user-liked-playlists`, {
      params: { username },
    });

    let fetchCreatedDrafts;
    let fetchBookmarkedPlaylists;

    if (user && username.toLowerCase() === user.username.toLowerCase()) {
      fetchCreatedDrafts = api.get(`draft/get-all-drafts`, {
        params: { username },
      });
      fetchBookmarkedPlaylists = api.get(`playlist/user-bookmarked-playlists`);
    }

    const requests = [
      fetchUser,
      fetchCreatedPlaylists,
      fetchLikedPlaylists,
      fetchCreatedDrafts,
      fetchBookmarkedPlaylists,
    ].filter(Boolean);

    Promise.allSettled(requests)
      .then((results) => {
        const [
          userResult,
          createdPlaylistsResult,
          likedPlaylistsResult,
          createdDraftsResult,
          bookmarkedPlaylistsResult,
        ] = results;

        if (userResult.status === "fulfilled" && userResult.value) {
          setCurrentUser(userResult.value.data);
        } else {
          addAlert("Error", "User not found");
          navigate("/");
          return;
        }

        if (createdPlaylistsResult.status === "fulfilled") {
          setCreatedPlaylists(createdPlaylistsResult.value.data);
        }

        if (likedPlaylistsResult.status === "fulfilled") {
          setLikedPlaylists(likedPlaylistsResult.value.data);
        }

        if (createdDraftsResult?.status === "fulfilled") {
          setCreatedDrafts(createdDraftsResult.value.data);
        }

        if (bookmarkedPlaylistsResult?.status === "fulfilled") {
          setBookmarkedPlaylists(bookmarkedPlaylistsResult.value.data);
        }
      })
      .catch(() => {
        addAlert("Error", "Failed to fetch user data");
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [username]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const analyticsData = {
    views: 0,
    likes: 0,
    dislikes: 0,
  };

  const activityData = createdPlaylists.map((playlist) => {
    analyticsData.views += playlist.views;
    analyticsData.likes += playlist.likes;
    analyticsData.dislikes += playlist.dislikes;

    return {
      date: playlist.created_at,
    };
  });

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
      category: "Bookmarks",
      data: bookmarkedPlaylists,
    },
    {
      id: 4,
      category: "Drafts",
      data: createdDrafts,
      isDraft: true,
    },
  ];

  if (!user || username !== user.username) {
    feedList.splice(2, 2);
  }

  return (
    <>
      <div className={styles.top}>
        <div className={styles.profileHeader}>
          <ProfileHeader
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </div>
        <div className={styles.analytics}>
          <Analytics analyticsData={analyticsData} />
        </div>
      </div>
      {/* <ActivityCalendar analyticsData={activityData} /> */}
      <HomeFeed feedList={feedList} />
    </>
  );
};

export default Dashboard;
