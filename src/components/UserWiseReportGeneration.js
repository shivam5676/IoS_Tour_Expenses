import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import BarChartUser from "./BarChartUser";
import DownloadUserPdfButton from "./DownloadUserPdfButton";
import { toast } from "react-toastify";
// import LineChart from "./barChartYearWise";

function UserWiseReportGeneration(props) {
  const user = JSON.parse(localStorage.getItem("token"));

  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const [reportData, setReportData] = useState(null);
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    userId: "",
  });
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
          `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/user?uid=${props.userId}`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );
        console.log(response.data, "dedfdfedfcfefef");
        if (response.data.length == 0) {
          toast.error("no expense found for this user ");
        }
        setuserData({
          firstName: response.data[0].user.firstName,
          lastName: response.data[0].user.lastName,
          userId: response.data[0].userId,
        });
        response.data.forEach((current) => {
          const uniqueKey = `${current.tourLocation}-${current.tourDate}(${current.currency})`; // Assuming 'tourId' is a unique identifier for each tour
          expensesObj[uniqueKey] = {
            food: 0,
            travel: 0,
            accomondation: 0,
            misc: 0,
            cash: 0,
            digitalpayment: 0,
            expenseList: [...current.voucherExpenses],
            exchangeRates: current.exchangeRates,
          };
          current.voucherExpenses.forEach((currentExpense) => {
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
              expensesObj[uniqueKey].cash += +currentExpense.Amount;
              setExpenseData((prev) => {
                return {
                  cashExpense:
                    prev.cashExpense +
                    +currentExpense.Amount * current.exchangeRates,
                  digitalExpense: prev.digitalExpense,
                };
              });
            } else {
              expensesObj[uniqueKey].digitalpayment += +currentExpense.Amount;
              setExpenseData((prev) => {
                return {
                  cashExpense: prev.cashExpense,
                  digitalExpense:
                    prev.digitalExpense +
                    +currentExpense.Amount * current.exchangeRates,
                };
              });
            }
          });
        });
        setReportData(expensesObj);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFilterData();
  }, [props.userId]);
  console.log(expenseData);
  return (
    <>
      <DownloadUserPdfButton
        expenseData={expenseData}
        tourData={reportData}
        userData={userData}
      ></DownloadUserPdfButton>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        <div className=" bg-gradient-to-r  from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
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
        <div className="   bg-gradient-to-r from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Cash Mode</p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              <CountUp end={expenseData.cashExpense} duration={1.5} /> Rs
            </p>{" "}
          </div>
        </div>{" "}
        <div className="  bg-gradient-to-r from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
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
          <div className="bg-gradient-to-r from-white to-black flex-1 h-[2px]"></div>
          <div className="md:font-bold text-2xl m-3 text-blue-400 font-medium">
            Tour Wise Expenses
          </div>
          <div className="bg-gradient-to-r from-black to-white flex-1 h-[2px]"></div>
        </div>
        {reportData && <BarChartUser reportData={reportData}></BarChartUser>}{" "}
        <p className="mb-16"></p>
      </div>
    </>
  );
}

export default UserWiseReportGeneration;
