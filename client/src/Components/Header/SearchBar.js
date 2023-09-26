import React from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        placeholder="Search"
        className={`${styles["search-input"]} h-9`}
      />
      <button className={styles["search-button"]}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
