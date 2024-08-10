import { useState, useEffect } from "react";

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("isDark") === "true" || true;
  });

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    document.documentElement.setAttribute("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  return { isDark, toggleTheme };
};

export default useTheme;
