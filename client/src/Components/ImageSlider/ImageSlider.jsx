import React, { useState, useEffect, useRef } from "react";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(timer.current);
    };
  }, [images.length]);

  const nextSlide = () => {
    clearInterval(timer.current);
    setSlideIndex((slideIndex + 1) % images.length);
    timer.current = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  const prevSlide = () => {
    clearInterval(timer.current);
    setSlideIndex((slideIndex - 1 + images.length) % images.length);
    timer.current = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  const goToSlide = (index) => {
    clearInterval(timer.current);
    setSlideIndex(index);
    timer.current = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  };

  return (
    <div>
      <div className={styles["slideshow-container"]}>
        {images.map((image, index) => (
          <div
            key={index}
            className={index === slideIndex ? styles.slideActive : styles.slide}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
            <div className={styles["text"]}>Slimy image</div>
          </div>
        ))}

        <button className={styles.prev} onClick={prevSlide}>
          &#10094;
        </button>
        <button className={styles.next} onClick={nextSlide}>
          &#10095;
        </button>

        <div className={styles["slide-number"]}>
          {slideIndex + 1} / {images.length}
        </div>
      </div>
      <div className={styles["dots"]}>
        {images.map((image, index) => {
          return (
            <span
              key={index}
              className={index === slideIndex ? styles.dotActive : styles.dot}
              onClick={() => goToSlide(index)}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
