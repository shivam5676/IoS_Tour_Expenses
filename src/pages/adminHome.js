import AdminExpenseGraph from "../components/AdminExpenseGraph";
import CompletedVouchers from "../components/completedVouchers";
import AdminREjectedVoucher from "../components/AdminREjectedVoucher";
import AdminPEndingVouchers from "../components/AdminPEndingVouchers";
import Context from "../store/Context";
import axios from "axios";
// import Context from "../store/Context";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RotatingSquare } from "react-loader-spinner";
const AdminHome = () => {
  const [data, setData] = useState([]);
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const ctx = useContext(Context);
  const allVoucherData = ctx.allVoucherData;
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("token"));
  const [loadingPendingDAta, setLoadingPendingData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/AllVoucher`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );

        const res = response.data.userList;
        if (response?.data?.userList) {
          ctx.AllVoucher(response.data.userList);
        }
        setLoadingPendingData(true);
      } catch (err) {
        console.log(err);
        toast.error("something went wrong while getting data");
      }
    }
    fetchData();
  }, []);
  const vouchers = { pending: [], accepted: [], rejected: [] };
  const allData = [...allVoucherData];
  allData?.forEach((current) => {
    if (current.status === "Pending") {
      vouchers.pending.push(current);
    } else if (current.status === "Accepted") {
      vouchers.accepted.push(current);
    } else if (current.status === "Rejected") {
      vouchers.rejected.push(current);
    }
  });
  return (
    <>
      {!loadingPendingDAta && (
        <div className="flex flex-col justify-center items-center  h-[calc(100vh-120px)] w-[100%] font-bold text-[1.2rem]">
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
        <section className="main-content flex-1 bg-white pt-5 md:pt-3 md:mt-2 pb-24 md:pb-5 ">
          <div className="flex flex-col min-[689px]:flex-row  mx-2 min-[1000px]:mx-12">
            <AdminExpenseGraph></AdminExpenseGraph>
            <AdminPEndingVouchers
              pending={vouchers.pending}
            ></AdminPEndingVouchers>
          </div>
          <div className="flex flex-col min-[689px]:flex-row  mx-2 min-[1000px]:mx-12">
            <CompletedVouchers accepted={vouchers.accepted}></CompletedVouchers>
            <AdminREjectedVoucher
              rejected={vouchers.rejected}
            ></AdminREjectedVoucher>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminHome;
