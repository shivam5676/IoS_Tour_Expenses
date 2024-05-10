import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";

function AdminSidePanel() {
  return (
    <div className="w-[300px]  max-h-[700px] bg-white text-black rounded-md my-2 shadow-md shadow-gray-700">
      <div className="bg-gray-300 h-[150px] rounded-md m-4 w-[270px]">
        <div className="flex justify-center">
          <FaRegUserCircle className="w-[40px] h-[40px] mt-2" />
        </div>

        <p className=" p-2 font-bold text-center">SHIVAM SINGH</p>
        <div className="flex border-b-2">
          <MdEmail className="w-[25px] h-[25px] mx-2" />
          <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis">
            shivam.handler@gmail.com
          </p>
        </div>
        <div className="flex">
          <IoMdCall className="w-[25px] h-[25px] mx-2" />
          <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis">
            +91 9559923286
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {" "}
        <p className="font-bold hover:bg-purple-500 w-[60%] text-center hover:text-white">
          home
        </p>
        <p className="font-bold hover:bg-purple-500 w-[60%] text-center hover:text-white">users</p>
        <p className="font-bold hover:bg-purple-500 w-[60%] text-center hover:text-white">reports</p>
      </div>
    </div>
  );
}

export default AdminSidePanel;
