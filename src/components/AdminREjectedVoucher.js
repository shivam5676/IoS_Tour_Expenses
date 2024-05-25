import React from "react";

function AdminREjectedVoucher(props) {
  return (
    <div className=" w-[40%] min-h-[250px] h-[40vh] m-2 bg-white rounded-lg shadow-md shadow-gray-700 text-center ">
      <p className=" border-white  py-2 font-bold  bg-gradient-to-r from-[#dd2476] to-[#ff7e5f]  text-2xl rounded-t-lg">
        Rejected Voucher
      </p>
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
                {current.id}
              </p>
              <p className="w-[27%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {current.user?.firstName + " " + current.user?.lastName}
              </p>
              <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {current.tourLocation}

              </p>
              <p className="w-[23%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {current.tourDate}
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
      
      </div>
    </div>
  );
}

export default AdminREjectedVoucher;
