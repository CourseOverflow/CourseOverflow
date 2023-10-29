import React from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import data from "../../Data/CourseData.js";

const images = [
  "https://fastly.picsum.photos/id/678/1500/500.jpg?hmac=QW-aa6JuhmoUlr7Hoe9FF9f1P3mFCQj25Rr0Av2typk",
  "https://fastly.picsum.photos/id/566/1500/500.jpg?hmac=4CmwtYPsDZaQ3jo0ZyH2Hw0-vLeR-wZOtaISlWSjXjg",
  "https://picsum.photos/1500/500?random=3",
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
