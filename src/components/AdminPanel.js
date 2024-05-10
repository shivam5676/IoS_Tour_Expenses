import React from "react";
import AdminSidePanel from "./AdminSidePanel";
import AdminExpenseGraph from "./AdminExpenseGraph";
import AdminAllVoucherList from "./AdminAllVoucherList";
import AdminPEndingVouchers from "./AdminPEndingVouchers";

function AdminPanel() {
  return (
    <div className="w-[100vw] h-[100vh] bg-black text-white">
      <div className="mx-28 flex">
        <AdminSidePanel></AdminSidePanel>
        <div className="w-[100%]  h-[100vh] mx-2 ">
          <div className="flex">
            <AdminExpenseGraph></AdminExpenseGraph>

            <AdminPEndingVouchers></AdminPEndingVouchers>
          </div>

          <AdminAllVoucherList></AdminAllVoucherList>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
