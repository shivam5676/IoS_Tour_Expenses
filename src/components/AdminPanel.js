"use strict";
import React, { useContext, useEffect, useState } from "react";
import AdminSidePanel from "./AdminSidePanel";
import AdminExpenseGraph from "./AdminExpenseGraph";

import AdminPEndingVouchers from "./AdminPEndingVouchers";
import CompletedVouchers from "./completedVouchers";
import AdminREjectedVoucher from "./AdminREjectedVoucher";
import axios from "axios";
import Context from "../store/Context";
import bgImage from "../assests/images/bg1.jpg";
import VoucherViewer from "./VoucherViewer";

function AdminPanel() {
  const [data, setData] = useState([]);
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const ctx = useContext(Context);
  const allVoucherData = ctx.allVoucherData;
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/AllVoucher`, {
          token: user.access_token,
          domain: user.domain,
        });
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
  // console.log(vouchers);
  // const dataArrayLength = {
  //   Accepted: vouchers.accepted?.length,
  //   Rejected: vouchers.rejected?.length,
  //   Pending: vouchers.pending?.length,
  // };
  // console.log(dataArrayLength, vouchers);
  return (
    <div className="w-[100vw] h-[100vh] text-white font-['Poppins'] pt-[90px] bg-transparent">
      {/* <VoucherViewer openModal={open} closeModal={()=>setOpen(!open)}></VoucherViewer> */}
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 min-[1200px]:mx-28 min-[1500px] flex">
        <AdminSidePanel></AdminSidePanel>
        <div
          className="w-[100%] h-[calc(100vh-90px)] mx-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col min-[689px]:flex-row">
            <AdminExpenseGraph
              // dataArrayLength={dataArrayLength}
            ></AdminExpenseGraph>

            <AdminPEndingVouchers
              pending={vouchers.pending}
            ></AdminPEndingVouchers>
          </div>
          <div className="flex flex-col min-[689px]:flex-row">
            {" "}
            <CompletedVouchers accepted={vouchers.accepted}></CompletedVouchers>
            <AdminREjectedVoucher
              rejected={vouchers.rejected}
            ></AdminREjectedVoucher>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
