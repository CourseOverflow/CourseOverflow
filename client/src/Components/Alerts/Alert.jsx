import React from "react";
import Info from "./Info";
import Success from "./Success";
import Error from "./Error";
import Warning from "./Warning";

const Alert = ({ type, message, onClose }) => {
  return (
    <div className="bg-transparent">
      {type === "Info" && <Info message={message} onClose={onClose} />}
      {type === "Success" && <Success message={message} onClose={onClose} />}
      {type === "Warning" && <Warning message={message} onClose={onClose} />}
      {type === "Error" && <Error message={message} onClose={onClose} />}
    </div>
  );
};

export default Alert;
