import axios from "axios";
import React, { useContext, useEffect } from "react";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import Context from "../store/Context";
import { toast } from "react-toastify";

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
          delId: id,
          token: user.access_token,
          domain: user.domain,
        }
      );
      console.log(response.data);
      // const res = response.data.userList;
      // if (response?.data?.userList) {
      //   ctx.AllVoucher(response.data.userList);
      // }
      toast.success("user deleted successfully...");
    } catch (err) {
      console.log(err);
    }
  };
  const assignAdminHandler = async (id) => {
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/assignAsAdmin`,
        {
          adminId: id,
          token: user.access_token,
          domain: user.domain,
        }
      );
      console.log(response.data);
      // const res = response.data.userList;
      // if (response?.data?.userList) {
      //   ctx.AllVoucher(response.data.userList);
      // }
      toast.success("user assigned as Admin ...");
    } catch (err) {if(err.response&&err.response.data.msg){
      toast.error(err.response.data.msg)
    }
      console.log(err);
    }
  };
  const removeAdminHandler = async (id) => {
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/removeAsAdmin`,
        {
          adminId: id,
          token: user.access_token,
          domain: user.domain,
        }
      );
      console.log(response.data);
      // const res = response.data.userList;
      // if (response?.data?.userList) {
      //   ctx.AllVoucher(response.data.userList);
      // }
      toast.success("admin access removed ...");
    } catch (err) {
    if(err.response&&err.response.data.msg){
      toast.error(err.response.data.msg)
    }
      console.log(err);
    }
  };
  return (
    <div className="relative rounded-lg shadow-md shadow-gray-700  w-[100%]  min-[689px]:w-[40%]  min-h-[250px] h-[40vh]  min-[689px]:m-2 my-2 bg-white text-black">
      <p className="relative rounded-t-lg py-2 font-bold text-2xl   text-center   bg-[#2980b9] text-white">
        User Profile
      </p>{" "}
      {/* {user?.isAdmin && (
        <div
          className="absolute   bg-red-500 hover:bg-red-700 text-white px-1 cursor-pointer z-10"
          onClick={() => deleteUserHandler(ctx.adminCurrentUserData.id)}
        >
          remove
        </div>
      )} */}
      <div className=" overflow-y-scroll h-[calc(40vh-50px)] min-h-[200px] ">
        {" "}
        <div className="p-2 pt-4 flex border-b-2">
          {ctx.adminCurrentUserData?.profilePic ? (
            <img
              src={ctx.adminCurrentUserData?.profilePic}
              alt="profile"
              className="w-[80px] h-[80px] m-2 border-2"
            ></img>
          ) : (
            <FaRegUser className="w-[80px] h-[80px] m-2 border-2 border-black p-2"></FaRegUser>
          )}
          <div className="py-2 flex flex-col">
            <p>
              {ctx.adminCurrentUserData?.firstName +
                " " +
                ctx.adminCurrentUserData?.lastName}
            </p>
            {ctx.adminCurrentUserData?.designation && (
              <p className="text-sm">
                {" "}
                {`(${ctx.adminCurrentUserData?.designation})`}
              </p>
            )}
            <div className="flex">
              <p className="font-bold ">UserId :</p>{" "}
              <p className=" px-2"> {ctx.adminCurrentUserData?.id}</p>
            </div>
          </div>{" "}
        </div>
        <div className="px-4 py-2 border-b-2 flex">
          <p className="font-bold text-nowrap text-[.75rem] lg:text-[.9rem]">
            Email :
          </p>

          <p className="text-[.75rem] lg:text-[.9rem] justify-start px-2 text-wrap">
            {ctx.adminCurrentUserData?.email}
          </p>
        </div>
        <div className="px-4 py-2 border-b-2 flex">
          <p className="font-bold text-nowrap text-[.75rem] lg:text-[.9rem]">
            Phone :
          </p>

          <p className="text-[.75rem] lg:text-[.9rem] justify-start px-2">
            {ctx.adminCurrentUserData?.mobile}
          </p>
        </div>
        <div className="px-4 py-2 border-b-2 flex">
          <p className="font-bold text-nowrap text-[.75rem] lg:text-[.9rem]">
            Permissions :
          </p>
          <div>
           
            {ctx?.adminCurrentUserData?.supervisor &&
              !ctx?.adminCurrentUserData?.isAdmin && (
                <p className="border-[2px] text-[.75rem] lg:text-[.9rem] font-semibold border-blue-600 px-2 rounded-md flex items-center mx-1">
                  SuperVisor{" "}
                </p>
              )}{" "}
            {ctx?.adminCurrentUserData?.isAdmin && (
              <p className="border-[2px] text-[.75rem] lg:text-[.9rem] font-semibold border-blue-600 px-2 rounded-md flex items-center mx-1">
                Admin{" "}
              </p>
            )}
            {!ctx?.adminCurrentUserData?.supervisor &&
              !ctx?.adminCurrentUserData?.isAdmin && (
                <p className="border-[2px] text-[.75rem] lg:text-[.9rem] font-semibold border-blue-600 px-2 rounded-md flex items-center mx-1">
                  User Only
                </p>
              )}
          </div>

          {ctx?.adminCurrentUserData?.isAdmin ? (
            <p
              className="border-2 bg-red-600 px-2 flex flex-nowrap rounded-md text-[.75rem] lg:text-[.9rem] font-bold text-white cursor-pointer hover:bg-red-700 w-fit  whitespace-nowrap"
              onClick={() => {
                removeAdminHandler(ctx.adminCurrentUserData.id);
              }}
            >
              Remove Admin
            </p>
          ) : (
            <p
              className="border-2 bg-green-600 px-2  flex flex-nowrap rounded-md text-[.75rem] lg:text-[.9rem] font-bold text-white cursor-pointer hover:bg-green-700  w-fit  whitespace-nowrap"
              onClick={() => {
                assignAdminHandler(ctx.adminCurrentUserData.id);
              }}
            >
              Assign Admin
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
