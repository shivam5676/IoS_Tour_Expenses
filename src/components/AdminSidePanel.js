import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import iosLogo from "../assests/images/ios logo.png";
import { useNavigate } from "react-router-dom";
function AdminSidePanel() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("token"));

  return (
    <div className="w-[250px] h-[81vh] max-[923px]:hidden  min-[980px]:w-[300px] backdrop-blur-sm bg-white/30  text-white rounded-2xl my-1 min-[1400px]:my-2 shadow-md shadow-gray-700 font-['Poppins']">
      <div className="bg-[#2fc7f8] h-[150px] rounded-md m-4 max-w-[270px] text-white">
        <div className="flex ">
          {console.log(userData?.profilePic)}{" "}
          {!userData?.profilePic ? (
            <FaRegUserCircle className="w-[60px] h-[80px] m-2" />
          ) : (
            <img
              src={userData?.profilePic}
              alt="profile"
              className="w-[80px] h-[80px] m-2 border-2"
            ></img>
          )}
          <div className=" flex justify-center flex-col">
            {" "}
            <p className=" px-2 font-bold  font-['Poppins']">
              {userData?.firstName + " " + userData?.lastName}
            </p>
            {userData?.designation&&<p className="text-[.75rem]">{`( ${userData?.designation} ) `}</p>}{" "}
          </div>
        </div>

        <div className="flex border-b-2">
          <MdEmail className="w-[25px] h-[25px] mx-2" />
          <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis text-[.9rem]">
            {userData?.email}{" "}
          </p>
        </div>
        <div className="flex">
          <IoMdCall className="w-[25px] h-[25px] mx-2" />
          <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis">
            {userData?.mobile}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center h-[calc(81vh-185px)] justify-between">
        <div className="mt-4 w-[100%] flex flex-col  items-center">
          <p
            className="font-bold hover:bg-[#2fc7f8] w-[60%] my-0 min-[1400px]:my-2  text-center cursor-pointer hover:text-white"
            onClick={() => navigate("/home")}
          >
            Home
          </p>
          <p
            className="font-bold hover:bg-[#2fc7f8] w-[60%] my-0 min-[1400px]:my-2 text-center cursor-pointer hover:text-white"
            onClick={() => navigate("/adminUser")}
          >
            Users
          </p>
          <p
            className="font-bold hover:bg-[#2fc7f8] w-[60%] my-0 min-[1400px]:my-2 text-center cursor-pointer hover:text-white"
            onClick={() => navigate("/adminReport")}
          >
            Reports
          </p>
          <p
            className="font-bold hover:bg-[#2fc7f8] w-[60%] my-0 min-[1400px]:my-2 text-center cursor-pointer hover:text-white"
            onClick={() => navigate("/accounts")}
          >
            Accounts
          </p>
        </div>
        <div className=" min-w-[100%] max-w-[270px] text-white ">
          <div className="flex m-4  bg-[#2fc7f8] rounded-md py-2 items-center">
            <div className="flex ps-2">
              <img
                src={iosLogo}
                className="w-[40px] h-[40px]"
                draggable={false}
              ></img>
            </div>
            <div className="p-2">
              <p className=" text-[.8rem] font-bold border-b-2 ">
                Voucher Management System
              </p>
              <p className=" text-[.65rem] font-bold py-1">
                © copyright 2024 ( IOS pvt ltd )
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidePanel;
