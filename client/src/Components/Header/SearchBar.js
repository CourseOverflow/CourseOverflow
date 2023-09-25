import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        placeholder="Search"
        className={styles["search-input"]}
      />
      <button className={styles["search-button"]}>Search</button>
    </div>
  );
};

export default SearchBar;
