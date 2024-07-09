import axios from "axios";
import React, { useEffect, useState } from "react";

import CountUp from "react-countup";
import BarChartYear from "./barChartYearWise";
import DownloadYearReportButton from "./DownloadYearReportButton";
import { toast } from "react-toastify";

function YearWiseReportGeneration(props) {
  console.log(props, ".....kldljd");
  const user = JSON.parse(localStorage.getItem("token"));
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
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
          `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/year?year=${props.selectedYear}`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );
        console.log(response,".,wkldjwkdyuwtfdy3tgyrduytws")
        if(response.data.data.length==0){
          toast.error("no expense found for given year ")
          return
        }
        response.data.data.forEach((current) => {
          console.log(current);
          const dateObj = new Date(current.date);
          const MonthIndex = dateObj.getMonth();
          const monthName = monthNameArray[MonthIndex];
          if (monthName in expensesObj) {
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
              expensesObj[monthName].cash += +current.Amount;
              cashExpense += +current.Amount * +current.Voucher.exchangeRates;
            }
            if (
              current.paymentType == "Online (train/flight)" ||
              current.paymentType == "Credit Card"
            ) {
              expensesObj[monthName].digital += +current.Amount;

              digitalExpense +=
                +current.Amount * +current.Voucher.exchangeRates;
            }
          } else {
            expensesObj[monthName] = {
              acc:
                current.expenseType === "Accomondation" ? +current.Amount : 0,
              food: current.expenseType === "Food(Da)" ? +current.Amount : 0,
              misc: current.expenseType === "Misc" ? +current.Amount : 0,
              travel: current.expenseType === "Travel" ? +current.Amount : 0,
              digital: 0,
              cash: 0,
            };
            if (current.paymentType == "Cash") {
              // console.log("object", +current.Amount *+current.Voucher.exchangeRates)
              console.log(current.Voucher)
              cashExpense += +current.Amount * +current.Voucher.exchangeRates;
              expensesObj[monthName].cash += +current.Amount;
            }
            if (
              current.paymentType == "Online (train/flight)" ||
              current.paymentType == "Credit Card"
            ) {
              expensesObj[monthName].digital += +current.Amount;

              digitalExpense +=
                +current.Amount * +current.Voucher.exchangeRates;
            }
          }
        });

        setReportData(expensesObj);
        console.log({
          cashExpense: cashExpense,
          digitalExpense: digitalExpense,
          expensesObj,
        });
        setExpenseData((prev) => {
          return { cashExpense: cashExpense, digitalExpense: digitalExpense };
        });
        // setReportData(response.data.data);
        // ctx.AllVoucher(response.data.userList);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFilterData();
  }, [props.selectedYear]);
  // let jan=[];
  // console.log(reportData, expenseData);
  return (
    <>
      <DownloadYearReportButton
        categoryData={reportData}
        expenseData={expenseData}
        year={props.selectedYear}
      ></DownloadYearReportButton>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        <div className=" bg-gradient-to-r  from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Total Expense</p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              {" "}
              <CountUp
                end={expenseData?.digitalExpense + expenseData?.cashExpense}
                duration={2.2}
              />{" "}
              Rs
            </p>
          </div>
        </div>{" "}
        <div className="   bg-gradient-to-r from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Cash Mode</p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              <CountUp end={expenseData?.cashExpense} duration={1.5} /> Rs
            </p>{" "}
          </div>
        </div>{" "}
        <div className="  bg-gradient-to-r from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Digital mode </p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              <CountUp end={expenseData?.digitalExpense} duration={2} /> Rs
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
