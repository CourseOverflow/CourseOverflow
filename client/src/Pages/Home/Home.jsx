import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import data from "../../Data/CourseData.js";
import axios from "axios";
import baseURL from "../../ApiConfig/apiConfig.js";

const images = [
  "https://fastly.picsum.photos/id/918/1500/500.jpg?hmac=7Vk0wUBOW3B_8jUK2EkbZZyDmmeGiC-x7_gKxHwVrJ8",
  "https://fastly.picsum.photos/id/678/1500/500.jpg?hmac=QW-aa6JuhmoUlr7Hoe9FF9f1P3mFCQj25Rr0Av2typk",
  "https://fastly.picsum.photos/id/566/1500/500.jpg?hmac=4CmwtYPsDZaQ3jo0ZyH2Hw0-vLeR-wZOtaISlWSjXjg",
];

const Home = (props) => {
  const [playlistData, setPlaylistData] = useState([]);
  // console.log(baseURL);
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/playlist/`);
        setPlaylistData(response.data);
      } catch (error) {
        console.error("Error fetching playlist data: ", error);
      }
    };

    fetchPlaylistData();
  }, []);
  console.log(playlistData);

  return (
    <div className={styles.container}>
      <ImageSlider images={images} />
      <HomeFeed data={playlistData} sidebarOpen={props.sidebarOpen} />
    </div>
  );
};

export default Home;
