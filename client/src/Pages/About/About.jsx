import React from "react";
import styles from "./About.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section5 from "./Sections/Section5";
import { useRef } from "react";

const About = () => {
  const scrollRef = useRef(null);
  const sections = [
    { id: 1, component: <Section1 scrollRef={scrollRef} />, key: "section1" },
    { id: 2, component: <Section2 />, key: "section2" },
    {
      id: 3,
      component: (
        <>
          <Section3 />
          <div ref={scrollRef} />
        </>
      ),
      key: "section3",
    },
    {
      id: 4,
      component: (
        <>
          {/* <div ref={scrollRef} /> */}
          <Section5 />
        </>
      ),
      key: "section5",
    },
  ];

  return (
    <div className={styles.container}>
      <Header isAboutPage={true} />

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
