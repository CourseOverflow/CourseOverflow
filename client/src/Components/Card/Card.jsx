import React from "react";
import styles from "./Card.module.css";
import CardImage from "./CardImage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../Config/apiConfig.js";

const Card = (props) => {
  const navigate = useNavigate();
  const userId = 3;
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

  const handleFeedClick = async (id) => {
    if (props.isDraft) {
      navigate(`/create?draftId=${id}`);
      return;
    }
    const playlistId = String(id);
    const lastWatched = await getLastWatched(playlistId);
    navigate(`/play?playlistId=${playlistId}&index=${lastWatched}`);
  };

  const watchPercentage = Math.floor(
    (props.data.watchedCount / props.data.videoCount) * 100
  );

  return (
    <div key={props.data.id} onClick={() => handleFeedClick(props.data.id)}>
      <CardImage
        image={props.data.thumbnail}
        likes={props.data.likes}
        dislikes={props.data.dislikes}
        isLiked={props.data.isLiked}
        isDisliked={props.data.isDisliked}
        isBookmarked={props.data.isBookmarked}
        watchPercentage={watchPercentage}
      />
      <div className={styles.cardDetails}>
        <h1 className={styles.title}>{props.data.title}</h1>
        <p className={styles.author}>{props.data.authorId}</p>
      </div>
    </div>
  );
};

export default Card;
