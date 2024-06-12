import axios from "axios";
import React, { useContext, useEffect } from "react";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import Context from "../store/Context";

function UserProfile() {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;

  const ctx = useContext(Context);
  console.log(ctx.adminCurrentUserData);
  const user = JSON.parse(localStorage.getItem("token"));

  const deleteUserHandler = async (id) => {
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/deleteUser`,
        {
          userId:id,
          token: user.access_token,
          domain: user.domain,
        }
      );
      console.log(response.data)
      // const res = response.data.userList;
      // if (response?.data?.userList) {
      //   ctx.AllVoucher(response.data.userList);
      // }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="rounded-lg shadow-md shadow-gray-700  w-[100%]  min-[689px]:w-[40%]  min-h-[250px] h-[40vh]  min-[689px]:m-2 my-2 bg-white text-black">
      <p className=" rounded-t-lg py-2 font-bold text-2xl   text-center  bg-gradient-to-r bg-[#2fc7f8] text-white ">
        User Profile
      </p>{" "}
      {user?.isAdmin && (
        <p
          className="fixed bg-red-500 hover:bg-red-700 text-white px-1 cursor-pointer"
          onClick={()=>deleteUserHandler(ctx.adminCurrentUserData.id)}
        >
          remove
        </p>
      )}
      <div className="p-2 pt-4 flex border-b-2">
        <FaRegUser className="w-[80px] h-[80px] mt-2" />
        <div className="py-2 flex flex-col">
          <p>
            {ctx.adminCurrentUserData?.firstName +
              " " +
              ctx.adminCurrentUserData?.lastName}
          </p>
          {ctx.adminCurrentUserData?.designation && (
            <p> {`(${ctx.adminCurrentUserData?.designation})`}</p>
          )}
          <div className="flex">
            <p className="font-bold ">UserId :</p>{" "}
            <p className=" px-2"> {ctx.adminCurrentUserData?.id}</p>
          </div>
        </div>{" "}
      </div>
      <div className="px-4 py-2 border-b-2 flex">
        <p className="font-bold">Email :</p>

        <p className="text-[.9rem] justify-start px-2">
          {ctx.adminCurrentUserData?.email}
        </p>
      </div>
      <div className="px-4 py-2 border-b-2 flex">
        <p className="font-bold">Phone :</p>

        <p className="text-[.9rem] justify-start px-2">
          {ctx.adminCurrentUserData?.mobile}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
