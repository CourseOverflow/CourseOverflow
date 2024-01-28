import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/courseOverflow");
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthenticationCallback;
