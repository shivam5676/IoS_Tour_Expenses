import axios from "axios";
import React, { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";

function UserProfile() {const connectionUrl = "http://localhost:2000";

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.post(`${connectionUrl}/admin/getUser`,{
        userId:1
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, []);
  return (
    <div className="rounded-lg shadow-md shadow-gray-700  w-[40%] h-[280px] m-2 bg-white text-black">
      <p className=" rounded-t-lg py-2 font-bold text-2xl   text-center bg-purple-500 text-white ">
        user profile
      </p>{" "}
      <div className="flex justify-center">
        <FaRegUserCircle className="w-[80px] h-[80px] mt-2" />
      </div>
      <div className="flex justify-between my-2 max-[1760px]:flex-col max-[1760px]:items-center text-[.9rem]">
        <div className="flex px-2 py-1">
          <p className=" font-bold">Name :</p>
          <p className=" font-bold">Abhishek mishra</p>
        </div>
        <div className="flex px-2 py-1">
          <p className=" font-bold">Role :</p>
          <p p className=" font-bold">
            Software Developer
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between   max-[1760px]:items-center">
        <div className="flex px-2 py-1">
          <p className=" font-bold">Email :</p>
          <p className=" font-bold">AbhishekMia@gmail.com</p>
        </div>
        <div className="flex px-2 ">
          <p className=" max-[1200px]:text-[.9rem] font-bold  max-[1760px]:items-center">
            phone :
          </p>
          <p className=" max-[1200px]:text-[.9rem] font-bold">
            9559923286
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
