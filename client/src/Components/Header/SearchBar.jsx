import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue) return;
    setSearchValue("");
    navigate(`/search?query=${searchValue}`);
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
        <FaSearch className="bg-transparent" />
      </button>
    </form>
  );
};

export default SearchBar;
