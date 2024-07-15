import React, { useContext, useState } from "react";
import Context from "../store/Context";
import VoucherViewer from "./VoucherViewer";

function UsersAllVouchers() {
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const ctx = useContext(Context);

  return (
    <div className="shadow-md shadow-gray-700 w-[100%]  min-[689px]:w-[60%]  min-h-[250px] h-[40vh]  bg-white min-[689px]:m-2 my-2 rounded-lg">
      {" "}
      <VoucherViewer
        close={() => {
          setOpen(!open);
        }}
        voucherId={Id}
        open={open}
      ></VoucherViewer>{" "}
      <p className=" py-2 font-bold text-2xl md:text-3xl text-center  rounded-t-lg text-white  bg-[#2980b9] font-sans">
        {ctx.adminCurrentUserData?.firstName}`s Vouchers{" "}
      </p>{" "}
      {ctx.adminCurrentUserData?.Vouchers?.length == 0 && <div className="flex justify-center items-center h-[100%] font-bold">No Voucher to display</div>}
      {ctx.adminCurrentUserData?.Vouchers?.length > 0 && (
        <>
          {" "}
          <div className="w-[100%]">
            <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center border-b-2">
              <p className="w-[20%] px-1">V.no</p>
              <p className="w-[20%] px-1">Status</p>
              <p className="w-[25%] px-1">Trip</p>
              <p className="w-[20%] px-1">Date</p>
              <p className="w-[15%] px-1 text-center"></p>
            </div>
          </div>
          <div className="w-full h-[calc(40vh-90px)] min-h-[calc(250px-90px)] overflow-y-auto bg-gray-100 rounded-lg shadow-md">
            {ctx?.adminCurrentUserData?.Vouchers?.map((current, index) => (
              <div
                key={current.id}
                className={`mx-2 my-1 py-1 px-2 flex items-center rounded-lg shadow-sm transition-all duration-200 ease-in-out ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-200"
                }`}
              >
                <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {current.id}
                </p>
                <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {current.statusType}
                </p>
                <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {current.tourLocation}
                </p>
                <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {current.tourDate}
                </p>
                <div className="w-[15%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  <p
                    className="bg-blue-500 text-white font-bold text-center rounded hover:bg-blue-700 cursor-pointer transition-all duration-200 ease-in-out"
                    onClick={() => {
                      setOpen(true);
                      setId(current.id);
                    }}
                  >
                    View
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersAllVouchers;
