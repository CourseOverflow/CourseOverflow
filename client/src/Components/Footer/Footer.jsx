import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={`${styles.footer}`}>
      <div className={styles["footer-content"]}>
        <span className={`${styles["footer-text"]}`}>
          © {new Date().getFullYear()}{" "}
          <button
            onClick={() => navigate("/")}
            className="hover:underline cursor-pointer"
          >
            CourseOverflow™
          </button>
          . All Rights Reserved.
        </span>
        <ul className={styles["footer-links"]}>
          <li>
            <button
              onClick={() => navigate("/about")}
              className={`${styles["footer-link"]}`}
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/about")}
              className={`${styles["footer-link"]}`}
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/about")}
              className={`${styles["footer-link"]}`}
            >
              Licensing
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/about")}
              className={styles["footer-link"]}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
