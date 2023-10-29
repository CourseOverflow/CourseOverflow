import React from "react";
import styles from "./Search.module.css";
import SearchData from "../../Data/CourseData";
import CardImage from "../../Components/Card/CardImage";

const Search = () => {
  
  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  }

  return (
    <div className={styles.container}>
      {SearchData.map((item) => (
        <div key={item.id} className={styles.searchContainer}>
          <div className={styles.Thumbnail}>
            <CardImage
              image={item.image}
              likes={item.likes}
              dislikes={item.dislikes}
              isLiked={item.isLiked}
              isDisliked={item.isDisliked}
              isBookmarked={item.isBookmarked}
              watchPercentage={Math.floor(
                (item.watchedCount / item.videoCount) * 100
              )}
            />
          </div>
          <div className={styles.details}>
            <h1 className={styles.title}>{item.title}</h1>
            <span className={styles.authorContainer}>
              <img className={styles.avatar} src={process.env.PUBLIC_URL + "/logo.png"} alt="avatar" />
              <p className={styles.author}>{item.author}</p>
            </span>
            <p className={styles.author}>
              {item.duration} | {formatViews(item.views)} views
            </p>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
