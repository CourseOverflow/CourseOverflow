import React, { useState, useRef } from "react";
import styles from "./Step2.module.css";
import FileUpload from "../FormComponents/FileUpload";
import TodoList from "../TodoList/TodoList";
import PlayListData from "../../../Data/PlayListData";

const Step2 = () => {
  const [todos, setTodos] = useState(PlayListData[0].bundle);

  const create = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const update = (id, updatedTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, topic: updatedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.flexContainer}>
      <div className={styles.uploadContainer}>
        <FileUpload />
      </div>
      <div className={styles.listContainer}>
        <TodoList
          todos={todos}
          createTodo={create}
          removeTodo={remove}
          updateTodo={update}
          toggleCompleteTodo={toggleComplete}
        />
      </div>
    </div>
  );
};

export default Step2;
