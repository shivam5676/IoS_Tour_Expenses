import React from "react";

import { useRef, useState } from "react";
import AdminUserList from "../AdminUserList";
import UserProfile from "../userProfile";
import UserSidePanel from "./UserSidePanel";
import UserPendingVouchers from "./userPendingVouchers";

function UserVoucherPanel() {

 
  return (
    <>
      <div className="w-[100vw] h-[100vh] text-white bg-transparent font-['Poppins']  pt-[90px]">
        <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 flex">
          <UserSidePanel></UserSidePanel>
          <div
            className="w-[100%]  h-[calc(100vh-90px)]  overflow-y-scroll "
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex">
              {/* <AdminUserList></AdminUserList> */}
              <UserPendingVouchers></UserPendingVouchers>
              {/* <UserProfile></UserProfile> */}
            </div>
            <div className="flex">
              {" "}
              {/* <AdminExpenseGraph></AdminExpenseGraph>
              <UsersAllVouchers></UsersAllVouchers> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserVoucherPanel;
