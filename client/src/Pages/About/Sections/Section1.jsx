import React, { useState, useEffect } from "react";
import styles from "./Section1.module.css";

const Section1 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className={styles.container}>
          <div className={styles.jumbo}>
            <div className={styles.heroContainer}>
              <h1 data-text="Make Your Study Playlist at ease.">
                Make Your Study Playlist at ease.
              </h1>
            </div>
            <p className={styles.heroChild}>From Students for Students</p>
          </div>
        </div>
      ) : (
        <div>
          <link
            href="https://cdn.prod.website-files.com/63dcb6e1a80e9454b630f4c4/css/perryw-2023.webflow.24d261f58.css"
            rel="stylesheet"
            type="text/css"
          />
          <div className="section-hero" style={{ overFlow: "visible" }}>
            <div className="hero-fade" style={{ display: "none" }}>
              <div
                data-w-id="e5c05ec2-ee56-ccf5-1f20-8a056c33fa25"
                className="scroll-wrapper"
              >
                <img
                  src="https://cdn.prod.website-files.com/63dcb6e1a80e9454b630f4c4/63e206eedd964a5c5db19c91_23-icon-arrow-down.svg"
                  loading="lazy"
                  data-w-id="657cd5a2-6e44-e2a2-e8e0-d1144b4099e1"
                  alt=""
                  className="icon-scroll-down"
                />
              </div>
            </div>
            <div
              data-w-id="87a46662-54f3-370f-de15-afe2ed7aa161"
              className="container-hero-image"
              style={{ position: "static" }}
            >
              <div
                data-w-id="46fda540-ee6a-c3eb-ac8b-34d3193b5890"
                className="glare-item-top outer-edge"
              />
              <div className="window-outline">
                <div className="glare-item-top hero-inner" />
                <div className="window-main">
                  <div
                    data-w-id="815c1c00-4c7f-93a9-0e8b-6fe29ddf0962"
                    className="shine-wrapper"
                  >
                    <div className="shine-small" />
                    <div className="shine-big" />
                  </div>
                  <div className="window-bar">
                    <div className="window-dots-wrapper">
                      <div className="dot red" />
                      <div className="dot yellow" />
                      <div className="dot green" />
                    </div>
                    <img
                      src="https://cdn.prod.website-files.com/63dcb6e1a80e9454b630f4c4/64647bd0f92c6bb858b22871_icon-plus.svg"
                      loading="lazy"
                      alt=""
                      className="icon-windowbar-plus"
                    />
                  </div>
                  <div className="window-content">
                    <div
                      className="hero-text-content"
                      style={{ background: "transparent" }}
                    >
                      <div
                        className="text-hero"
                        style={{ background: "transparent" }}
                      >
                        Make your Study Playlist at
                        <span className="text-hero-serif"> ease.</span>
                      </div>
                      <div
                        style={{
                          background: "transparent",
                          textAlign: "right",
                          fontSize: "24px",
                          color: "grey",
                        }}
                      >
                        FOR STUDENTS
                        <br></br>
                        <br></br>
                        FROM STUDENTS
                      </div>
                    </div>
                    <div className="window-grain" />
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-bg-gradient" />
            <div className="hero-noise" />
          </div>
        </div>
      )}
    </>
  );
};

export default Section1;
