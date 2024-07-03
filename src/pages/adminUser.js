import React, { useContext } from "react";
// import AdminUserList from "./AdminUserList";
import UserProfile from "../components/userProfile";
import AdminExpenseGraph from "../components/AdminExpenseGraph";
import UsersAllVouchers from "../components/usersAllVouchers";
import { Fragment, useRef, useState } from "react";

import Context from "../store/Context";
import AdminUserList from "../components/AdminUserList";
const AdminUserPanel = () => {
  const [showData, setShowData] = useState(false);

  const cancelButtonRef = useRef(null);

  const ctx = useContext(Context);

  return (
    <section className="main-content flex-1 bg-gray-100 pt-5 md:pt-3 md:mt-2 pb-24 md:pb-5">
      <div className="flex  flex-col min-[689px]:flex-row">
        <AdminUserList showData={() => setShowData(true)}></AdminUserList>
        {showData && <UserProfile></UserProfile>}
      </div>
      <div className="flex  flex-col min-[689px]:flex-row">
        {" "}
        {showData && <AdminExpenseGraph></AdminExpenseGraph>}{" "}
        {showData && <UsersAllVouchers></UsersAllVouchers>}{" "}
      </div>
    </section>
  );
};

export default AdminUserPanel;
