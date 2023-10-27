import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
    setSearchValue("");
  };

  return (
    <form onSubmit={handleSearch} className={styles["search-container"]}>
      <input
        type="text"
        placeholder="Search"
        className={`${styles["search-input"]}`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button type="submit" className={styles["search-button"]}>
        <Link to="/search">
          <FaSearch className="bg-transparent" />
        </Link>
      </button>
    </form>
  );
};

export default SearchBar;
