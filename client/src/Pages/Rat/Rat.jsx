import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Rat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slime = searchParams.get("slime");
  const index = searchParams.get("index");

  const handleClick = () => {
    navigate(`/rat?slime=${slime}&index=${index + 1}`, { replace: true });
  };

  return (
    <div>
      <h1>Rat</h1>
      <button onClick={handleClick}>show rat 🐀</button>
    </div>
  );
};

export default Rat;
