import React from "react";
import styles from "./Card.module.css";
import CardImage from "./CardImage";
import { useNavigate } from "react-router-dom";
import api from "../../Config/apiConfig";
import { formatDuration, formatViews } from "../../Utils/format";

const Card = ({ data, isDraft }) => {
  const navigate = useNavigate();

  const getLastWatched = async (playlistId) => {
    try {
      const response = await api.get(
        `playlist/get-last-watched?playlistId=${playlistId}`,
      );
      return response.data.lastWatched;
    } catch (error) {
      return 1;
    }
  };

  const handleFeedClick = async () => {
    const id = data.id;
    if (isDraft) {
      navigate(`/create?draftId=${id}`);
      return;
    }
    const playlistId = String(id);
    const lastWatched = await getLastWatched(playlistId);
    navigate(`/play?playlistId=${playlistId}&index=${lastWatched}`);
  };

  const watchPercentage = Math.floor((data.watchCount / data.videoCount) * 100);

  return (
    <div key={data.id}>
      <CardImage
        id={data.id}
        image={data.thumbnail}
        likes={data.likes}
        dislikes={data.dislikes}
        isLiked={data.isLiked}
        isDisliked={data.isDisliked}
        isBookmarked={data.isBookmarked}
        watchPercentage={watchPercentage}
        handleFeedClick={handleFeedClick}
      />
      <div className={styles.cardDetails}>
        <div
          className={styles.profilePic}
          onClick={() => navigate(`/u/${data.authorUsername}`)}
        >
          <img src={data.authorProfile} alt="Author Profile" />
        </div>
        <div className={styles.textDetails}>
          <h1 className={styles.title}>{data.title}</h1>
          <p
            className={styles.author}
            onClick={() => navigate(`/u/${data.authorUsername}`)}
          >
            {data.authorName}
          </p>
        </div>
      </div>
      <p className={styles.views}>
        {formatDuration(data.duration)} | {formatViews(data.views)} views
      </p>
    </div>
  );
};

export default Card;
