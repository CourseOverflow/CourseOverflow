import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./NewTodoForm.module.css";
import { FaPlus } from "react-icons/fa";

function NewTodoForm({ createTodo }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      task: "",
    }
  );

  const handleChange = (evt) => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newTodo = { id: uuidv4(), task: userInput.task, completed: false };
    createTodo(newTodo);
    setUserInput({ task: "" });
  };

  return (
    <div className={styles.magicBox}>
      <form className={styles.NewTodoForm} onSubmit={handleSubmit}>
        <label htmlFor="task">Manually Enter Topics</label>
        {/* <div className={style.searchBar}>
          <input
            value={userInput.task}
            onChange={handleChange}
            id="task"
            type="text"
            name="task"
            placeholder="Enter Topics"
            className={style.titleInput}
          />
          <button type="submit" className={style.addButton}>
            (+)
          </button>
        </div> */}

        <div className={styles["search-container"]}>
          <input
            value={userInput.task}
            onChange={handleChange}
            id="task"
            type="text"
            name="task"
            placeholder="Enter Topics"
            className={`${styles["search-input"]} h-9`}
          />
          <button className={styles["search-button"]}>
            <FaPlus />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTodoForm;
