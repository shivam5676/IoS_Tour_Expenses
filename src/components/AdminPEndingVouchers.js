import React from "react";

function AdminPEndingVouchers() {
  return (
    <div className="w-[60%] shadow-md shadow-gray-700 border-2 h-[40vh] m-2 bg-yellow-400 text-black rounded-lg">
      <p className=" border-black border-b-2 py-2 font-bold text-[1.2rem] text-center ">
        Pending Vouchers{" "}
      </p>
      <div className="flex border-b-2 border-black">
        <p className="w-[40px] font-bold px-1 border-r-2 border-gray-400 text-center">
          Id{" "}
        </p>
        <p className="w-[100px] font-bold px-1  border-r-2 border-gray-400 text-center">
          name
        </p>
        <p className="w-[100px] font-bold px-1 border-r-2 border-gray-400 text-center">
          trip
        </p>
        <p className="w-[100px] font-bold px-1 border-r-2 border-gray-400 text-center">
          amount
        </p>
        <p className="">view</p>
      </div>
      <div className="h-[65%] overflow-y-scroll">
        <div className="flex bg-white my-2 py-2">
          <p className="w-[40px]  px-1 text-center">Id </p>
          <p className="w-[100px]  px-1   text-center">
            shivam singh ghghghagg
          </p>
          <p className="w-[100px]  px-1  text-center">trip</p>
          <p className="w-[100px] px-1  text-center">amount</p>
          <div className="flex justify-center items-center">
            <p className="bg-blue-400 mx-4 px-2 rounded-lg text-white">view</p>
          </div>
        </div>
        <div className="flex bg-white my-2 py-2">
          <p className="w-[40px]  px-1 text-center">Id </p>
          <p className="w-[100px]  px-1   text-center">
            shivam singh ghghghagg
          </p>
          <p className="w-[100px]  px-1  text-center">trip</p>
          <p className="w-[100px] px-1  text-center">amount</p>
          <div className="flex justify-center items-center">
            <p className="bg-blue-400 mx-4 px-2 rounded-lg text-white">view</p>
          </div>
        </div>
        <div className="flex bg-white my-2 py-2">
          <p className="w-[40px]  px-1 text-center">Id </p>
          <p className="w-[100px]  px-1   text-center">
            shivam singh ghghghagg
          </p>
          <p className="w-[100px]  px-1  text-center">trip</p>
          <p className="w-[100px] px-1  text-center">amount</p>
          <div className="flex justify-center items-center">
            <p className="bg-blue-400 mx-4 px-2 rounded-lg text-white">view</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPEndingVouchers;
