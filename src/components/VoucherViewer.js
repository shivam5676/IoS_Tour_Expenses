import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../store/Context";

export default function VoucherViewer(props) {
  console.log(props.voucherId);
  const [voucherData, setVoucherData] = useState(null);
  const connectionUrl = "http://localhost:2000";
  //   const [open, setOpen] = useState(false);
  const ctx = useContext(Context);
  const cancelButtonRef = useRef(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileRef = useRef();
  // useEffect(() => {
  //   console.log("object");
  // }, []);

  useEffect(() => {
    async function fetchData() {
      console.log("object");
      try {
        const response = await axios.post(
          `${connectionUrl}/admin/trackVoucher`,
          {
            voucherId: props.voucherId,
          }
        );
        // console.log(response.data.response);
        setVoucherData(response.data.response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [props.voucherId]);
  console.log(voucherData);
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
      // if (current.expenseType === "Travel") {
      //   travel += +current.Amount;
      // }
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
  const tourDurationHours = Math.abs(Math.floor(tourDuration / 60));
  const tourDurationMinutes = Math.abs(tourDuration % 60);
 // Parse the departure and arrival dates and times
//  const departureDateTime = new Date(`${voucherData.voucherDescription.departureDate}T${voucherData.voucherDescription.departureTime}`);
//  const arrivalDateTime = new Date(`${voucherData.voucherDescription.arrivalDate}T${voucherData.voucherDescription.arrivalTime}`);

//  // Calculate the difference in milliseconds
//  const differenceInMs = arrivalDateTime - departureDateTime;

//  // Convert the difference from milliseconds to hours
//  const tourDurationInHours = differenceInMs / (1000 * 60 * 60)
//  console.log(tourDurationHours)
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
                <Dialog.Panel className="relative transform overflow-scroll rounded-lg text-left shadow-xl transition-all sm:my-8 h-[80vh] w-[80%] md:w-[600px] py-4 bg-white text-black">
                  <div className="text-2xl flex justify-center w-[100%] border-b-2 font-bold pb-3">
                    <p>Tour Voucher</p>
                  </div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col"></div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold">Name : </p>{" "}
                      {voucherData.user?.firstName +
                        " " +
                        voucherData.user?.lastName}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
                      <p className="font-semibold ">Designation : </p> software
                      Developer{" "}
                    </div>
                  </div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold">Location : </p>{" "}
                      {voucherData?.tourLocation}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
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
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold"> Date from : </p>{" "}
                      {voucherData.voucherDescription?.departureDate}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
                      <p className="font-semibold ">Date to : </p>
                      {voucherData.voucherDescription?.arrivalDate}
                    </div>
                  </div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold"> Time from : </p>{" "}
                      {voucherData.voucherDescription?.departureTime}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
                      <p className="font-semibold ">Time to : </p>{" "}
                      {voucherData.voucherDescription?.arrivalTime}
                    </div>
                  </div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold"> Travel Vehicle : </p>{" "}
                      {voucherData.voucherDescription?.transportDeparture}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
                      <p className="font-semibold ">
                        Travel Vehicle (Return) :{" "}
                      </p>{" "}
                      {voucherData.voucherDescription?.transportArrival}
                    </div>
                  </div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                      Total Tour Duration (hrs) :768
                    </p>
                  </div>
                  {/* <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">Travel Vehicle : bus</p>
                  <p className="w-[60%] px-2">
                    Travel Vehicle (Return) : train
                  </p>
                </div> */}
                  <p className="text-center font-bold text-xl py-2">
                    Tour Daily Allowance (DA)
                  </p>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold"> DA (rs/day) : </p>{" "}
                      {+voucherData.voucherDescription?.dailyAllowance}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
                      <p className="font-semibold"> DA (rs/hr) : </p>{" "}
                      {+voucherData.voucherDescription?.dailyAllowance / 24}
                    </div>
                  </div>

                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                      Total DA Alloted (rs) :{" "}
                      {tourDurationHours *
                        (+voucherData.voucherDescription?.dailyAllowance / 24)}
                    </p>
                  </div>
                  <p className="text-center font-bold text-xl py-2">
                    Tour Expenses
                  </p>

                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold"> FOOD : </p> {food}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
                      <p className="font-semibold"> Travel : </p> {travel}
                    </div>
                  </div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold"> Accomondation : </p>{" "}
                      {accomondation}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
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
                    <div className="w-[40%] px-2 border-2 flex py-1">
                      <p className="font-semibold"> Credit Card (office) : </p>{" "}
                      {creditCard}
                    </div>
                    <div className="w-[60%] px-2 border-2 flex py-1 ">
                      <p className="font-semibold"> Cash : </p> {CashPayment}
                    </div>
                  </div>
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col font-semibold">
                    <p className="w-[100%] px-2 border-2">
                      online (train/bus/flight tickets by office):{" "}
                      {onlinePayment}
                    </p>
                  </div>
                  {/* <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                  Total Amount Paid on expense (rs) : 17931
                </p> */}
                  <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                    <p className="w-[100%] px-2 font font-semibold bg-green-400 text-white">
                      Amount for settlement : {CashPayment}
                    </p>
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
