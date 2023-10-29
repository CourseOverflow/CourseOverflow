import React from "react";
import Todo from "./Todo";
import style from "./TodoList.module.css";
import NewTodoForm from "./NewTodoForm";

const TodoList = ({
  todos,
  createTodo,
  removeTodo,
  updateTodo,
  toggleCompleteTodo,
}) => {
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
      <ul>
        {todosList}
        <li>
          <NewTodoForm createTodo={createTodo} />
        </li>
      </ul>
    </div>
  );
};

export default TodoList;
