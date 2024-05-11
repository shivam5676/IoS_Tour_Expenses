import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

function UserProfile() {
  return (
    <div className="rounded-lg shadow-md shadow-gray-700  w-[40%] h-[50vh] m-2 bg-white text-black">
      <p className=" rounded-t-lg py-2 font-bold text-[1.2rem]  h-[40px] text-center bg-purple-500 text-white ">
        user profile
      </p>{" "}
      <div className="flex justify-center">
        <FaRegUserCircle className="w-[80px] h-[80px] mt-2" />
      </div>
      <div className="flex justify-between my-2 max-[1760px]:flex-col max-[1760px]:items-center">
        <div className="flex px-2 py-1">
          <p className="text-[1.0rem] font-bold">Name :</p>
          <p className="text-[1.0rem] font-bold">Abhishek mishra</p>
        </div>
        <div className="flex px-2 py-1">
          <p className="text-[1.0rem] font-bold">Role :</p>
          <p p className="text-[1.0rem] font-bold">
            Software Developer
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between   max-[1760px]:items-center">
        <div className="flex px-2 py-1">
          <p className="text-[1.0rem] font-semibold">Email :</p>
          <p className="text-[1.0rem] font-semibold">AbhishekMia@gmail.com</p>
        </div>
        <div className="flex px-2 ">
          <p className="text-[1.0rem] max-[1200px]:text-[.9rem] font-semibold  max-[1760px]:items-center">
            phone :
          </p>
          <p className="text-[1.0rem] max-[1200px]:text-[.9rem] font-semibold">
            9559923286
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
