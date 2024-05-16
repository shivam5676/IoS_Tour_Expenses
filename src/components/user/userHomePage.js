import React from "react";
import UserSidePanel from "./UserSidePanel";
import UserExpensesGraph from "./UserExpensesGraph";
import UsersTour from "./UsersTour";
import UserExpenseList from "./UserExpenseList";

function UserHomePage() {
  return (
    <div className="w-[100vw] h-[100vh] text-white bg-gray-300 font-['Poppins'] pt-[90px]">
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 flex">
      <UserSidePanel></UserSidePanel>
        <div className="w-[100%]  h-[calc(100vh-90px)] mx-2 overflow-y-auto" style={{scrollbarWidth:"none"}}>
          <div className="flex">
            <UsersTour></UsersTour>
            <UserExpensesGraph></UserExpensesGraph>
            {/* <AdminExpenseGraph
              dataArrayLength={dataArrayLength}
            ></AdminExpenseGraph>

            <AdminPEndingVouchers
              pending={vouchers.pending}
            ></AdminPEndingVouchers> */}
          </div>
          <div className="flex">
            <UserExpenseList></UserExpenseList>
            {" "}
            {/* <CompletedVouchers accepted={vouchers.accepted}></CompletedVouchers> */}
            {/* <AdminREjectedVoucher
              rejected={vouchers.rejected}
            ></AdminREjectedVoucher> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
