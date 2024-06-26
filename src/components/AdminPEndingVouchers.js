import React, { useContext, useState } from "react";
import Context from "../store/Context";
import VoucherViewer from "./VoucherViewer";
import pendingGif from "../assests/metaverse.gif";
function AdminPEndingVouchers(props) {
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const ctx = useContext(Context);

  // console.log(id);
  return (
    <div className="shadow-md shadow-gray-700 w-[100%]  min-[689px]:w-[60%]  min-h-[250px] h-[40vh]  bg-white min-[689px]:m-2 my-2 rounded-lg">
      <VoucherViewer
        close={() => {
          setOpen(!open);
        }}
        voucherId={Id}
        open={open}
      ></VoucherViewer>{" "}
      <p className=" py-2 font-bold text-2xl text-center rounded-t-lg text-white  bg-[#2fc7f8] font-sans ">
        Pending Vouchers{" "}
      </p>
      {props.pending.length == 0 && (
        <>
          <div className="w-[100%] h-[calc(40vh-90px)] min-h-[calc(250px-90px)] text-black flex justify-center items-center flex-col">
            <img src={pendingGif} className="h-[80px]" draggable={false}></img>
            <p className="font-bold">no Pending Voucher </p>
          </div>
        </>
      )}
      {props?.pending.length > 0 && (
        <>
          {" "}
          <div className="w-[100%]">
            <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center border-b-2 ">
              <p className="w-[13%] px-1">V.no</p>
              <p className="w-[27%] px-1">Name</p>
              <p className="w-[25%] px-1">Trip</p>
              <p className="w-[20%] px-1">Date</p>
              <p className="w-[15%] px-1 text-center"></p>
            </div>
          </div>
          <div className="w-[100%]  h-[calc(40vh-90px)] min-h-[calc(250px-90px)] overflow-y-auto">
            {props.pending.map((current) => {
              console.log(current);
              return (
                <div className="mx-2 bg-white text-black flex py-1 text-[.8rem] font-semibold">
                  <p className="w-[13%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.Voucher.id}
                  </p>
                  <p className="w-[27%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.user?.firstName}
                  </p>
                  <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.Voucher.tourLocation}
                  </p>
                  <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.Voucher.tourDate}
                  </p>
                  <div className="w-[15%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                    <p
                      className="bg-blue-500 text-white font-bold text-center rounded hover:bg-blue-700  cursor-pointer"
                      onClick={() => {
                        setOpen(true);
                        setId(current.Voucher.id);
                      }}
                    >
                      View
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPEndingVouchers;
