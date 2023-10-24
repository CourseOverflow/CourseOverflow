import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./NewTodoForm.module.css";
import { FaPlus } from "react-icons/fa";

function NewTodoForm({ createTodo }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      topic: "",
    }
  );

  const handleChange = (evt) => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newTodo = { id: uuidv4(), topic: userInput.topic, completed: false };
    createTodo(newTodo);
    setUserInput({ topic: "" });
  };

  return (
    <div className={styles.container}>
      <form className={styles.NewTodoForm} onSubmit={handleSubmit}>
        <input
          value={userInput.topic}
          onChange={handleChange}
          id="topic"
          type="text"
          name="topic"
          placeholder="Add Topic"
        />
        <button>
          <FaPlus />
        </button>
      </form>
    </div>
  );
}

export default NewTodoForm;
