import { useState } from "react";
import styles from "./CardFooter.module.css";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import api from "../../Config/apiConfig";
import useAlerts from "../../Hooks/useAlerts";

const CardFooter = (props) => {
  const { addAlert } = useAlerts();
  const [updating, setUpdating] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked);

  const bookmarkClickHandler = async () => {
    if (updating) {
      return;
    }
    setUpdating(true);
    api
      .post("playlist/add-bookmark", {
        playlistId: props.id,
        bookmarked: !isBookmarked,
      })
      .then((respose) => {
        addAlert("Success", respose.data.message);
        setIsBookmarked(!isBookmarked);
      })
      .catch(() => {
        addAlert("Error", "Error adding bookmark");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <div className={styles.cardFooter}>
      <div className={styles.likesDislikes}>
        {props.isLiked ? (
          <FaThumbsUp className="m-1 bg-transparent" />
        ) : (
          <FaRegThumbsUp className="m-1 bg-transparent" />
        )}
        {props.likesCount}
        {props.isDisliked ? (
          <FaThumbsDown className="m-1 ml-3 bg-transparent" />
        ) : (
          <FaRegThumbsDown className="m-1 ml-3 bg-transparent" />
        )}
        {props.dislikesCount}
      </div>
      <button className={styles.bookmarks}>
        {isBookmarked ? (
          <FaBookmark
            className="mt-1 bg-transparent"
            onClick={bookmarkClickHandler}
          />
        ) : (
          <FaRegBookmark
            className="mt-1 bg-transparent"
            onClick={bookmarkClickHandler}
          />
        )}
      </button>
    </div>
  );
};

export default CardFooter;
