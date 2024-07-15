import React, { useContext, useEffect } from "react";
// import AdminUserList from "./AdminUserList";
import UserProfile from "../components/userProfile";
import AdminExpenseGraph from "../components/AdminExpenseGraph";
import UsersAllVouchers from "../components/usersAllVouchers";
import { Fragment, useRef, useState } from "react";

import Context from "../store/Context";
import AdminUserList from "../components/AdminUserList";
import axios from "axios";
import { RotatingSquare } from "react-loader-spinner";
const AdminUserPanel = () => {
  const [showData, setShowData] = useState(false);
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const user = JSON.parse(localStorage.getItem("token"));
  const cancelButtonRef = useRef(null);
  const [loadingPendingDAta, setLoadingPendingData] = useState(false);
  const ctx = useContext(Context);
  useEffect(() => {
    console.log("executing");
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/getAllUser`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );

        ctx.addUserData(response.data.users);
        setLoadingPendingData(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {" "}
      {!loadingPendingDAta && (
        <div className="flex flex-col justify-center items-center  h-[calc(100vh-120px)] w-[100%] font-bold text-[1.2rem]">
          <RotatingSquare
            visible={true}
            height="100"
            width="100"
            color="#2980b9"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>fetching tour vouchers ...</p>
        </div>
      )}
      {loadingPendingDAta && (
        <section className="main-content flex-1 bg-white pt-5 md:pt-3 md:mt-2 pb-24 md:pb-5 ">
          <div className="flex  flex-col min-[689px]:flex-row  mx-2 min-[1000px]:mx-12">
            <AdminUserList showData={() => setShowData(true)}></AdminUserList>
            {showData && <UserProfile></UserProfile>}
          </div>
          <div className="flex  flex-col min-[689px]:flex-row  mx-2 min-[1000px]:mx-12">
            {" "}
            {showData && <AdminExpenseGraph></AdminExpenseGraph>}{" "}
            {showData && <UsersAllVouchers></UsersAllVouchers>}{" "}
          </div>
        </section>
      )}
    </>
  );
};

export default AdminUserPanel;
