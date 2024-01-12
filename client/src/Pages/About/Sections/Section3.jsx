import React, { useEffect, useRef } from "react";
import styles from "./Section3.module.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Card = ({ name, image, bio, github, linkedin, leetcode, twitter }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-cursor"]} />
      <div className={styles["card-content"]}>
        <div className={styles.cardTop}>
          <img src={image} alt={name} />
          <div className={styles.cardTopText}>
            <h1>{name}</h1>
            <p>Full stack developer</p>
            <span className={styles.cardTopIcons}>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href={leetcode} target="_blank" rel="noopener noreferrer">
                <SiLeetcode />
              </a>
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </span>
          </div>
        </div>
        <h1>{bio}</h1>
      </div>
    </div>
  );
};

const Section3 = () => {
  const cardsRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cardsElement = cardsRef.current;
      if (cardsElement) {
        const cards = cardsElement.getElementsByClassName(styles.card);
        Array.from(cards).forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
      }
    };
    const cardsElement = cardsRef.current;
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
    <>
      <div className={`${styles.glow}`}></div>
      <h1 className={styles.header}>Development Team</h1>
      <div ref={cardsRef} className={styles.container}>
        <div className={styles.allCards}>
          <Card
            onClick={() => console.log("card")}
            name="Pradyumna"
            image={process.env.PUBLIC_URL + "/pradyDev.png"}
            bio="lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua."
            github="https://github.com/prady8339"
            linkedin="https://www.linkedin.com/in/prady8339/"
            leetcode="https://leetcode.com/prady8339/"
            twitter="https://twitter.com/prady8339"
          />
          <Card
            name="Ansh"
            image={process.env.PUBLIC_URL + "/anshDev.png"}
            bio="I’m a Computer Science undergraduate with strong
            problem solving skills. Enthusiastically exploring the
            realms of web development, with a specific focus on
            backend development. Efficiently utilizing artificial
            intelligence tools to accelerate progress and boost
            productivity in software development."
            github="https://github.com/anshujlayan"
            linkedin="https://www.linkedin.com/in/anshujlayan/"
            leetcode="https://leetcode.com/slimemaster/"
            twitter="https://twitter.com/ujlayanansh"
          />
        </div>
      </div>
    </>
  );
};

export default Section3;
