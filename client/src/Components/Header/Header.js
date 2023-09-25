import React from "react";
import CourseOverflow from "./CourseOverflow";
import SearchBar from "./SearchBar";
import User from "./User";

const Header = () => {
  return (
    <nav className="bg-white shadow-lg dark:bg-gray-900">
      <div className="container mx-auto px-1 py-3 flex justify-between items-center">
        <CourseOverflow />
        <SearchBar />
        <User username={'SlimeMaster'}/>
      </div>
    </nav>
  );
};

export default Header;
