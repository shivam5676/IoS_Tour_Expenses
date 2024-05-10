import React from "react";
import AdminSidePanel from "./AdminSidePanel";
import { RiUserSearchFill } from "react-icons/ri";
function AdminUserManageMent() {
  return (
    <div className="w-[100vw] h-[100vh] bg-black text-white">
      <div className="mx-28 flex">
        <AdminSidePanel></AdminSidePanel>
        <div className="w-[100%]  h-[100vh] mx-2 ">
          <div className="flex flex-col  h-full">
            <div className="m-2 border-2   flex justify-evenly">
              <p className=" p-2">All users</p>
              <div className="p-2 flex ">
                <input
                  className="bg-transparent border-2 px-2"
                  placeholder="search user by name "
                ></input>
                <div className="bg-white">
                  <RiUserSearchFill className="text-black w-[30px] h-[30px]" />
                </div>
              </div>
            </div>
            <div className="border-2 m-2 h-[300px]">user will go here</div>
            {/* <AdminExpenseGraph></AdminExpenseGraph>

          <AdminPEndingVouchers></AdminPEndingVouchers> */}
          </div>

          {/* <AdminAllVoucherList></AdminAllVoucherList> */}
        </div>
      </div>
    </div>
  );
}

export default AdminUserManageMent;
