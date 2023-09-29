import React from "react";
import styles from "./Home.module.css";
import HomeFeed from "../../Components/HomeFeed/HomeFeed";

const Home = (props) => {
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
    },
    {
      id: 2,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
    },
    {
      id: 3,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
    },
    {
      id: 4,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
    },
    {
      id: 5,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
    },
    {
      id: 6,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
    },
    {
      id: 13,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
    },
    {
      id: 1323,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
    },
    {
      id: 133,
      title: "The Witcher",
      description:
        "The Witcher is an American fantasy drama streaming television series produced by Lauren Schmidt Hissrich. It is based on the book series of the same name by Polish writer Andrzej Sapkowski.",
      image:
        "https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg",
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
      <HomeFeed data={data} sidebarOpen={props.sidebarOpen} />
    </>
  );
};

export default Home;
