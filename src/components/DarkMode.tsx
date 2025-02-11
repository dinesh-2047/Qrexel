import React, { useState, useEffect } from "react";
import sunIcon from "../utils/sun.png";
import moonIcon from "../utils/moon.png";

interface DarkModeProps {
  className?: string;
}

const DarkMode: React.FC<DarkModeProps> = ({ className = "" }) => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 p-1 rounded-full shadow-md bg-gray-200 dark:bg-gray-800 
                  transition-all duration-300 hover:scale-105 ${className}`}
    >
      <img
        src={theme === "light" ? moonIcon : sunIcon}
        alt={theme === "light" ? "Dark Mode" : "Light Mode"}
        className="w-full h-full"
      />
    </button>
  );
};

export default DarkMode;
