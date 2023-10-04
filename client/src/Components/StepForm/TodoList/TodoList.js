import React from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import style from "./TodoList.module.css"; // Import the CSS module

function TodoList({
  todos,
  createTodo,
  removeTodo,
  updateTodo,
  toggleCompleteTodo,
}) {
  const todosList = todos.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      remove={removeTodo}
      update={updateTodo}
      toggleComplete={toggleCompleteTodo}
    />
  ));

  return (
    <div className={style.TodoList}>
      {" "}
      <ul>{todosList}</ul>
    </div>
  );
}

export default TodoList;
