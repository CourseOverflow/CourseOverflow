import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PreviewCard from "../../PreviewCard/PreviewCard";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import styles from "./Step3.module.css";
import { v4 as uuidv4 } from "uuid";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";
DragDropContext.unstable_disableReactStrictModeWarnings = true;

const LoadingImg = () => {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
    >
      <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

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
    return (
      <div className={styles.flexContainer}>
        <LoadingImg />
      </div>
    );
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
