import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import Context from "../store/Context";
import VoucherViewer from "../VoucherViewer";
import pendingGif from "../../assests/computer.gif";
import { toast } from "react-toastify";
import { RotatingSquare } from "react-loader-spinner";
// import UserPendingVouchers from "./userPendingVouchers";

function UserPendingVouchers(props) {
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState(null);
  const [PendingVoucherData, setPendingVoucherData] = useState(null);
  const [loadingPendingDAta, setLoadingPendingData] = useState(false);
  //   const ctx = useContext(Context);
  const user = JSON.parse(localStorage.getItem("token"));
  const connectionUrl = process.env.REACT_APP_BACKEND_URL;
  // const [id,setId]=useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          `${connectionUrl}/user/getPendingvouchers`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );
        const res = response.data.userList;

 
        setPendingVoucherData(res);
        setLoadingPendingData(true);
        // if (response?.data?.userList) {
        //   ctx.AllVoucher(response.data.userList);
        // }
      } catch (err) {
        console.log(err);
        toast.error("something went wrong ...try after sometime");
      }
    }
    fetchData();
  }, []);
  return (
    <div className=" w-[100%] max-w-[100%]  min-h-[250px] h-[40vh]  bg-white my-2 ">
      {!loadingPendingDAta && (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-120px)] font-bold text-[1.2rem]">
          <RotatingSquare
            visible={true}
            height="100"
            width="100"
            color="#2980b9"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>fetching tour vouchers ...</p>
        </div>
      )}
      {loadingPendingDAta && (
        <div className="mx-2 shadow-md shadow-gray-700 h-[100%]  rounded-lg   min-[1000px]:mx-14">
          <VoucherViewer
            close={() => {
              setOpen(!open);
            }}
            voucherId={Id}
            open={open}
          ></VoucherViewer>
          <p
            className={` py-2 font-bold text-2xl md:text-3xl  text-center rounded-t-lg text-white CARDHEADERCOLOR font-sans`}
          >
            Your Vouchers{" "}
          </p>{" "}
         
          {PendingVoucherData.length==0 && (
            <>
              <div className="w-[100%] h-[calc(40vh-90px)] min-h-[calc(250px-90px)] text-black flex justify-center items-center flex-col">
                <img
                  src={pendingGif}
                  className="h-[80px]"
                  draggable={false}
                ></img>
                <p className="font-bold  text-xl">no Pending Voucher </p>
              </div>
            </>
          )}
          {PendingVoucherData.length>0 && (
            <>
              <div className="w-[100%]">
                <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center border-b-2">
                  <p className="w-[20%] px-1">V.no</p>
                  {/* <p className="w-[27%] px-1">Name</p> */}
                  <p className="w-[30%] px-1">Trip</p>
                  <p className="w-[25%] px-1">Date</p>
                  <p className="w-[25%] px-1 text-center"></p>
                </div>
              </div>
              <div className="w-full h-[calc(40vh-90px)] min-h-[calc(250px-90px)] overflow-y-auto bg-gray-100 rounded-lg shadow-md">
                {PendingVoucherData?.map((current, index) => {
                  return (
                    <div
                      key={current.id}
                      className={`mx-2 my-1 py-1 hover:bg-blue-300 md:font-semibold cursor-pointer px-2 flex items-center rounded-lg shadow-sm transition-all duration-200 ease-in-out ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-200"
                      }`}
                      onClick={() => {
                        setOpen(true);
                        setId(current.id);
                      }}
                    >
                      <p className="w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {current.id}
                      </p>

                      <p className="w-[30%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {current.tourLocation}
                      </p>
                      <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {current.tourDate}
                      </p>
                      <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <p
                          className="bg-blue-500 text-white max-[400px]:text-[.75rem] max-[400px]:font-semibold md:font-bold text-center rounded hover:bg-blue-700 cursor-pointer transition-all duration-200 ease-in-out"
                          onClick={() => {
                            setOpen(true);
                            setId(current.id);
                          }}
                        >
                          {current.statusType}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserPendingVouchers;
