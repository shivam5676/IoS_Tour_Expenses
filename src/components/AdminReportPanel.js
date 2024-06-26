import React, { useEffect, useRef, useState } from "react";
import AdminSidePanel from "./AdminSidePanel";
import DatePicker from "react-datepicker";
import axios from "axios";
import YearWiseReportGeneration from "./YearWiseReportGeneration";
import UserWiseReportGeneration from "./UserWiseReportGeneration";
import TokenWiseReport from "./tokenWiseReport";
import { format } from "date-fns";

function AdminReportPanel() {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;

  const [startDate, setStartDate] = useState(new Date());
  const [reportType, setReportType] = useState("All");
  const [formattedDate, setFormattedDate] = useState(null);
  const userIdRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [voucherId, setVoucherId] = useState(null);
  const voucherIdRef = useRef(null);
  // const [chartData, setChartData] = useState({});
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setFormattedDate(null);
  };
  const handleDateChange = (date) => {
    console.log("fuction triggered");
    setStartDate(date);

    // Format the date based on the report type
    let formatted;
    if (reportType === "mm/yyyy") {
      formatted = format(date, "MM/yyyy");
    } else if (reportType === "yyyy") {
      formatted = format(date, "yyyy");
    } else {
      formatted = format(date, "MM/dd/yyyy");
    }
    setFormattedDate(formatted);
  };
  const getDatePickerFormat = (reportType) => {
    if (reportType === "mm/yyyy") {
      return "MM/yyyy";
    } else if (reportType === "yyyy") {
      return "yyyy";
    }
    return "MM/dd/yyyy";
  };
  const userIdHandler = (e) => {
    const value = e.target.value;
    // Allow only digits
    if (/^\d*$/.test(value)) {
      setUserId(value);
    }
    // userIdRef.current = e.target.value;
  };
  const searchUserHandler = () => {
    userIdRef.current = userId;
    setUserId(+userIdRef.current);
  };
  return (
    <div className="w-[100vw] h-[100vh]  text-white bg-transparent  py-[90px]">
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 flex">
        <AdminSidePanel></AdminSidePanel>
        <div
          className="w-[100%]  mx-2 h-[calc(100vh-90px)] overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          {/* <p className="absolute bottom-4 right-4">
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">
              Download Report
            </button>
          </p> */}
          <div className="flex">
            <div className="flex w-[100%]  flex-col md:flex-row m-2 bg-gradient-to-r from-[#1e5aba] to-[#0884e9] rounded-md">
              <p className="p-2 font-bold text-2xl text-center">Report Generation :</p>
              <div className="flex justify-center py-2 max-[400px]:flex-col max-[400px]:items-center">
                {" "}
                <div className="flex items-center text-yellow-400 font-bold max-[400px]:py-2">
                  <select
                    className="border-2 border-white bg-transparent px-2 font-bold"
                    onChange={handleReportTypeChange}
                  >
                    <option
                      value="yyyy"
                      className="bg-gray-500 text-white font-semibold"
                    >
                      Year wise
                    </option>
                    <option
                      value="user"
                      className="bg-gray-500 text-white font-semibold"
                    >
                      User wise
                    </option>
                    <option
                      value="token"
                      className="bg-gray-500 text-white font-semibold"
                    >
                      Voucher wise
                    </option>{" "}
                    <option
                      value="mm/yyyy"
                      className="bg-gray-500 text-white font-semibold"
                    >
                      Month wise
                    </option>
                    <option
                      value="All"
                      className="bg-gray-500 text-white font-semibold"
                    >
                      All Time
                    </option>
                  </select>
                </div>
                {reportType !== "All" &&
                  reportType !== "user" &&
                  reportType !== "token" && (
                    <div className="flex items-center text-yellow-400 font-bold">
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        dateFormat={getDatePickerFormat(reportType)}
                        showMonthYearPicker={reportType === "mm/yyyy"}
                        showYearPicker={reportType === "yyyy"}
                        className="bg-transparent border-white border-2 mx-2 px-2 w-[100px]"
                      />
                    </div>
                  )}
                {reportType == "user" && (
                  <div className="flex items-center text-yellow-400 font-bold ">
                    <input
                      value={userId}
                      className="bg-transparent border-white border-2 mx-2 w-[100px] px-2 text-white"
                      placeholder="enter user id here"
                      onChange={userIdHandler}
                    ></input>
                    <p
                      className="bg-yellow-300 text-black text-[.9rem] px-2 py-1 rounded-md cursor-pointer hover:text-gray-500"
                      onClick={() => {
                        searchUserHandler();
                      }}
                    >
                      search
                    </p>
                  </div>
                )}
                {reportType == "token" && (
                  <div className="flex items-center text-yellow-400 font-bold ">
                    <input
                      className="bg-transparent border-white border-2 mx-2 w-[100px] px-2 text-white"
                      placeholder="enter Voucher Token "
                      ref={voucherIdRef}
                    ></input>
                    <p
                      className="bg-yellow-300 text-black text-[.9rem] px-2 py-1 rounded-md cursor-pointer hover:text-gray-500"
                      onClick={() => {
                        setVoucherId(voucherIdRef.current.value);
                      }}
                    >
                      search
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[100%] ">
            {reportType === "yyyy" && formattedDate && (
              <YearWiseReportGeneration
                selectedYear={formattedDate}
              ></YearWiseReportGeneration>
            )}
            {/* {reportType === "mm/yyyy" && formattedDate && (
              <YearWiseReportGeneration
                selectedYear={formattedDate}
              ></YearWiseReportGeneration>
            )} */}
            {reportType === "user" && userIdRef.current && (
              <UserWiseReportGeneration
                userId={userId}
              ></UserWiseReportGeneration>
            )}
            {reportType === "token" && voucherIdRef.current?.value && (
              <TokenWiseReport voucherId={voucherId}></TokenWiseReport>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReportPanel;
