import React from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        placeholder="Search"
        className={`${styles["search-input"]} h-9`}
      />
      <button>
        <Link to="/search" className={styles["search-button"]}>
          <FaSearch />
        </Link>
      </button>
    </div>
  );
};

export default SearchBar;
