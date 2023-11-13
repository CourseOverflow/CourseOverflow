import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";
import HomeSkeleton from "../../Components/Skeleton/HomeSkeleton";

const Home = (props) => {
  const images = [
    "https://fastly.picsum.photos/id/918/1500/500.jpg?hmac=7Vk0wUBOW3B_8jUK2EkbZZyDmmeGiC-x7_gKxHwVrJ8",
    "https://fastly.picsum.photos/id/678/1500/500.jpg?hmac=QW-aa6JuhmoUlr7Hoe9FF9f1P3mFCQj25Rr0Av2typk",
    "https://fastly.picsum.photos/id/566/1500/500.jpg?hmac=4CmwtYPsDZaQ3jo0ZyH2Hw0-vLeR-wZOtaISlWSjXjg",
  ];
  const [recommendedPlaylistData, setRecommendedPlaylistData] = useState([]);
  const [popularPlaylistData, setPopularPlaylistData] = useState([]);
  const [recentUploadsPlaylistData, setRecentUploadsPlaylistData] = useState(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedPlaylistData = axios.get(
      `${baseURL}/api/playlist/recommended/`
    );
    const fetchPopularPlaylistData = axios.get(
      `${baseURL}/api/playlist/popular/`
    );
    const fetchRecentUploadsPlaylistData = axios.get(
      `${baseURL}/api/playlist/recent-uploads/`
    );

    Promise.all([
      fetchRecommendedPlaylistData,
      fetchPopularPlaylistData,
      fetchRecentUploadsPlaylistData,
    ])
      .then((responses) => {
        setRecommendedPlaylistData(responses[0].data);
        setPopularPlaylistData(responses[1].data);
        setRecentUploadsPlaylistData(responses[2].data);
      })
      .catch((error) => {
        console.error("Error fetching playlist data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <div className={styles.container}>
      <ImageSlider images={images} />
      <HomeFeed
        recommendedPlaylistData={recommendedPlaylistData}
        popularPlaylistData={popularPlaylistData}
        recentUploadsPlaylistData={recentUploadsPlaylistData}
        sidebarOpen={props.sidebarOpen}
      />
    </div>
  );
};

export default Home;
