import React, { useState } from "react";
import rejectedGif from "../assests/payment.gif";
import VoucherViewer from "./VoucherViewer";
function AdminREjectedVoucher(props) {
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  return (
    <div className=" w-[40%] min-h-[250px] h-[40vh] m-2 bg-white rounded-lg shadow-md shadow-gray-700 text-center ">
       <VoucherViewer
        close={() => {
          setOpen(!open);
        }}
        voucherId={Id}
        open={open}
      ></VoucherViewer>{" "}
      <p className=" border-white  py-2 font-bold bg-[#44dbbb]  text-2xl rounded-t-lg">
        Rejected Voucher
      </p>
      {props.rejected.length == 0 && (
        <>
          <div className="w-[100%] h-[calc(40vh-90px)] min-h-[calc(250px-90px)] text-black flex justify-center items-center flex-col">
            <img src={rejectedGif} className="h-[80px]" draggable={false}></img>
            <p className="font-bold">no Rejected Voucher </p>
          </div>
        </>
      )}
      {props.rejected.length > 0 && (
        <>
          <div className="w-[100%]">
            <div className="m-2 bg-white text-black flex  font-bold items-center">
              <p className="w-[10%] px-1">v.no</p>
              <p className="w-[27%] px-1">name</p>
              <p className="w-[25%] px-1">trip</p>
              <p className="w-[23%] px-1">Date</p>
              <p className="w-[15%] px-1 text-center"></p>
            </div>
          </div>
          <div className="w-[100%] h-[calc(40vh-90px)] min-h-[calc(250px-90px)] overflow-y-auto">
            {props.rejected.map((current) => {
              return (
                <div className="mx-2 bg-white text-black flex py-1 text-[.8rem] font-semibold">
                  <p className="w-[10%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.Voucher?.id}
                  </p>
                  <p className="w-[27%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.user?.firstName + " " + current.user?.lastName}
                  </p>
                  <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.Voucher.tourLocation}
                  </p>
                  <p className="w-[23%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {current.Voucher.tourDate}
                  </p>
                  <div className="w-[15%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                    <p
                      className="bg-blue-500 text-white font-bold text-center rounded hover:bg-blue-700"
                      onClick={() => {
                        setOpen(true);
                        setId(current.Voucher.id);
                      }}
                    >
                      {" "}
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

export default AdminREjectedVoucher;
