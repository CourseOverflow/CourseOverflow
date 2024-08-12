import React from "react";
import GoogleGeminiEffect from "./GoogleGeminiEffect";
import styles from "./Gemini.module.css";

const Gemini = () => {
  return (
    <div>
      <h1 className={styles.title}>CourseOverflow</h1>
      <p className={styles.subtitle}>Powered by Gemini</p>
      <div className={styles.geminiEffectBig}>
        <GoogleGeminiEffect height={550} viewBoxHeight={220} />
      </div>
      <div className={styles.geminiEffectSmall}>
        <GoogleGeminiEffect height={350} viewBoxHeight={220} />
      </div>
    </div>
  );
};

export default Gemini;
