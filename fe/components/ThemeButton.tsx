import React, { useState, useEffect, useRef } from "react";
import { getRandomId } from "@/utils";

const ThemeButton = () => {
  
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState("");
  const handleClick = () => {
    const newCheck = !checked;
    // Change prefers-color-scheme
    if (newCheck) {
      document.documentElement.setAttribute("class", "dark");
      document.documentElement.style.setProperty('--scrollbar-thumb-color', 'rgb(125, 125, 125)');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("class", "light");
      document.documentElement.style.setProperty('--scrollbar-thumb-color', 'rgb(152, 152, 152)');
      localStorage.setItem("theme", "light");
    }
    setChecked(newCheck);
  };


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setId(getRandomId());
    if (storedTheme === "dark") {
      setChecked(true);
      document.documentElement.classList.add("dark");
    } else {
      setChecked(false);
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.style.setProperty("--body-transition-duration", "500ms");
  }, []);

  return (
    <div className="flex justify-center items-center">
      <label htmlFor={id} className="block relative cursor-pointer w-14 h-8 group" aria-label="Theme Button">
        <input id={id} type="checkbox" className="opacity-0 w-0 h-0" checked={checked} readOnly onChange={handleClick} />
        <span className="flex flex-col justify-center absolute top-0 left-0 right-0 bottom-0 dark:bg-[#f4f4f5] bg-[#303136] transition duration-200 rounded-full">
          <div className="block relative w-14 h-8">
            <span className="absolute left-1 top-1 w-6 h-6 rounded-full transition duration-300 group-has-[:checked]:translate-x-full bg-gradient-to-tr from-pink-500 to-orange-500 group-has-[:checked]:bg-none group-has-[:checked]:shadow-theme group-has-[:checked]:bg-black-1" />
          </div>

        </span>
      </label>
    </div>
  );
};

export default ThemeButton;