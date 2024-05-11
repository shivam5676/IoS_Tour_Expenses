import React from "react";

function AdminREjectedVoucher() {
  return (
    <div className="rounded-lg shadow-md shadow-gray-700 w-[40%] h-[40vh] m-2 bg-red-400">
      <p className=" border-white border-b-2 py-2 font-bold text-[1.2rem]  h-[40px] text-center ">
        Rejected Vouchers
      </p>
      <div className="w-[100%]">
        <div className="m-2 bg-white text-black flex h-[40px] font-bold items-center ">
          <p className="w-[25%] px-1">v.no</p>
          <p className="w-[25%] px-1">name</p>

          <p className="w-[25%] px-1">trip</p>
          <p className="w-[25%] px-1">view</p>
        </div>
      </div>
      <div className="w-[100%] h-[calc(40vh-120px)] overflow-y-auto">
        <div className="m-2 bg-white text-black flex py-2">
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            v.no
          </p>
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            name
          </p>
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            trip
          </p>
          <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
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

export default AdminREjectedVoucher;
