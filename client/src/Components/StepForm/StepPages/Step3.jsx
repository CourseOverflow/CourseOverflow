import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PreviewCard from "../../PreviewCard/PreviewCard";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import styles from "./Step3.module.css";
import { v4 as uuidv4 } from "uuid";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";
import FetchSkeleton from "../../Skeleton/FetchSkeleton";
DragDropContext.unstable_disableReactStrictModeWarnings = true;

const Step3 = () => {
  const { fetchingVideos, playlistData } = usePlaylistContext();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const newList = playlistData.videoList.map((item) => ({
      ...item,
      id: uuidv4(),
    }));
    setVideoList(newList);
  }, [playlistData.videoList]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newList = [...videoList];
    const [reorderedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, reorderedItem);

    setVideoList(newList);
    console.log(newList);
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
                {videoList.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <PlaylistCard
                            key={item.id}
                            topic={item.title}
                            author={item.author}
                            thumbnail={item.thumbnail}
                            duration={item.duration}
                            isDraggable={true}
                          />
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
