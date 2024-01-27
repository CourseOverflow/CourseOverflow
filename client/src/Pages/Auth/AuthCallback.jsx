import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/courseOverflow");
  }, []); // Only run this effect once on component mount

  return <div>Authenticating...</div>;
};

export default AuthenticationCallback;
