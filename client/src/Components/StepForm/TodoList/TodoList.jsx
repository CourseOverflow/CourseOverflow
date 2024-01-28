import React, { useEffect, useRef } from "react";
import Todo from "./Todo";
import style from "./TodoList.module.css";
import NewTodoForm from "./NewTodoForm";
import api from "../../../Config/apiConfig";
import { v4 as uuidv4 } from "uuid";
import { usePlaylistContext } from "../../../Contexts/PlaylistContext";

const TodoList = () => {
  const { playlistData, setPlaylistData } = usePlaylistContext();
  const listRef = useRef(null);

  const updateDraft = async (newList) => {
    const updatedData = {
      ...playlistData,
      topicList: newList,
    };

    try {
      const response = await api.post(`draft/update-draft`, updatedData);
      if (response.ok) {
        console.log("Draft updated successfully");
        console.log(response.data);
        setPlaylistData((prevData) => ({
          ...prevData,
          draftId: response.data.draftId,
        }));
      } else {
        console.error("Failed to update draft");
      }
    } catch (error) {
      console.error("Error updating draft:", error);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [playlistData.topicList]);

  const todosList = playlistData.topicList.map((_, index) => (
    <Todo key={uuidv4()} updateDraft={updateDraft} index={index} />
  ));

  return (
    <div className={style.TodoList} ref={listRef}>
      <ul>
        {todosList}
        <li>
          <NewTodoForm updateDraft={updateDraft} />
        </li>
      </ul>
    </div>
  );
};

export default TodoList;
