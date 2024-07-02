import React, { useState } from "react";

const ModeToggler = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center ">
        <input
          type="checkbox"
          checked={isChecked}
          
          className="sr-only"
        />
        <span className={`label flex items-center text-md text-white font-medium ${!isChecked&&"text-[#2baac0] border-2 p-1 px-2 rounded-md border-[#2baac0]"}`}>
          Admin Panel
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-[#2baac0]" : "bg-[#CCCCCE]"
          }`}
          onClick={handleCheckboxChange}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[28px]" : ""
            }`}
            onClick={handleCheckboxChange}
          ></span>
        </span>
        <span className="label flex items-center text-md text-white font-medium ">
          User Panel
        </span>
      </label>
    </>
  );
};

export default ModeToggler;
