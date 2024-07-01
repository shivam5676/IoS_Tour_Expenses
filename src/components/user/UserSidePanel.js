import React, { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import iosLogo from "../../assests/images/ios logo.png";
import { useNavigate } from "react-router-dom";
import Context from "../../store/Context";
function UserSidePanel() {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const userData = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="w-[250px] h-[81vh] max-[923px]:hidden   min-[980px]:w-[300px] backdrop-blur-sm bg-[#2c3e50]  text-white rounded-2xl my-1 min-[1400px]:my-2 shadow-md shadow-gray-700 font-['Poppins']">
      <div className="bg-[#2980b9] h-[150px] rounded-md m-4 max-w-[270px] text-white">
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
      <div className="flex flex-col items-center h-[calc(81vh-180px)] justify-between">
        <div className="mt-4 w-[100%] flex flex-col  items-center">
          <p
            className="font-bold cursor-pointer hover:bg-[#3498db] w-[60%] my-1 min-[1400px]:my-2   text-center hover:text-white"
            onClick={() => navigate("/user")}
          >
            Dashboard
          </p>
          <p
            className="font-bold cursor-pointer hover:bg-[#3498db] w-[60%] my-1 min-[1400px]:my-2   text-center hover:text-white"
            onClick={() => navigate("/userVouchers")}
          >
            Vouchers
          </p>
          {/* <p
            className="font-bold cursor-pointer hover:bg-[#3498db] w-[60%]  my-1 min-[1400px]:my-2 text-center hover:text-white"
            onClick={() => navigate("/changePassword")}
          >
            change password
          </p> */}
        </div>
        <div className=" min-w-[100%] max-w-[270px] text-white ">
          <div className="flex m-4  bg-[#2980b9] rounded-md py-2 items-center justify-center">
            {/* <div className="flex ps-2">
              <img src={iosLogo} className="w-[40px] h-[40px]"></img>
            </div> */}
            <div className="p-2">
              <p className=" text-[.8rem] font-bold border-b-2 ">
                Voucher Management System
              </p>
              <p className=" text-[.65rem] font-bold py-1 text-center">
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
