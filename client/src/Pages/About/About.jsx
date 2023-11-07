import React from "react";
import styles from "./About.module.css";
import Blob from "./Blob";
import Markdown from "./Markdown";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";

const About = () => {
  const sections = [
    { id: 1, component: <Section1 />, key: "section1" },
    { id: 2, component: <Section2 />, key: "section2" },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <Blob />
      </section>

      {sections.map((section) => (
        <section className={styles.section} key={section.key}>
          {section.component}
        </section>
      ))}
    </div>
  );
};

export default About;
