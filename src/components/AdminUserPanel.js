import React, { useContext } from "react";
import AdminSidePanel from "./AdminSidePanel";
import AdminUserList from "./AdminUserList";
import UserProfile from "./userProfile";
import AdminExpenseGraph from "./AdminExpenseGraph";
import UsersAllVouchers from "./usersAllVouchers";
import SignUpModal from "./SignUpModal";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Context from "../store/Context";
function AdminUserPanel() {
  const [showData, setShowData] = useState(false);

  const cancelButtonRef = useRef(null);
  // const ctx=useContext()
  const ctx = useContext(Context);

  return (
    <>
      <div className="w-[100vw] h-[100vh] text-white bg-transparent font-['Poppins']  pt-[90px]">
        <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-1 min-[1200px]:mx-28 flex">
         <AdminSidePanel></AdminSidePanel>
          <div
            className="w-[100%]  h-[calc(100vh-90px)] mx-2 overflow-y-scroll "
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex  flex-col min-[689px]:flex-row">
              <AdminUserList showData={() => setShowData(true)}></AdminUserList>
              {showData && <UserProfile></UserProfile>}
            </div>
            <div className="flex  flex-col min-[689px]:flex-row">
              {" "}
              {showData && <AdminExpenseGraph></AdminExpenseGraph>}{" "}
              {showData && <UsersAllVouchers></UsersAllVouchers>}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUserPanel;
