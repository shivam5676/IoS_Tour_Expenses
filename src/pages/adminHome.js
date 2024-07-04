import AdminExpenseGraph from "../components/AdminExpenseGraph";
import CompletedVouchers from "../components/completedVouchers";
import AdminREjectedVoucher from "../components/AdminREjectedVoucher";
import AdminPEndingVouchers from "../components/AdminPEndingVouchers";
import Context from "../store/Context";
import axios from "axios";
// import Context from "../store/Context";
import React, { useContext, useEffect, useState } from "react";
const AdminHome = () => {
  const [data, setData] = useState([]);
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const ctx = useContext(Context);
  const allVoucherData = ctx.allVoucherData;
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("token"));

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
      } catch (err) {
        console.log(err);
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
    <section className="main-content flex-1 bg-gray-100 pt-5 md:pt-3 md:mt-2 pb-24 md:pb-5 ">
      <div className="flex flex-col min-[689px]:flex-row">
        <AdminExpenseGraph></AdminExpenseGraph>
        <AdminPEndingVouchers pending={vouchers.pending}></AdminPEndingVouchers>
      </div>
      <div className="flex flex-col min-[689px]:flex-row">
        <CompletedVouchers accepted={vouchers.accepted}></CompletedVouchers>
        <AdminREjectedVoucher
          rejected={vouchers.rejected}
        ></AdminREjectedVoucher>
      </div>
    </section>
  );
};

export default AdminHome;
