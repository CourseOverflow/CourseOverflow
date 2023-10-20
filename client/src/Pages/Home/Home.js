import React from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import data from "../../Data/CourseData.js";

const images = [
  "https://fastly.picsum.photos/id/237/1500/500.jpg?hmac=YSNsAqQlVK1TJQ7NVet19Or2zyl4dJ73jGGu1KXMDYI",
  "https://fastly.picsum.photos/id/40/1500/500.jpg?hmac=vQ4kO2atpF-JLrcq6YOyAU7JafWjkVpqVpq5IPhmp7A",
  "https://fastly.picsum.photos/id/783/1500/500.jpg?hmac=QgVTCmaavk0WRvGo_n4tLlTyAOZrNZ6Mop1eAdkU5wk",
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
