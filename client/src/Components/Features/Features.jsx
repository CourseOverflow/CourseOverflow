import React, { useEffect } from "react";
import styles from "./Features.module.css";
//import react icons
import {
  FaCircle,
  FaSearch,
  FaUser,
  FaChevronCircleDown,
} from "react-icons/fa";

const cardData = [
  {
    key: 1,
    image: process.env.PUBLIC_URL + "/images/features/transparentSearch.jpg",
    icon: <FaSearch />,
    title: "Powerful search",
    description: "Find anything across your courses",
  },
  {
    key: 2,
    image: process.env.PUBLIC_URL + "/images/features/transparentSearch.jpg",
    icon: <FaUser />,
    title: "User Analytics",
    description: "Places to be apart. Wait, what?",
  },
  {
    key: 3,
    image: process.env.PUBLIC_URL + "/images/features/createPlaylist.jpg",
    icon: <FaChevronCircleDown />,
    title: "Create Playslists",
    description: "Places to be apart. Wait, what?",
  },
  {
    key: 4,
    image: process.env.PUBLIC_URL + "/images/features/transparentSearch.jpg",
    icon: <FaCircle />,
    title: "Apartments",
    description: "Places to be apart. Wait, what?",
  },
  {
    key: 5,
    image: process.env.PUBLIC_URL + "/images/features/transparentSearch.jpg",
    icon: <FaCircle />,
    title: "Apartments",
    description: "Places to be apart. Wait, what?",
  },
  {
    key: 6,
    image: process.env.PUBLIC_URL + "/images/features/transparentSearch.jpg",
    icon: <FaCircle />,
    title: "Apartments",
    description: "Places to be apart. Wait, what?",
  },
];

const Card = ({ icon, image, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-content"]}>
        <div className={styles["card-image"]}>
          <img src={image} alt="apartment" />
        </div>
        <div className={styles["card-info-wrapper"]}>
          <div className={styles["card-info"]}>
            {icon}
            <div className={styles["card-info-title"]}>
              <h3>{title}</h3>
              <h4>{description}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.getElementsByClassName(styles.card);
      Array.from(cards).forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    const cardsElement = document.getElementById("cards");
    if (cardsElement) {
      cardsElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div id="cards" className={styles.allCards}>
        {cardData.map((card) => (
          <Card
            key={card.key}
            icon={card.icon}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
