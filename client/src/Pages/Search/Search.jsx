import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import CardImage from "../../Components/Card/CardImage";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";

const Search = () => {
  const userId = 2;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [SearchData, setSearchData] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  console.log(query);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/playlist/search/?userId=${userId}&query=${query}`
        );
        setSearchData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views.toString();
  };

  const getLastWatched = async (playlistId) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/playlist/getLastWatched/?userId=${userId}&playlistId=${playlistId}`
      );
      return response.data.lastWatched;
    } catch (error) {
      console.error("Error getting last watched: ", error);
      return 1;
    }
  };

  const handleClick = async (playlistId) => {
    const lastWatched = await getLastWatched(playlistId);
    navigate(`/play?playlistId=${playlistId}&index=${lastWatched}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!SearchData.length) {
    return <div>No results found</div>;
  }

  return (
    <div className={styles.container}>
      {SearchData.map((item) => (
        <div key={item.id} className={styles.searchContainer}>
          <div
            className={styles.Thumbnail}
            onClick={() => handleClick(item.id)}
          >
            <CardImage
              image={item.thumbnail}
              likes={item.likes}
              dislikes={item.dislikes}
              isLiked={item.isLiked}
              isDisliked={item.isDisliked}
              isBookmarked={item.isBookmarked}
              watchPercentage={Math.floor(
                (item.watchCount / item.videoCount) * 100
              )}
            />
          </div>
          <div className={styles.details}>
            <div className={styles.headline}>
              <img
                className={styles.avatar}
                src={item.authorProfile}
                alt="avatar"
              />
              <div className={styles.titleAuthor}>
                <h1 className={styles.title}>{item.title}</h1>
                <p className={styles.author}>{item.authorName}</p>
              </div>
            </div>
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
