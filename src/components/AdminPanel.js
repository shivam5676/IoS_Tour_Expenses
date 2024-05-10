import React from "react";
import AdminSidePanel from "./AdminSidePanel";
import AdminExpenseGraph from "./AdminExpenseGraph";

import AdminPEndingVouchers from "./AdminPEndingVouchers";
import CompletedVouchers from "./completedVouchers";
import AdminREjectedVoucher from "./AdminREjectedVoucher";

function AdminPanel() {
  return (
    <div className="w-[100vw] h-[100vh] text-white bg-gray-300">
      <div className="mx-4 lg:mx-28 flex">
        <AdminSidePanel></AdminSidePanel>
        <div className="w-[100%]  h-[100vh] mx-2 ">
          <div className="flex">
            <AdminExpenseGraph></AdminExpenseGraph>

            <AdminPEndingVouchers></AdminPEndingVouchers>
          </div>
          <div className="flex">
            {" "}
            <CompletedVouchers></CompletedVouchers>
            <AdminREjectedVoucher></AdminREjectedVoucher>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
