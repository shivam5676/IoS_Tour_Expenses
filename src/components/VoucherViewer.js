import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../store/Context";
import { IoIosCloseCircle } from "react-icons/io";
import acceptedIcon from "../assests/images/accepted.png";
import rejectedIcon from "../assests/images/rejected.png";
export default function VoucherViewer(props) {
  console.log(props.voucherId);
  const [voucherData, setVoucherData] = useState(null);

  // const [voucherStatus, setVoucherStatus] = useState("Pending");
  const connectionUrl = "http://localhost:2000";
  //   const [open, setOpen] = useState(false);
  const ctx = useContext(Context);
  const cancelButtonRef = useRef(null);
  let CommentRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileRef = useRef();
  // useEffect(() => {
  //   console.log("object");
  // }, []);
  const user = JSON.parse(localStorage.getItem("token"));

  const acceptVoucherHandler = async () => {
    try {
      const response = await axios.post(
        `${connectionUrl}/admin/acceptVoucher`,
        {
          voucherId: props.voucherId,
          userId: 1,
          token: user.access_token,
          domain: user.domain,
        }
      );
      // setVoucherStatus("Accepted");

      console.log(voucherData);
      setVoucherData((prev) => {
        return { ...prev, statusType: "Accepted" };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const rejectVoucherHandler = async () => {
    try {
      const response = await axios.post(
        `${connectionUrl}/admin/rejectVoucher`,
        {
          voucherId: props.voucherId,
          token: user.access_token,
          domain: user.domain,
          // userId: 1,
        }
      );
      // setVoucherStatus("Accepted");

      console.log(voucherData);
      setVoucherData((prev) => {
        return { ...prev, statusType: "Rejected" };
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // setVoucherStatus("Pending");
    async function fetchData() {
      console.log("object");
      try {
        const response = await axios.post(
          `${connectionUrl}/admin/trackVoucher`,
          {
            voucherId: props.voucherId,
            token: user.access_token,
            domain: user.domain,
          }
        );
        console.log(response.data.response);
        setVoucherData(response.data.response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [props.voucherId]);
  let CashPayment = 0;
  let onlinePayment = 0;
  let creditCard = 0;
  let food = 0;
  let travel = 0;
  let Misc = 0;
  let accomondation = 0;
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
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {voucherData && (
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full  justify-center p-4 text-center items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform  rounded-lg text-left shadow-xl transition-all sm:my-8 h-[80vh] w-[80%] md:w-[600px] py-4 bg-white text-black">
                  {voucherData.statusType == "Accepted" && (
                    <img
                      className="fixed left-4 w-[90px]  top-0 flex cursor-pointer font-bold underline"
                      src={acceptedIcon}
                    ></img>
                  )}
                  {voucherData.statusType == "Rejected" && (
                    <img
                      className="fixed left-4 w-[90px]  top-2 flex cursor-pointer font-bold underline"
                      src={rejectedIcon}
                    ></img>
                  )}
                  <div
                    className="fixed right-4 top-2 flex cursor-pointer font-bold underline"
                    onClick={() => props.close()}
                  >
                    <IoIosCloseCircle className="w-[30px] h-[30px]"></IoIosCloseCircle>
                    close
                  </div>{" "}
                  <div className="text-2xl flex justify-center w-[100%] border-b-2 font-bold pb-3">
                    <p>Tour Voucher</p>
                  </div>
                  {/* <div className="flex w-[100%] min-[700px]:flex-row flex-col"></div> */}
                  <div className="overflow-y-scroll h-[calc(100%-50px)]">
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[40%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold">Name : </p>{" "}
                        {voucherData.user?.firstName +
                          " " +
                          voucherData.user?.lastName}
                      </div>
                      <div className="w-[60%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold ">Designation : </p>{" "}
                        software Developer{" "}
                      </div>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[40%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold">Location : </p>{" "}
                        {voucherData?.tourLocation}
                      </div>
                      <div className="w-[60%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold ">Employee id : </p>
                        IOS/EMP/5678
                      </div>
                    </div>

                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <p className="w-[100%] px-2 py-1 font-semibold border-2">
                        Purpose : {voucherData.voucherDescription?.purpose}
                      </p>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <p className="w-[100%] px-2 py-1 font-semibold border-2">
                        Advance Cash Recieved :{" "}
                        {voucherData.voucherDescription?.advanceCash}
                      </p>
                    </div>
                    <p className="text-center font-bold text-xl py-2">
                      Tour Duration
                    </p>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold"> Date from : </p>{" "}
                        {voucherData.voucherDescription?.departureDate}
                      </div>
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold ">Date to : </p>
                        {voucherData.voucherDescription?.arrivalDate}
                      </div>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold"> Time from : </p>{" "}
                        {voucherData.voucherDescription?.departureTime}
                      </div>
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold ">Time to : </p>{" "}
                        {voucherData.voucherDescription?.arrivalTime}
                      </div>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold"> Travel Vehicle : </p>{" "}
                        {voucherData.voucherDescription?.transportDeparture}
                      </div>
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold ">
                          Travel Vehicle (Return) :{" "}
                        </p>{" "}
                        {voucherData.voucherDescription?.transportArrival}
                      </div>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                        Total Tour Duration (hrs) :
                        {Math.abs(
                          tourDurationHours - dateDifferenceInHour
                        ).toFixed(2)}
                      </p>
                    </div>

                    <p className="text-center font-bold text-xl py-2">
                      Tour Daily Allowance (DA)
                    </p>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold"> DA (rs/day) : </p>{" "}
                        {+voucherData.voucherDescription?.dailyAllowance}
                      </div>
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold"> DA (rs/hr) : </p>{" "}
                        {(
                          +voucherData.voucherDescription?.dailyAllowance / 24
                        ).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                        Total DA Alloted (rs) : {totalDa}
                      </p>
                    </div>
                    <p className="text-center font-bold text-xl py-2">
                      Tour Expenses
                    </p>

                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold"> FOOD : </p> {food}
                      </div>
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold"> Travel : </p> {travel}
                      </div>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold"> Accomondation : </p>{" "}
                        {accomondation}
                      </div>
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold"> Misc : </p> {Misc}
                      </div>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                        Total Tour Expenses (rs) :
                        {Misc + accomondation + travel + food}
                      </p>
                    </div>
                    <p className="text-center font-bold">
                      Expenses Payment Method
                    </p>

                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                        <p className="font-semibold">
                          {" "}
                          Credit Card (office) :{" "}
                        </p>{" "}
                        {creditCard}
                      </div>
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                        <p className="font-semibold"> Cash : </p> {CashPayment}
                      </div>
                    </div>
                    <div className="flex w-[100%] min-[700px]:flex-row flex-col font-semibold">
                      <p className="w-[100%] px-2 border-2 max-[700px]:w-[100%]">
                        online (train/bus/flight tickets by office):{" "}
                        {onlinePayment}
                      </p>
                    </div>

                    <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      {settlementAmount > 0 && (
                        <>
                          {" "}
                          <p
                            className={`w-[100%] px-2 font font-semibold ${"bg-green-400"} text-white p-2`}
                          >
                            Amount for settlement : {settlementAmount}
                            <span> (office will pay to user)</span>
                          </p>
                        </>
                      )}
                      {settlementAmount <= 0 && (
                        <p
                          className={`w-[100%] px-2 font font-semibold ${"bg-red-400"} text-white p-2`}
                        >
                          Amount for settlement : {settlementAmount}
                          <span> (user will deposit in office)</span>
                        </p>
                      )}
                      {settlementAmount == 0 ||
                        (!settlementAmount && (
                          <p
                            className={`w-[100%] px-2 font font-semibold ${"bg-yellow-400"} text-white p-2`}
                          >
                            Amount for settlement : {settlementAmount}
                          </p>
                        ))}
                    </div>
                    <div className="my-2 flex w-[100%]  ">
                      <div className="font-semibold my-2 px-2">Comment</div>
                      <textarea
                        rows={3}
                        className="max-h-[100px] min-h-[50px] border-2 m-2 w-[60%]"
                      ></textarea>
                    </div>
                    <img src={`${connectionUrl}/uploads/1716541163656-billImage.png`}></img>
                    {voucherData.statusType == "Pending" && (
                      <div className="my-2 flex w-[100%] justify-evenly font-bold text-white">
                        <p
                          className="p-2 bg-blue-400 w-fit rounded-md hover:bg-blue-600 cursor-pointer"
                          onClick={() => {
                            acceptVoucherHandler();
                          }}
                        >
                          Accept
                        </p>
                        <p
                          className="p-2 bg-orange-400 w-fit mx-2 rounded-md hover:bg-orange-600 cursor-pointer"
                          onClick={() => {
                            // setVoucherStatus("Rejected");
                            rejectVoucherHandler();
                          }}
                        >
                          Reject
                        </p>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        )}
      </Dialog>
    </Transition.Root>
  );
}
