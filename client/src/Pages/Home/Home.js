import React from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import data from "./dummydata";

const images = [
  "https://www.telegraph.co.uk/content/dam/films/2020/02/07/TELEMMGLPICT000224006835_trans_NvBQzQNjv4BqVnGZDHLVbaDWtLqzwQh5-XkyztDRjf0dUW_myY0VgWI.jpeg",
  "https://i.redd.it/4r2dkf1bwtm41.jpg",
  "https://images.wallpaperscraft.com/image/single/cat_rat_soft_65475_2560x1080.jpg",
];

const Home = (props) => {
  return (
    <>
      <div className={styles.container}>
        <ImageSlider images={images} />
      </div>
      <HomeFeed data={data} sidebarOpen={props.sidebarOpen} />
    </>
  );
};

export default Home;
