import React from "react";
import styles from "./Card.module.css";
import CardImage from "./CardImage";
import { useNavigate } from "react-router-dom";
import api from "../../Config/apiConfig";

const Card = (props) => {
  const navigate = useNavigate();

  const getLastWatched = async (playlistId) => {
    try {
      const response = await api.get(
        `playlist/get-last-watched?playlistId=${playlistId}`
      );
      return response.data.lastWatched;
    } catch (error) {
      console.error("Error getting last watched: ", error);
      return 1;
    }
  };

  const handleFeedClick = async () => {
    const id = props.data.id;
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
    <div key={props.data.id}>
      <CardImage
        id={props.data.id}
        image={props.data.thumbnail}
        likes={props.data.likes}
        dislikes={props.data.dislikes}
        isLiked={props.data.isLiked}
        isDisliked={props.data.isDisliked}
        isBookmarked={props.data.isBookmarked}
        watchPercentage={watchPercentage}
        handleFeedClick={handleFeedClick}
      />
      <div className={styles.cardDetails}>
        <div className={styles.profilePic}>
          <img src={props.data.authorProfile} alt="Author Profile" />
        </div>
        <div className={styles.textDetails}>
          <h1 className={styles.title}>{props.data.title}</h1>
          <p className={styles.author}>{props.data.authorName}</p>
        </div>
      </div>
      <p className={styles.views}>
        {props.data.duration} | {props.data.views} views
      </p>
    </div>
  );
};

export default Card;
