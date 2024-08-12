import React from "react";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <img src="./sad404.svg" alt="404" />
        <div className={styles["hero-text"]}>Page Not Found</div>
        <div> 404 </div>
      </div>
    </>
  );
};

export default PageNotFound;
