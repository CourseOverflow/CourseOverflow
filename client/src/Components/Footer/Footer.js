import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={styles["footer-content"]}>
        <span className={`${styles["footer-text"]}`}>
          © 2023{" "}
          <a href="/" className="hover:underline">
            Slimy™
          </a>
          . All Rights Reserved.
        </span>
        <ul className={styles["footer-links"]}>
          <li>
            <a href="/" className={`${styles["footer-link"]}`}>
              About
            </a>
          </li>
          <li>
            <a href="/" className={`${styles["footer-link"]}`}>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/" className={`${styles["footer-link"]}`}>
              Licensing
            </a>
          </li>
          <li>
            <a href="/" className={styles["footer-link"]}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
