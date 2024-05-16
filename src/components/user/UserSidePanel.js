import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import iosLogo from "../../assests/images/ios logo.png";
import { useNavigate } from "react-router-dom";
function UserSidePanel() {
  const navigate = useNavigate();
  return (
    <div className="w-[250px] h-[500px]  min-[980px]:w-[300px]  bg-white text-black rounded-2xl my-2 shadow-md shadow-gray-700 font-['Poppins']">
      <div className="bg-purple-500 h-[150px] rounded-md m-4 max-w-[270px] text-white">
        <div className="flex justify-center">
          <FaRegUserCircle className="w-[40px] h-[40px] mt-2" />
        </div>

        <p className=" p-2 font-bold text-center font-['Poppins']">
          SHIVAM SINGH
        </p>
        <div className="flex border-b-2">
          <MdEmail className="w-[25px] h-[25px] mx-2" />
          <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis text-[.9rem]">
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
      <div className="flex flex-col items-center h-[calc(500px-185px)] justify-between">
        <div className="mt-4 w-[100%] flex flex-col  items-center">
          <p
            className="font-bold hover:bg-purple-500 w-[60%]  text-center hover:text-white"
            onClick={() => navigate("/home")}
          >
            Dashboard
          </p>
          <p
            className="font-bold hover:bg-purple-500 w-[60%] text-center hover:text-white"
            onClick={() => navigate("/changePassword")}
          >
            Vouchers
          </p>
          <p
            className="font-bold hover:bg-purple-500 w-[60%] text-center hover:text-white"
            onClick={() => navigate("/changePassword")}
          >
            change password
          </p>
          {/* <p
            className="font-bold hover:bg-purple-500 w-[60%] text-center hover:text-white"
            onClick={() => navigate("/adminReport")}
          >
            reports
          </p>
          <p
            className="font-bold hover:bg-purple-500 w-[60%] text-center hover:text-white"
            onClick={() => navigate("/adminReport")}
          >
            change password
          </p> */}
        </div>
        <div className=" min-w-[100%] max-w-[270px] text-white ">
          <div className="flex m-4  bg-purple-400 rounded-md py-2 items-center">
            <div className="flex ps-2">
              <img src={iosLogo} className="w-[40px] h-[40px]"></img>
            </div>
            <div className="p-2">
              <p className=" text-[.8rem] font-bold border-b-2 ">
                Tour Expense tracker System
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

export default UserSidePanel;
