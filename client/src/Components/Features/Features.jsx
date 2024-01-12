import React, { useEffect } from "react";
import styles from "./Features.module.css";
import { FaSearch, FaUser } from "react-icons/fa";
import { RiPlayListAddLine } from "react-icons/ri";
import { GoDiscussionClosed } from "react-icons/go";
import { IoAnalyticsSharp } from "react-icons/io5";
import { SiLetsencrypt } from "react-icons/si";

const cardData = [
  {
    key: 1,
    image: process.env.PUBLIC_URL + "/images/features/createPlaylist.png",
    icon: <RiPlayListAddLine />,
    title: "Custom Playlists",
    description:
      "Create personalized playlists for a tailored learning experience.",
  },
  {
    key: 2,
    image: process.env.PUBLIC_URL + "/images/features/transparentSearch.png",
    icon: <FaSearch />,
    title: "Powerful Search",
    description: "Effortlessly find content with our robust search feature.",
  },
  {
    key: 3,
    image:
      process.env.PUBLIC_URL + "/images/features/transparentRecommendation.png",
    icon: <FaUser />,
    title: "Recommendations",
    description: "Discover new content with personalized recommendations.",
  },
  {
    key: 4,
    image:
      process.env.PUBLIC_URL + "/images/features/transparentDiscussion.png",
    icon: <GoDiscussionClosed />,
    title: "Discussions",
    description: "Engage in meaningful discussions and connect with others.",
  },
  {
    key: 5,
    image: process.env.PUBLIC_URL + "/images/features/transparentAnalytics.png",
    icon: <IoAnalyticsSharp />,
    title: "User Analytics",
    description:
      "Gain insights into your usage patterns for an enhanced experience.",
  },
  {
    key: 6,
    image: process.env.PUBLIC_URL + "/images/features/transparentSecurity.png",
    icon: <SiLetsencrypt />,
    title: "Security and Privacy",
    description:
      "Rest easy knowing your data is secure with our privacy measures.",
  },
];

const Card = ({ icon, image, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-content"]}>
        <div className={styles["card-image"]}>
          <img src={image} alt="feature" />
        </div>
        <div className={styles["card-info-wrapper"]}>
          <div className={styles["card-info"]}>
            <span className={styles["card-icon"]}>{icon}</span>
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
