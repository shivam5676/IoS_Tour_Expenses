import React from "react";
import AdminSidePanel from "./AdminSidePanel";
import AdminUserList from "./AdminUserList";
import UserProfile from "./userProfile";
import AdminExpenseGraph from "./AdminExpenseGraph";
import UsersAllVouchers from "./usersAllVouchers";

function AdminUserPanel() {
  return (
    <div className="w-[100vw] h-[100vh] text-white bg-gray-300">
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 flex">
        <AdminSidePanel></AdminSidePanel>
        <div className="w-[100%]  h-[100vh] mx-2 ">
          <div className="flex">
            <AdminUserList></AdminUserList>
            <UserProfile></UserProfile>
          </div>
          <div className="flex">
            {" "}
           <AdminExpenseGraph></AdminExpenseGraph>
           <UsersAllVouchers></UsersAllVouchers>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserPanel;
