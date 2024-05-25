import axios from "axios";
import React, { useEffect, useState } from "react";

import CountUp from "react-countup";
import BarChartYear from "./barChartYearWise";

function YearWiseReportGeneration() {
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
          `${connectionUrl}/admin/year?year=${2024}`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );
        console.log(response.data.data);
        response.data.data.forEach((current) => {
          const dateObj = new Date(current.date);
          const MonthIndex = dateObj.getMonth();
          const monthName = monthNameArray[MonthIndex];
          console.log(monthName);
          if (monthName in expensesObj) {
            console.log("object exists for", monthName);
            // expensesObj[monthName] += 1;
            if (current.expenseType == "Travel") {
              expensesObj[monthName].travel += +current.Amount;
            }
            if (current.expenseType == "Accomondation") {
              expensesObj[monthName].acc += +current.Amount;
            }
            if (current.expenseType == "Misc") {
              expensesObj[monthName].misc += +current.Amount;
            }
            if (current.expenseType == "Food(Da)") {
              expensesObj[monthName].food += +current.Amount;
            }
            if (current.paymentType == "Cash") {
              cashExpense += +current.Amount;
            }
            if (
              current.paymentType == "Online (train/flight)" ||
              current.paymentType == "Credit Card"
            ) {
              digitalExpense += +current.Amount;
            }
          } else {
            expensesObj[monthName] = {
              acc:
                current.expenseType === "Accomondation" ? +current.Amount : 0,
              food: current.expenseType === "Food(Da)" ? +current.Amount : 0,
              misc: current.expenseType === "Misc" ? +current.Amount : 0,
              travel: current.expenseType === "Travel" ? +current.Amount : 0,
            };
            if (current.paymentType == "Cash") {
              cashExpense += +current.Amount;
            }
            if (
              current.paymentType == "Online (train/flight)" ||
              current.paymentType == "Credit Card"
            ) {
              digitalExpense += +current.Amount;
            }
          }
        });

        setReportData(expensesObj);
        setExpenseData((prev) => {
          return { cashExpense: cashExpense, digitalExpense: digitalExpense };
        });
        console.log(expensesObj, cashExpense, digitalExpense);
        // setReportData(response.data.data);
        // ctx.AllVoucher(response.data.userList);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFilterData();
  }, []);
  // let jan=[];
  return (
    <>
      <div className="flex ">
        <div className="w-[33%] bg-gradient-to-r  from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Total Expense</p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              {" "}
              <CountUp
                end={expenseData.digitalExpense + expenseData.cashExpense}
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
        <BarChartYear
          headers={monthNameArray}
          expenseData={reportData}
        ></BarChartYear>
        <p className="mb-16"></p>
      </div>
    </>
  );
}

export default YearWiseReportGeneration;
