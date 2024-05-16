import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function UserExpenseList() {
  return (
    <div className="shadow-md shadow-gray-700 w-[100%] h-[250px]  bg-white m-2 rounded-lg">
      <div className=" p-2 font-bold text-2xl flex justify-between rounded-t-lg text-white bg-purple-500">
        <p> Expenses List</p>
        <p className="rounded-md cursor-pointer text-sm px-4 flex items-center bg-white text-black font-bold hover:bg-gray-300">
          submit
        </p>
        <p className="border-2 text-sm pe-4 flex items-center cursor-pointer">
          <IoMdAddCircleOutline className="w-[25px] h-[25px] mx-2"/>
          Add
        </p>
      </div>{" "}
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center">
          <p className="w-[30%] px-1">Description</p>
          <p className="w-[20%] px-1">Category</p>
          <p className="w-[25%] px-1">Amount</p>
          <p className="w-[20%] px-1">Date</p>
          <p className="w-[15%] px-1 text-center"></p>
        </div>
      </div>
      {/* <div className="w-[100%] h-[calc(250px-90px)] overflow-y-auto">
        {props.accepted.map((current) => {
          return (
            <div className="mx-2 bg-white text-black flex py-1 text-[.8rem] font-semibold">
              <p className="w-[13%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.id}
              </p>
              <p className="w-[27%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.user.firstName + " " + current.user.lastName}{" "}
              </p>
              <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.tourLocation}
              </p>
              <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.tourDate}{" "}
              </p>
              <div className="w-[15%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                <p className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500">
                  {" "}
                  View
                </p>
              </div>
            </div>
          );
        })}
       
      </div> */}
    </div>
  );
}

export default UserExpenseList;
