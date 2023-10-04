import React, { useState, useRef } from "react";
import styles from "./Step1.module.css"; // You may need to adjust the styles import
import FileUpload from "../FormComponents/FileUpload";
import TodoList from "../TodoList/TodoList.js";
import NewTodoForm from "../TodoList/NewTodoForm.js";
import { v4 as uuidv4 } from "uuid";

const Step2 = () => {
  // Define state variables and functions
  const [todos, setTodos] = useState([
    { id: uuidv4(), task: "task 1", completed: false },
    { id: uuidv4(), task: "task 2", completed: false },
  ]);

  const create = (newTodo) => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const update = (id, updatedTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
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
      <div className={styles["column50"]}>
        {/* Pass state variables and functions to TodoList */}
        <TodoList
          todos={todos}
          createTodo={create}
          removeTodo={remove}
          updateTodo={update}
          toggleCompleteTodo={toggleComplete}
        />
      </div>
      <div className={styles["column50"]}>
        <FileUpload />
        <NewTodoForm createTodo={create} />
        {/* <NewTodoForm createTodo={props.create} /> */}
      </div>
    </div>
  );
};

export default Step2;
