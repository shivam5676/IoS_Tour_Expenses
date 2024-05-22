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
  const connectionUrl = "http://localhost:2000";
  const ctx = useContext(Context);
  const allVoucherData = ctx.allVoucherData;
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${connectionUrl}/admin/AllVoucher`, {
          token: user.access_token,
          domain: user.domain,
        });
        const res = response.data.userList;
        console.log(res);
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
  console.log(allData);
  allData?.forEach((current) => {
    console.log(current);
    if (current.statusType === "Pending") {
      vouchers.pending.push(current);
    } else if (current.statusType === "Accepted") {
      vouchers.accepted.push(current);
    } else if (current.statusType === "Rejected") {
      vouchers.rejected.push(current);
    }
  });
  console.log(vouchers);
  const dataArrayLength = {
    Accepted: vouchers.accepted?.length,
    Rejected: vouchers.rejected?.length,
    Pending: vouchers.pending?.length,
  };
  console.log(dataArrayLength, vouchers);
  return (
    <div className="w-[100vw] h-[100vh] text-white font-['Poppins'] pt-[90px] bg-transparent">
      {/* <VoucherViewer openModal={open} closeModal={()=>setOpen(!open)}></VoucherViewer> */}
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 min-[1500px] flex">
        <AdminSidePanel></AdminSidePanel>
        <div
          className="w-[100%] h-[calc(100vh-90px)] mx-2 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex">
            <AdminExpenseGraph
              dataArrayLength={dataArrayLength}
            ></AdminExpenseGraph>

            <AdminPEndingVouchers
              pending={vouchers.pending}
            ></AdminPEndingVouchers>
          </div>
          <div className="flex">
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
