import React from "react";

const User = (props) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src="https://via.placeholder.com/50"
        alt="User Profile"
        className="h-8 w-8 rounded-full"
      />
      <span className="text-gray-800 dark:text-white">{props.username}</span>
    </div>
  );
};

export default User;
