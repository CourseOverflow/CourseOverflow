import React from "react";
import styles from "./About.module.css";
import Blob from "./Blob";
import Markdown from "./Markdown";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
// import Headers from "./Headers/Headers";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
const About = () => {
  const sections = [
    { id: 1, component: <Section1 />, key: "section1" },
    { id: 2, component: <Section2 />, key: "section2" },
  ];

  return (
    <div className={styles.container}>
      <Header isAboutPage={true} />
      <div className={styles.dummy}></div>
      {/* <section className={styles.section}><Blob /></section> */}

      {sections.map((section) => (
        <section className={styles.section} key={section.key}>
          {section.component}
        </section>
      ))}
      <Footer />
    </div>
  );
};

export default About;
