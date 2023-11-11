import React, { useEffect, useState } from "react";
import Feed from "../Feed/Feed";
import axios from "axios";
import baseURL from "../../ApiConfig/apiConfig.js";
import styles from "./HomeFeed.module.css";

const HomeFeed = (props) => {
  const [recommendedPlaylistData, setrecommendedPlaylistData] = useState([]);
  const [popularPlaylistData, setPopularPlaylistData] = useState([]);
  const [recentUploadsPlaylistData, setRecentUploadsPlaylistData] = useState(
    []
  );
  // console.log(baseURL);
  useEffect(() => {
    const fetchRecommendedPlaylistData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/playlist/recommended/`
        );
        setrecommendedPlaylistData(response.data);
      } catch (error) {
        console.error("Error fetching recommended playlist data: ", error);
      }
    };

    const fetchPopularPlaylistData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/playlist/popular/`);
        setPopularPlaylistData(response.data);
      } catch (error) {
        console.error("Error fetching popular playlist data: ", error);
      }
    };

    const fetchRecentUploadsPlaylistData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/playlist/recent-uploads/`
        );
        setRecentUploadsPlaylistData(response.data);
      } catch (error) {
        console.error("Error fetching recent uploads playlist data: ", error);
      }
    };

    fetchRecommendedPlaylistData();
    fetchPopularPlaylistData();
    fetchRecentUploadsPlaylistData();
  }, []);

  return (
    <div className={styles.homeFeedContainer}>
      <Feed
        category="Recommended for you"
        data={recommendedPlaylistData}
        sidebarOpen={props.sidebarOpen}
      />
      <hr className={styles.hrLine} />
      <Feed
        category="Popular"
        data={popularPlaylistData}
        sidebarOpen={props.sidebarOpen}
      />
      <hr className={styles.hrLine} />
      <Feed
        category="Recently Uploaded"
        data={recentUploadsPlaylistData}
        sidebarOpen={props.sidebarOpen}
      />
      <hr className={styles.hrLine} />
    </div>
  );
};

export default HomeFeed;
