import React from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";

const Home = () => {
  const imageSource =
    "https://images.wallpaperscraft.com/image/single/cat_rat_soft_65475_2560x1080.jpg";
  const data = [
    {
      id: 1,
      title: "Slimy",
      author: "Ansh Rattata",
      image: "images/rat.jpg",
    },
    {
      id: 2,
      title: "Slimy",
      author: "Ansh Rattata",
      image: "images/rat.jpg",
    },
    {
      id: 3,
      title: "Slimy",
      author: "Ansh Rattata",
      image: "images/rat.jpg",
    },
    {
      id: 4,
      title: "Slimy",
      author: "Ansh Rattata",
      image: "images/rat.jpg",
    },
    {
      id: 5,
      title: "Slimy",
      author: "Ansh Rattata",
      image: "images/rat.jpg",
    },
    {
      id: 6,
      title: "Slimy",
      author: "Ansh Rattata",
      image: "images/rat.jpg",
    },
    {
      id: 7,
      title: "Slimy",
      author: "Ansh Rattata",
      image: "images/rat.png",
    },
  ];
  return (
    <div className={styles.container}>
      <img
        srcSet={`${imageSource} 1x, ${imageSource} 2x`}
        className={styles.image}
        alt="Slimy Home Page"
      />
      <HomeFeed data={data} isDark={true} />
    </div>
  );
};

export default Home;
