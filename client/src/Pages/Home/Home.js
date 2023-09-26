import React from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";

const Home = () => {
  const imageSource =
    "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg";
  const data = [
    {
      id: 1,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
      rating: 5,
      year: 2019,
      genre: "Fantasy",
      runtime: "60 min",
      trailer: "https://www.youtube.com/watch?v=ndl1W4ltcmg",
      cast: "Henry Cavill, Freya Allan, Anya Chalotra",
      creator: "Lauren Schmidt Hissrich",
    },
    {
      id: 2,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
      rating: 5,
      year: 2019,
      genre: "Fantasy",
      runtime: "60 min",
      trailer: "https://www.youtube.com/watch?v=ndl1W4ltcmg",
      cast: "Henry Cavill, Freya Allan, Anya Chalotra",
      creator: "Lauren Schmidt Hissrich",
    },
    {
      id: 3,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
      rating: 5,
      year: 2019,
      genre: "Fantasy",
      runtime: "60 min",
      trailer: "https://www.youtube.com/watch?v=ndl1W4ltcmg",
      cast: "Henry Cavill, Freya Allan, Anya Chalotra",
      creator: "Lauren Schmidt Hissrich",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <img
          srcSet={`${imageSource} 1x, ${imageSource} 2x`}
          className={styles.image}
          alt="Slimy Home Page"
        />
      </div>
      <HomeFeed data={data} />
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <HomeFeed data={data} />
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    </>
  );
};

export default Home;
