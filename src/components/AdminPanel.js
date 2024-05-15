import React, { useContext, useEffect } from "react";
import AdminSidePanel from "./AdminSidePanel";
import AdminExpenseGraph from "./AdminExpenseGraph";

import AdminPEndingVouchers from "./AdminPEndingVouchers";
import CompletedVouchers from "./completedVouchers";
import AdminREjectedVoucher from "./AdminREjectedVoucher";
import axios from "axios";
import Context from "../store/Context";

function AdminPanel() {
  const connectionUrl = "http://localhost:2000";
  const ctx = useContext(Context);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${connectionUrl}/admin/AllVoucher`);
        console.log(response.data.userList);
        ctx.AllVoucher(response.data.userList);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const vouchers = { pending: [], accepted: [], rejected: [] };
  ctx.allVoucherData?.forEach((current) => {
    if ((current.statusType = "Pending")) {
      vouchers.pending.push(current);
    } else if ((current.statusType = "Accepted")) {
      vouchers.accepted.push(current);
    } else if ((current.statusType = "Rejected")) {
      vouchers.rejected.push(current);
    }
  });
  console.log(vouchers);
  const dataArrayLength = {
    accepted: vouchers.accepted?.length,
    rejected: vouchers.rejected?.length,
    pending: vouchers.pending?.length,
  };
  return (
    <div className="w-[100vw] h-[100vh] text-white bg-gray-300 font-['Poppins']">
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 flex">
        <AdminSidePanel></AdminSidePanel>
        <div className="w-[100%]  h-[100vh] mx-2 overflow-y-auto">
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
