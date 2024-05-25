import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import BarChartUser from "./BarChartUser";
// import LineChart from "./barChartYearWise";

function UserWiseReportGeneration() {
  const user = JSON.parse(localStorage.getItem("token"));

  const connectionUrl = "http://localhost:2000";
  const [reportData, setReportData] = useState(null);
  const [expenseData, setExpenseData] = useState({
    cashExpense: 0,
    digitalExpense: 0,
  });
  const monthNameArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let cashExpense = 0;
  let digitalExpense = 0;
  let expensesObj = {};
  useEffect(() => {
    async function fetchFilterData() {
      try {
        const response = await axios.post(
          `${connectionUrl}/admin/user?uid=${1}`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );
        console.log(response.data);
        response.data.forEach((current) => {
          const uniqueKey = `${current.tourLocation}-${current.tourDate}`; // Assuming 'tourId' is a unique identifier for each tour
          console.log(uniqueKey);
          expensesObj[uniqueKey] = {
            food: 0,
            travel: 0,
            accomondation: 0,
            misc: 0,
            // cash: 0,
            // digitalpayment: 0,
          };
          current.voucherExpenses.forEach((currentExpense) => {
            console.log(currentExpense.expenseType);
            if (currentExpense.expenseType === "Food(Da)") {
              expensesObj[uniqueKey].food += +currentExpense.Amount;
            }
            if (currentExpense.expenseType === "Travel") {
              expensesObj[uniqueKey].travel += +currentExpense.Amount;
            }
            if (currentExpense.expenseType === "Accomondation") {
              expensesObj[uniqueKey].accomondation += +currentExpense.Amount;
            }
            if (currentExpense.expenseType === "Misc") {
              expensesObj[uniqueKey].misc += +currentExpense.Amount;
            }
            if (currentExpense.paymentType === "Cash") {
              setExpenseData((prev) => {
                return {
                  cashExpense: prev.cashExpense + +currentExpense.Amount,
                  digitalExpense: prev.digitalExpense,
                };
              });
            } else {
              setExpenseData((prev) => {
                return {
                  cashExpense: prev.cashExpense,
                  digitalExpense: prev.digitalExpense + +currentExpense.Amount,
                };
              });
            }
          });
        });
        console.log(expensesObj);
        setReportData(expensesObj);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFilterData();
  }, []);
  console.log(expenseData);
  return (
    <>
      <div className="flex ">
        <div className="w-[33%] bg-gradient-to-r  from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Total Expense</p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              {" "}
              <CountUp
                end={expenseData.cashExpense + expenseData.digitalExpense}
                duration={2.2}
              />{" "}
              Rs
            </p>
          </div>
        </div>{" "}
        <div className="w-[31%]   bg-gradient-to-r from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md mx-2">
          <p className="p-4 border-b-2 text-center">Cash Mode</p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              <CountUp end={expenseData.cashExpense} duration={1.5} /> Rs
            </p>{" "}
          </div>
        </div>{" "}
        <div className="w-[31%]  bg-gradient-to-r from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Digital mode </p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              <CountUp end={expenseData.digitalExpense} duration={2} /> Rs
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100%]  ">
        {" "}
        <div className="flex mt-3 items-center  overflow-x-auto overflow-y-hidden  mx-2">
          <div className="bg-gradient-to-r from-black to-white flex-1 h-[2px]"></div>
          <div className="md:font-bold text-2xl m-3 text-white font-medium">
            Category Wise Expenses
          </div>
          <div className="bg-gradient-to-r from-white to-black flex-1 h-[2px]"></div>
        </div>
        {/* <LineChart
          headers={monthNameArray}
          expenseData={reportData}
        ></LineChart> */}
        {reportData && <BarChartUser reportData={reportData}></BarChartUser>}{" "}
        <p className="mb-16"></p>
      </div>
    </>
  );
}

export default UserWiseReportGeneration;
