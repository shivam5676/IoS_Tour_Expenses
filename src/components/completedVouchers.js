import React from "react";

function CompletedVouchers() {
  return (
    <div className="shadow-md shadow-gray-700 w-[60%] h-[250px]  bg-white m-2 rounded-lg">
    <p className=" py-2 font-bold text-2xl text-center  rounded-t-lg text-white bg-purple-500">
       All Vouchers{" "}
    </p>{" "}
    <div className="w-[100%]">
      <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center">
        <p className="w-[13%] px-1">v.no</p>
        <p className="w-[27%] px-1">name</p>
        <p className="w-[25%] px-1">trip</p>
        <p className="w-[20%] px-1">Date</p>
        <p className="w-[15%] px-1 text-center"></p>
      </div>
    </div>
    <div className="w-[100%] h-[calc(50vh-90px)] overflow-y-auto">
      <div className="mx-2 bg-white text-black flex py-1 text-[.8rem] font-semibold">
        <p className="w-[13%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          1
        </p>
        <p className="w-[27%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          shivam singh
        </p>
        <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          HYDERABAD
        </p>
        <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          15/03/24
        </p>
        <div className="w-[15%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
          <p className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500">
            {" "}
            View
          </p>
        </div>
      </div>
      <div className="mx-2 bg-white text-black flex py-1 text-[.8rem] font-semibold">
        <p className="w-[13%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          1
        </p>
        <p className="w-[27%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          shivam singh
        </p>
        <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          HYDERABAD
        </p>
        <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          15/03/24
        </p>
        <div className="w-[15%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
          <p className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500">
            {" "}
           View
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default CompletedVouchers;
