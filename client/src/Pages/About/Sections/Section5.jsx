import React, { useState } from "react";
import styles from "./Section5.module.css";
// import Success from "../../../Components/Alterts/Success";

const Section5 = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      console.error("Message cannot be empty");
      return;
    }
    const mailTo = "courseoverflow.in@gmail.com";
    console.log("Sending email to:", mailTo);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    setEmail("");
    setSubject("");
    setMessage("");
    console.log("Email sent successfully!");
  };

  return (
    <>
      <div className={styles.customGlow} />
      <section className={styles.contactSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.sectionHeading}>Contact Us</h2>
          <p className={styles.sectionText}>
            Facing technical issues or want to share feedback about a beta
            feature? Let us know! Contact us at{" "}
            <a
              href="mailto:courseoverflow.in@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              courseoverflow.in@gmail.com
            </a>
            .
          </p>

          <form className={styles.contactForm} onSubmit={submitHandler}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Your email
              </label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.formLabel}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className={styles.formInput}
                placeholder="Let us know how we can help you"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="message" className={styles.formLabel}>
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                className={styles.formTextarea}
                placeholder="Leave a comment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.formButton}>
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Section5;
