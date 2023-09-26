import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} dark:${styles.dark}`}>
      <div className={styles["footer-content"]}>
        <span className={`${styles["footer-text"]} dark:${styles.dark}`}>
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
        <ul className={styles["footer-links"]}>
          <li>
            <a href="#" className={`${styles["footer-link"]} md:${styles.md}`}>
              About
            </a>
          </li>
          <li>
            <a href="#" className={`${styles["footer-link"]} md:${styles.md}`}>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className={`${styles["footer-link"]} md:${styles.md}`}>
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className={styles["footer-link"]}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
