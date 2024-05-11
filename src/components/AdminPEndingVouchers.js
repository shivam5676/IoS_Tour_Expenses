import React from "react";

function AdminPEndingVouchers() {
  return (
    <div className="shadow-md shadow-gray-700 w-[60%]  h-[40vh]  bg-yellow-400 m-2 rounded-lg">
      <p className=" border-black border-b-2 py-2 font-bold text-[1.2rem] text-center h-[40px] text-black">
        Pending Vouchers
      </p>
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center">
          <p className="w-[20%] px-1">v.no</p>
          <p className="w-[20%] px-1">name</p>
          <p className="w-[20%] px-1">trip</p>
          <p className="w-[20%] px-1">Duration</p>
          <p className="w-[20%] px-1 text-center">v.no</p>
        </div>
      </div>
      <div className="w-[100%] h-[calc(40vh-120px)] overflow-y-auto">
        <div className="m-2 bg-white text-black flex py-2">
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            v.no
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            name
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            trip
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            Duratiodddddddddddn
          </p>
          <div className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
            <p className="bg-blue-300 text-white text-center rounded hover:bg-blue-500">
              {" "}
              View
            </p>
          </div>
        </div>
        <div className="m-2 bg-white text-black flex py-2">
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            v.no
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            name
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            trip
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            Duratiodddddddddddn
          </p>
          <div className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
            <p className="bg-blue-300 text-white text-center rounded hover:bg-blue-500">
              {" "}
              View
            </p>
          </div>
        </div>
        <div className="m-2 bg-white text-black flex py-2">
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            v.no
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            name
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            trip
          </p>
          <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            Duratiodddddddddddn
          </p>
          <div className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
            <p className="bg-blue-300 text-white text-center rounded hover:bg-blue-500">
              {" "}
              View
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPEndingVouchers;
