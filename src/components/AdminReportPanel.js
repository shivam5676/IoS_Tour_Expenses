import React, { useEffect, useState } from "react";
import AdminSidePanel from "./AdminSidePanel";
import DatePicker from "react-datepicker";
import LineChart from "./lineChart";
import axios from "axios";
function AdminReportPanel() {
  const connectionUrl = "http://localhost:2000";

  const [startDate, setStartDate] = useState(new Date());
  const [reportType, setReportType] = useState("All");
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };
  console.log(reportType);
  useEffect(() => {

    async function fetchFilterData() {
      try {
        const response = await axios.post(`${connectionUrl}/admin/year?year=${2024}`);
        console.log(response.data);
        // ctx.AllVoucher(response.data.userList);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFilterData();

  }, []);
  return (
    <div className="w-[100vw]  text-white bg-purple-300 font-['Poppins'] ">
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 flex">
        <AdminSidePanel></AdminSidePanel>
        <div
          className="w-[100%]  mx-2 h-[100vh] overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          <p className="absolute bottom-4 right-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Generate Report
            </button></p>
          <div className="flex">
            <div className="flex w-[100%] m-2 bg-purple-500">
              <p className="p-2 font-extrabold text-[1.2rem]">
                Report Generation :
              </p>
              <div className="flex items-center text-yellow-400 font-bold">
                <select
                  className="border-2 border-white bg-transparent px-2"
                  onChange={handleReportTypeChange}
                >
                  <option value="All">All Time</option>
                  <option value="yyyy">Year wise</option>
                  <option value="mm/yyyy">Month wise</option>
                  <option value="user">User wise</option>
                  <option value="token">Token wise</option>
                </select>
              </div>
              {reportType != "All" &&
                reportType != "user" &&
                reportType != "token" && (
                  <div className="flex items-center text-yellow-400 font-bold ">
                    {" "}
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat={reportType}
                      className="bg-transparent border-white border-2 mx-2 px-2 w-[100px]"
                    />
                  </div>
                )}
              {reportType == "user" && (
                <div className="flex items-center text-yellow-400 font-bold ">
                  <input
                    className="bg-transparent border-white border-2 mx-2 w-[100px] px-2 text-white"
                    placeholder="enter user id here"
                  ></input>
                  <p className="bg-white text-[.9rem] px-2 py-1 rounded-md">
                    search
                  </p>
                </div>
              )}
              {reportType == "token" && (
                <div className="flex items-center text-yellow-400 font-bold ">
                  <input
                    className="bg-transparent border-white border-2 mx-2 w-[100px] px-2 text-white"
                    placeholder="enter Voucher Token "
                  ></input>
                  <p className="bg-white text-[.9rem] px-2 py-1 rounded-md">
                    search
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-[100%]  mx-2 ">
            {" "}
            <div className="flex">
              <div className="w-[33%] bg-purple-500 font-extrabold text-xl ">
                <p className="p-4 border-b-2 text-center">Total Expense</p>
                <div className="flex justify-center items-center text-3xl  h-[100px]">
                  <p>30k</p>
                </div>
              </div>{" "}
              <div className="w-[31%] bg-purple-500 font-extrabold text-xl mx-2">
                <p className="p-4 border-b-2 text-center">Cash Mode</p>
                <div className="flex justify-center items-center text-3xl  h-[100px]">
                  <p>20k</p>
                </div>
              </div>{" "}
              <div className="w-[31%] bg-purple-500 font-extrabold text-xl">
                <p className="p-4 border-b-2 text-center">Digital mode </p>
                <div className="flex justify-center items-center text-3xl  h-[100px]">
                  <p>10k</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%]  ">
            {" "}
            <div className="flex mt-3 items-center  overflow-x-auto overflow-y-hidden  mx-2">
              <div className="bg-gradient-to-r from-purple-300 to-white flex-1 h-[2px]"></div>
              <div className="md:font-bold text-2xl m-3 text-white font-medium">
                Category Wise Expenses
              </div>
              <div className="bg-gradient-to-r from-white to-purple-300 flex-1 h-[2px]"></div>
            </div>
            <LineChart></LineChart>
            <p className="mb-16"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReportPanel;
