import React, { useEffect, useState } from "react";
import VoucherViewer from "./VoucherViewer";
import pendingGif from "../assests/computer.gif";
import axios from "axios";

function AccountDepartment() {
  const [PendingVoucherData, setPendingVoucherData] = useState(null);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const user = JSON.parse(localStorage.getItem("token"));
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/getPaymentVoucher`, {
          token: user.access_token,
          domain: user.domain,
        });
        const res = response.data.vouchers;
        // if (response?.data?.userList) {
        //   ctx.AllVoucher(response.data.userList);
        // }
        setPendingVoucherData(res)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="w-[100%] h-[100%] flex  p-[10px] ">
      <div className="w-[100%] max-w-[100%] h-[400px] bg-white  rounded-t-lg  shadow-md shadow-gray-700  mx-2 min-[1000px]:mx-12">
      <VoucherViewer
        close={() => {
          setOpen(!open);
        }}
        voucherId={Id}
        open={open}
      ></VoucherViewer>
      <p className={` py-2 font-bold text-2xl text-center rounded-t-lg text-white CARDHEADERCOLOR font-sans`}>
        All Vouchers{" "}
      </p>{" "}
      {!PendingVoucherData && (
        <>
          <div className="w-[100%] h-[calc(40vh-90px)] min-h-[calc(250px-90px)] text-black flex justify-center items-center flex-col">
            <img src={pendingGif} className="h-[80px]" draggable={false}></img>
            <p className="font-bold  text-xl">no Pending Voucher </p>
          </div>
        </>
      )}
     {PendingVoucherData&& <>
        <div className="w-[100%]">
          <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center border-b-2">
            <p className="w-[13%] px-1">V.no</p>
            <p className="w-[27%] px-1">Name</p>
            <p className="w-[25%] px-1">Trip</p>
            <p className="w-[20%] px-1">Date</p>
            <p className="w-[15%] px-1 text-center"></p>
          </div>
        </div>
        <div className="w-full h-[calc(40vh-90px)] min-h-[calc(250px-90px)] overflow-y-auto bg-gray-100 rounded-lg shadow-md">
  {PendingVoucherData?.map((current, index) => (
    <div
      key={current.id}
      className={`mx-2 my-1 py-1 px-2 flex items-center rounded-lg shadow-sm transition-all duration-200 ease-in-out ${
        index % 2 === 0 ? "bg-white" : "bg-gray-200"
      }`}
    >
      <p className="w-[13%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {current.id}
      </p>
      <p className="w-[27%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {current.user?.firstName}
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

      </>}
      </div>
    </div>
  );
}

export default AccountDepartment;
