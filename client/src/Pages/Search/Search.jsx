import React from "react";
import styles from "./Search.module.css";
import SearchData from "../../Data/CourseData"; // Import the SearchData array
import CardImage from "../../Components/Card/CardImage";
const Search = () => {
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
              watchPercentage={item.watchPercentage}
            />
          </div>

          <div className={styles.contentContainer}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.author}>
              -{item.author} | {item.views} (views) | {item.duration} (duration)
            </p>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;

// {item.map((item) => (
//   <div key={item.id}>
//     {" "}
//     <Card data={item} />
//   </div>
// ))}
