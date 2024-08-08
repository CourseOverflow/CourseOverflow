import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PreviewCard from "../../PreviewCard/PreviewCard";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import styles from "./Step3.module.css";
import { v4 as uuidv4 } from "uuid";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";
import FetchSkeleton from "../../Skeleton/FetchSkeleton";
DragDropContext.unstable_disableReactStrictModeWarnings = true;

const Step3 = () => {
  const { fetchingVideos, playlistData, setPlaylistData } =
    usePlaylistContext();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const newList = playlistData.videoList.map((item) => ({
      scrollableItems: item.map((subItem) => ({
        ...subItem,
        id: uuidv4(),
      })),
      id: uuidv4(),
    }));
    setVideoList(newList);
    // eslint-disable-next-line
  }, [fetchingVideos]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newList = [...videoList];
    const [reorderedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, reorderedItem);
    setVideoList(newList);
  };

  const nextVideo = (indexI, indexJ) => {
    const newList = [...videoList];
    const nextIndex = (indexJ + 1) % newList[indexI].scrollableItems.length;
    newList[indexI].scrollableItems[indexJ].selected = false;
    newList[indexI].scrollableItems[nextIndex].selected = true;
    setVideoList(newList);
    setPlaylistData((prevData) => ({
      ...prevData,
      videoList: newList.map((item) => item.scrollableItems),
    }));
  };

  const prevVideo = (indexI, indexJ) => {
    const newList = [...videoList];
    const prevIndex =
      (indexJ - 1 + newList[indexI].scrollableItems.length) %
      newList[indexI].scrollableItems.length;
    newList[indexI].scrollableItems[indexJ].selected = false;
    newList[indexI].scrollableItems[prevIndex].selected = true;
    setVideoList(newList);
    setPlaylistData((prevData) => ({
      ...prevData,
      videoList: newList.map((item) => item.scrollableItems),
    }));
  };

  const deleteVideo = (indexI) => {
    const newList = [...videoList];
    newList.splice(indexI, 1);
    setVideoList(newList);
    setPlaylistData((prevData) => ({
      ...prevData,
      videoList: newList.map((item) => item.scrollableItems),
    }));
  };

  if (fetchingVideos) {
    return <FetchSkeleton />;
  }

  return (
    <div className={styles.flexContainer}>
      <div className={styles.PreviewCard}>
        <PreviewCard />
      </div>
      <div className={`${styles.list} ${styles["Dragable"]}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {videoList.map((item, indexI) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={indexI}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.scrollableItems.map(
                            (subItem, indexJ) =>
                              subItem.selected && (
                                <PlaylistCard
                                  key={subItem.id}
                                  topic={subItem.title}
                                  author={subItem.author}
                                  thumbnail={subItem.thumbnail}
                                  duration={subItem.duration}
                                  nextVideo={() => nextVideo(indexI, indexJ)}
                                  prevVideo={() => prevVideo(indexI, indexJ)}
                                  deleteVideo={() => {
                                    deleteVideo(indexI);
                                  }}
                                  isDraggable={true}
                                  isScrollable={true}
                                />
                              ),
                          )}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Step3;
