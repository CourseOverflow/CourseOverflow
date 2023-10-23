import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import style from "./Todo.module.css";

function Todo({ todo, remove, update, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [topic, setTask] = useState(todo.topic);

  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = (evt) => {
    evt.preventDefault();
    update(todo.id, topic);
    toggleFrom();
  };
  const handleChange = (evt) => {
    setTask(evt.target.value);
  };

  let result;
  if (isEditing) {
    result = (
      <div className={style.Todo}>
        <form className={style["Todo-edit-form"]} onSubmit={handleUpdate}>
          <input onChange={handleChange} value={topic} type="text" />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    const topicClassName = todo.completed
      ? style["Todo-topic completed"]
      : style["Todo-topic"];
    result = (
      <div className={style.Todo}>
        <li id={todo.id} className={topicClassName}>
          {todo.topic}
        </li>
        <div className={style["Todo-buttons"]}>
          <button onClick={toggleFrom}>
            <FaPen />
          </button>
          <button onClick={() => remove(todo.id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
