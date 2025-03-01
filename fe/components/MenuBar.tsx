import React, { useState, useEffect, useRef } from "react";
import { getRandomId } from "../utils";

interface MenuBarParams {
  checked?: boolean;
  id?: string;
  onChange?: (checked: boolean) => void;
}

const MenuBar: React.FC<MenuBarParams> = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const [id, setId] = useState(props.id);
  const menuBarRef = useRef<HTMLLabelElement>(null); // Step 1: Create a ref

  const handleClick = () => {
    const newCheck = !checked;
    setChecked(newCheck);
    if (props.onChange) props.onChange(newCheck);
  };

  useEffect(() => {
    if (!id) setId(getRandomId());
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <label ref={menuBarRef} htmlFor={id} className="flex items-center cursor-pointer group" aria-label="Menu Bar">
      <div className='relative w-8 h-8 dark:bg-white bg-gray-1000 rounded-md group transition duration-300'>
        <div className="flex flex-col justify-center absolute w-full h-full px-1 -translate-y-1/4 group-has-[:checked]:rotate-45 group-has-[:checked]:translate-y-0 duration-300">
          <span className='w-full h-0.5 bg-white dark:bg-black rounded-full' />
        </div>
        <div className="flex flex-col justify-center absolute w-full h-full px-1 translate-y-1/4 group-has-[:checked]:-rotate-45 group-has-[:checked]:translate-y-0 duration-300">
          <span className='w-full h-0.5 bg-white dark:bg-black rounded-full' />
        </div>
        <div className="flex flex-col justify-center absolute w-full h-full px-1 group-has-[:checked]:opacity-0 group-has-[:checked]:translate-x-1/2 duration-300">
          <span className='w-full h-0.5 bg-white dark:bg-black rounded-full' />
        </div>
        <input id={id} type="checkbox" className="sr-only" checked={checked} readOnly onClick={handleClick} />
      </div>
    </label>
  );
};

export default MenuBar;