import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

function TokenWiseReport() {
  const [voucherData, setVoucherData] = useState(null);
  const [expenseData, setExpenseData] = useState({
    cashExpense: 0,
    digitalExpense: 0,
  });
  const connectionUrl = "http://localhost:2000";
  useEffect(() => {
    // setVoucherStatus("Pending");
    async function fetchData() {
      console.log("object");
      try {
        const response = await axios.post(
          `${connectionUrl}/admin/trackVoucher`,
          {
            voucherId: 4,
          }
        );
        console.log(response.data.response);
        setVoucherData(response.data.response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  let CashPayment = 0;
  let onlinePayment = 0;
  let creditCard = 0;
  let food = 0;
  let travel = 0;
  let Misc = 0;
  let accomondation = 0;
  useEffect(() => {
    voucherData &&
      voucherData.voucherExpenses?.forEach((current) => {
        if (current.paymentType === "Cash") {
          CashPayment += +current.Amount;
        }
        if (current.paymentType === "Online (train/flight)") {
          onlinePayment += +current.Amount;
        }
        if (current.paymentType === "Credit Card") {
          creditCard += +current.Amount;
        }
        if (current.expenseType === "Food(Da)") {
          food += +current.Amount;
        }
        if (current.expenseType === "Misc") {
          Misc += +current.Amount;
        }
        if (current.expenseType === "Travel") {
          travel += +current.Amount;
        }
        if (current.expenseType === "Accomondation") {
          accomondation += +current.Amount;
        }
      });

    // Update state with calculated expenses
    setExpenseData({
      cashExpense: CashPayment,
      digitalExpense: onlinePayment + creditCard,
    });
  }, [voucherData]);
  const departureTimeArray =
    voucherData?.voucherDescription?.departureTime?.split(":");
  const arrivalTimeArray =
    voucherData?.voucherDescription?.arrivalTime?.split(":");

  const departureTimeInMinutes = departureTimeArray
    ? +departureTimeArray[0] * 60 + +departureTimeArray[1]
    : 0;
  const arrivalTimeInMinutes = arrivalTimeArray
    ? +arrivalTimeArray[0] * 60 + +arrivalTimeArray[1]
    : 0;
  const tourDuration = arrivalTimeInMinutes - departureTimeInMinutes;
  const tourDurationHours = Math.abs(tourDuration / 60);
  const tourDurationMinutes = Math.abs(tourDuration % 60);
  function calculateHourDifference() {
    // Check if voucherData and required properties exist
    if (
      voucherData &&
      voucherData.voucherDescription &&
      voucherData.voucherDescription.departureDate &&
      voucherData.voucherDescription.arrivalDate
    ) {
      // Get the date strings
      let departureDateStr = voucherData.voucherDescription.departureDate;
      let arrivalDateStr = voucherData.voucherDescription.arrivalDate;

      // Parse the date strings directly to Date objects
      let departureDate = new Date(departureDateStr);
      let arrivalDate = new Date(arrivalDateStr);

      // Check for invalid dates
      if (isNaN(departureDate) || isNaN(arrivalDate)) {
        return 0;
      }

      // Calculate the difference in milliseconds
      let timeDifference = arrivalDate - departureDate;

      // Convert the difference from milliseconds to hours
      let hoursDifference = timeDifference / (1000 * 60 * 60);

      return Math.abs(hoursDifference);
    } else {
      // Return 0 if either date is missing
      return 0;
    }
  }

  let dateDifferenceInHour = calculateHourDifference();
  const totalDa = (
    (Math.abs(tourDurationHours - dateDifferenceInHour) *
      +voucherData?.voucherDescription?.dailyAllowance) /
    24
  ).toFixed(2);

  // Parse the departure and arrival dates and times
  //  const departureDateTime = new Date(`${voucherData.voucherDescription.departureDate}T${voucherData.voucherDescription.departureTime}`);
  //  const arrivalDateTime = new Date(`${voucherData.voucherDescription.arrivalDate}T${voucherData.voucherDescription.arrivalTime}`);

  //  // Calculate the difference in milliseconds
  //  const differenceInMs = arrivalDateTime - departureDateTime;

  //  // Convert the difference from milliseconds to hours
  //  const tourDurationInHours = differenceInMs / (1000 * 60 * 60)
  //  console.log(tourDurationHours)
  let settlementAmount = 0;
  if (voucherData) {
    settlementAmount = (
      +CashPayment +
      +totalDa -
      +voucherData?.voucherDescription?.advanceCash
    ).toFixed(2);
  }
  return (
    <>
      <div className="flex ">
        <div className="w-[33%] bg-gradient-to-r  from-[#EA8D8D] to-[#A890FE]  font-extrabold text-xl rounded-md ">
          <p className="p-4 border-b-2 text-center">Total Expense</p>
          <div className="flex justify-center items-center text-3xl  h-[100px] font-['Poppins']">
            <p>
              {" "}
              <CountUp end={expenseData.cashExpense+expenseData.digitalExpense} duration={2.2} /> Rs
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
        {/* <BarChartYear
      headers={monthNameArray}
      expenseData={reportData}
    ></BarChartYear> */}
        <p className="mb-16"></p>
      </div>
    </>
  );
}

export default TokenWiseReport;
