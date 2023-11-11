import React, { useEffect, useRef } from "react";
import styles from "./Blob.module.css";

const Blob = () => {
  const blobRef = useRef(null);
  const h1Ref = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const blob = blobRef.current;
    const h1 = h1Ref.current;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    const handleMouseOver = (event) => {
      let iteration = 0;
      let interval = null;

      clearInterval(interval);

      interval = setInterval(() => {
        h1.innerText = h1.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return h1.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= h1.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    h1.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      h1.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div>
      <div className={styles.blugout}>
        <div className={styles.blur}></div>
        <div
          ref={blobRef}
          id="blob"
          className={styles.blob}
          style={1 ? { display: "block" } : { display: "none" }}
        ></div>

        <h1
          ref={h1Ref}
          data-value="COURSEOVERFLOW"
          className={styles.AboutTitle}
        >
          COURSEOVERFLOW
        </h1>
      </div>
    </div>
  );
};

export default Blob;
