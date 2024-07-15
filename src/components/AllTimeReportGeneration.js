import axios from "axios";
import React, { useEffect } from "react";
import AllTimePdf from "./AllTimePdf";

const AllTimeReportGeneration = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;

  useEffect(() => {
    async function fetchFilterData() {
      try {
        const response = await axios.post(
          `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/allTime`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );
        
        // response?.data?.allVouchers.map((currentVoucher) => {
        //   const year = currentVoucher.tourDate.split("/")[2];
        //   console.log(year);
        //   const yearlyExpenses={}
        //   currentVoucher.voucherExpenses.forEach((current) => {
        //     console.log(current);
        //     if (current.paymentType == "Cash") {
        //       expensesObj[monthName].cash += +current.Amount;
        //       cashExpense += +current.Amount;
        //     }
        //     if (
        //       current.paymentType == "Online (train/flight)" ||
        //       current.paymentType == "Credit Card"
        //     ) {
        //       expensesObj[monthName].digital += +current.Amount;

        //       digitalExpense += +current.Amount;
        //     }
        //   });
        // });
        // response.data.data.forEach((current) => {
        //   const dateObj = new Date(current.date);
        //   const MonthIndex = dateObj.getMonth();
        //   const monthName = monthNameArray[MonthIndex];
        //   if (monthName in expensesObj) {
        //     // expensesObj[monthName] += 1;
        //     if (current.expenseType == "Travel") {
        //       expensesObj[monthName].travel += +current.Amount;
        //     }
        //     if (current.expenseType == "Accomondation") {
        //       expensesObj[monthName].acc += +current.Amount;
        //     }
        //     if (current.expenseType == "Misc") {
        //       expensesObj[monthName].misc += +current.Amount;
        //     }
        //     if (current.expenseType == "Food(Da)") {
        //       expensesObj[monthName].food += +current.Amount;
        //     }
        //     if (current.paymentType == "Cash") {
        //       expensesObj[monthName].cash += +current.Amount;
        //       cashExpense += +current.Amount;
        //     }
        //     if (
        //       current.paymentType == "Online (train/flight)" ||
        //       current.paymentType == "Credit Card"
        //     ) {
        //       expensesObj[monthName].digital += +current.Amount;

        //       digitalExpense += +current.Amount;
        //     }
        //   } else {
        //     expensesObj[monthName] = {
        //       acc:
        //         current.expenseType === "Accomondation" ? +current.Amount : 0,
        //       food: current.expenseType === "Food(Da)" ? +current.Amount : 0,
        //       misc: current.expenseType === "Misc" ? +current.Amount : 0,
        //       travel: current.expenseType === "Travel" ? +current.Amount : 0,
        //       digital: 0,
        //       cash: 0,
        //     };
        //     if (current.paymentType == "Cash") {
        //       cashExpense += +current.Amount;
        //       expensesObj[monthName].cash += +current.Amount;
        //     }
        //     if (
        //       current.paymentType == "Online (train/flight)" ||
        //       current.paymentType == "Credit Card"
        //     ) {
        //       expensesObj[monthName].digital += +current.Amount;

        //       digitalExpense += +current.Amount;
        //     }
        //   }
        // });

        // setReportData(expensesObj);
        // setExpenseData((prev) => {
        //   return { cashExpense: cashExpense, digitalExpense: digitalExpense };
        // });
        // setReportData(response.data.data);
        // ctx.AllVoucher(response.data.userList);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFilterData();
  }, []);
  return <AllTimePdf></AllTimePdf>;
};

export default AllTimeReportGeneration;
