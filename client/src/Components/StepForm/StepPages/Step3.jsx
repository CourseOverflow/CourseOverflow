import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PlayListData from "../../../Data/PlayListData";
import PreviewCard from "../../PreviewCard/PreviewCard";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import CourseData from "../../../Data/CourseData";
import styles from "./Step3.module.css";
DragDropContext.unstable_disableReactStrictModeWarnings = true;

const Step3 = () => {
  const generatedCourseId = 0;
  const playListId = CourseData[generatedCourseId].PlayListId;
  const initialItems = PlayListData[playListId].bundle;

  // const initialItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <div className={styles.flexContainer}>
      <div className={styles.PreviewCard}>
        <PreviewCard
          title={CourseData[generatedCourseId].title}
          thumbnail={CourseData[generatedCourseId].image}
          duration={CourseData[generatedCourseId].duration}
          desc={CourseData[generatedCourseId].desc}
        />
      </div>
      <div className={`${styles.list} ${styles["Dragable"]}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
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
                          topic={item.topic}
                          author={item.author}
                          thumbnail={item.thumbnail}
                          duration={item.duration}
                          isDraggable={true}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
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
