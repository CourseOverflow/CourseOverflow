import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import style from "./Todo.module.css";

function Todo({ todo, remove, update, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = (evt) => {
    evt.preventDefault();
    update(todo.id, task);
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
          <input onChange={handleChange} value={task} type="text" />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    const taskClassName = todo.completed
      ? style["Todo-task completed"]
      : style["Todo-task"];
    result = (
      <div className={style.Todo}>
        <li id={todo.id} className={taskClassName}>
          {todo.task}
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
