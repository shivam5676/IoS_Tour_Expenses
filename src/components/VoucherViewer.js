import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FaRegEdit } from "react-icons/fa";

import axios from "axios";
import Context from "../store/Context";
import { IoIosCloseCircle } from "react-icons/io";
import acceptedIcon from "../assests/images/accepted.png";
import rejectedIcon from "../assests/images/rejected.png";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdAssignmentInd, MdDelete, MdEdit } from "react-icons/md";
import DownloadPdfButton from "./DownloadPdfButton";
import { useLocation } from "react-router-dom";
import UpdateExpenseModal from "./user/UpdateExpenseModal";
import UpdateTourDescription from "./user/UpdateTourDescription";

export default function VoucherViewer(props) {
  const [expenseData, setExpenseData] = useState({
    cashExpense: 0,
    digitalExpense: 0,
  });
  const [openDescription, setOpenDescription] = useState(false);
  const location = useLocation();
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [voucherId, setVoucherId] = useState(null);
  const path = location.pathname.toUpperCase();

  const [reAssignVoucher, setReAsignVoucher] = useState(false);
  const [voucherData, setVoucherData] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const [imageArray, setImageArray] = useState(null);
  const [paymentDepartmentOpen, setPaymentDepartMentOpen] = useState(false);
  const [paymentSupervisor, setPaymentSupervisor] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);

  // const [voucherStatus, setVoucherStatus] = useState("Pending");
  const connectionUrl = process.env.REACT_APP_BACKEND_URL;
  //   const [open, setOpen] = useState(false);
  const ctx = useContext(Context);
  const cancelButtonRef = useRef(null);
  let CommentRef = useRef("");
  const daAllowanceRef = useRef(0);
  const user = JSON.parse(localStorage.getItem("token"));
  const deleteExpenseHAndler = async (id) => {
    try {
      const response = await axios.post(`${connectionUrl}/user/deleteExpense`, {
        expenseId: id,
        token: user.access_token,
        domain: user.domain,
      });
      ctx.deleteUserCurrentTourExpenseHandler(id);
      toast.success("expense deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const reAssignVoucherHandler = async () => {
    try {
      const response = await axios.post(`${connectionUrl}/admin/reAssign`, {
        voucherId: props.voucherId,

        token: user.access_token,
        domain: user.domain,
        AccountDepartment: selectedSupervisor?.id || undefined,
        assignedName: `${selectedSupervisor?.firstName} ${selectedSupervisor?.lastName}`,
      });
      // setVoucherStatus("Accepted");

      setReAsignVoucher(false);

      // ctx.removeVoucherfromAllVoucher({
      //   id: props?.voucherId,
      //   status: "Accepted",
      // });

      setVoucherData((prev) => {
        return {
          ...prev,
          statusType: "Accepted",
          assignedName: `${selectedSupervisor?.firstName} ${selectedSupervisor?.lastName}`,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const acceptVoucherHandler = async () => {
    if (user.isAdmin && !selectedSupervisor) {
      toast.error("Please select Account department supervisor");
      return;
    }

    // return;
    if (!CommentRef.current) {
      CommentRef.current = { value: voucherData.comment };
    }
    try {
      const response = await axios.post(
        `${connectionUrl}/admin/acceptVoucher`,
        {
          voucherId: props.voucherId,
          comment: CommentRef.current.value,
          token: user.access_token,
          domain: user.domain,
          dailyAllowance: daAllowanceRef?.current?.value,
          AccountDepartment: selectedSupervisor?.id || undefined,
          assignedName: `${selectedSupervisor?.firstName} ${selectedSupervisor?.lastName}`,
        }
      );
      // setVoucherStatus("Accepted");

      ctx.removeVoucherfromAllVoucher({
        id: props?.voucherId,
        status: "Accepted",
      });

      setVoucherData((prev) => {
        return {
          ...prev,
          statusType: "Accepted",
          assignedTo: selectedSupervisor?.id || undefined,
          assignedName: `${selectedSupervisor?.firstName} ${selectedSupervisor?.lastName}`,
        };
      });
      toast.success({ msg: "voucher accepted successfully" });
    } catch (err) {
      console.log(err);
      toast.error({ msg: "something went wrong ....." });
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
          comment: CommentRef.current.value,
        }
      );
      ctx.removeVoucherfromAllVoucher({
        id: props?.voucherId,
        status: "Rejected",
      });

      setVoucherData((prev) => {
        return { ...prev, statusType: "Rejected" };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const closeVoucherHandler = async () => {
    try {
      const response = await axios.post(`${connectionUrl}/admin/closevoucher`, {
        voucherId: props.voucherId,
        token: user.access_token,
        domain: user.domain,
      });
      // ctx.removeVoucherfromAllVoucher({
      //   id: props?.voucherId,
      //   status: "Rejected",
      // });

      setVoucherData((prev) => {
        return { ...prev, statusType: "Closed" };
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // setVoucherStatus("Pending");
    async function fetchData() {
      try {
        const response = await axios.post(
          `${connectionUrl}/admin/trackVoucher`,
          {
            voucherId: props.voucherId,
            token: user.access_token,
            domain: user.domain,
          }
        );
        // console.log(response.data.response.voucherExpenses,"response");
        //  const imageObj= response.data.response.voucherExpenses.forEach(current=>{
        //   if(current.imagePath){
        //     setImageArray()
        //   }
        //   return {billName}
        //  })
        setImageArray(response.data.imagePaths);
        setVoucherData(response.data.response);
        CommentRef.current.value = response.data.response.comment;
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [props.voucherId]);
  useEffect(() => {
    // setVoucherStatus("Pending");
    async function fetchData() {
      try {
        const response = await axios.post(
          `${connectionUrl}/admin/getSuperVisor`,
          {
            token: user.access_token,
            domain: user.domain,
          }
        );
        setPaymentSupervisor(response.data.supervisorList);
      } catch (err) {
        console.log(err);
        // props.close();
      }
    }
    fetchData();
  }, [props.voucherId]);
  let cashExpense = 0;
  let onlinePayment = 0;
  let creditCard = 0;
  let food = 0;
  let travel = 0;
  let Misc = 0;
  let accomondation = 0;
  let travelOnline = 0,
    MiscOnline = 0,
    accomondationOnline = 0;
  useEffect(() => {
    cashExpense = 0;
    onlinePayment = 0;
    creditCard = 0;
    food = 0;
    travel = 0;
    Misc = 0;
    accomondation = 0;
    travelOnline = 0;
    MiscOnline = 0;
    accomondationOnline = 0;
    voucherData &&
      voucherData.voucherExpenses?.forEach((current) => {
        if (current.paymentType === "Cash") {
          cashExpense += +current.Amount;
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
        if (
          current.expenseType === "Misc" &&
          current.paymentType !== "Credit Card" &&
          current.paymentType !== "Online (train/flight)"
        ) {
          Misc += +current.Amount;
        }
        if (
          current.expenseType === "Travel" &&
          current.paymentType !== "Credit Card" &&
          current.paymentType !== "Online (train/flight)"
        ) {
          travel += +current.Amount;
        }
        if (
          current.expenseType === "Accomondation" &&
          current.paymentType !== "Credit Card" &&
          current.paymentType !== "Online (train/flight)"
        ) {
          accomondation += +current.Amount;
        }
        if (
          current.expenseType === "Misc" &&
          (current.paymentType === "Credit Card" ||
            current.paymentType === "Online (train/flight)")
        ) {
          MiscOnline += +current.Amount;
        }
        if (
          current.expenseType === "Travel" &&
          (current.paymentType === "Credit Card" ||
            current.paymentType === "Online (train/flight)")
        ) {
          travelOnline += +current.Amount;
        }
        if (
          current.expenseType === "Accomondation" &&
          (current.paymentType === "Credit Card" ||
            current.paymentType === "Online (train/flight)")
        ) {
          accomondationOnline += +current.Amount;
        }
      });
    setExpenseData({
      cashExpense: cashExpense,
      digitalExpense: onlinePayment + creditCard,
      onlinePayment: onlinePayment,
      creditCard,
      accomondation,
      food,
      Misc,
      travel,
      travelOnline,
      MiscOnline,
      accomondationOnline,
    });
  }, [voucherData]);
  console.log(expenseData, "expenses is here");

  // const departureTimeArray =
  //   voucherData?.voucherDescription?.departureTime?.split(":");
  // const arrivalTimeArray =
  //   voucherData?.voucherDescription?.arrivalTime?.split(":");

  // const departureTimeInMinutes = departureTimeArray
  //   ? +departureTimeArray[0] * 60 + +departureTimeArray[1]
  //   : 0;
  // const arrivalTimeInMinutes = arrivalTimeArray
  //   ? +arrivalTimeArray[0] * 60 + +arrivalTimeArray[1]
  //   : 0;
  // const tourDuration = arrivalTimeInMinutes - departureTimeInMinutes;
  // const tourDurationHours = Math.abs(tourDuration / 60);
  // const tourDurationMinutes = Math.abs(tourDuration % 60);
  // function calculateHourDifference() {
  //   // Check if voucherData and required properties exist
  //   if (
  //     voucherData &&
  //     voucherData.voucherDescription &&
  //     voucherData.voucherDescription.departureDate &&
  //     voucherData.voucherDescription.arrivalDate
  //   ) {
  //     // Get the date strings
  //     let departureDateStr = voucherData.voucherDescription.departureDate;
  //     let arrivalDateStr = voucherData.voucherDescription.arrivalDate;

  //     // Parse the date strings directly to Date objects
  //     let departureDate = new Date(departureDateStr);
  //     let arrivalDate = new Date(arrivalDateStr);

  //     // Check for invalid dates
  //     if (isNaN(departureDate) || isNaN(arrivalDate)) {
  //       return 0;
  //     }

  //     // Calculate the difference in milliseconds
  //     let timeDifference = arrivalDate - departureDate;

  //     // Convert the difference from milliseconds to hours
  //     let hoursDifference = timeDifference / (1000 * 60 * 60);

  //     return Math.abs(hoursDifference);
  //   } else {
  //     // Return 0 if either date is missing
  //     return 0;
  //   }
  // }

  // let dateDifferenceInHour = calculateHourDifference();
  // const totalDa = (
  //   (Math.abs(tourDurationHours - dateDifferenceInHour) *
  //     +voucherData?.voucherDescription?.dailyAllowance) /
  //   24
  // ).toFixed(2);
  function calculateHourDifference(voucherData) {
    // Check if voucherData and required properties exist
    if (
      voucherData &&
      voucherData.voucherDescription &&
      voucherData.voucherDescription.departureDate &&
      voucherData.voucherDescription.arrivalDate &&
      voucherData.voucherDescription.departureTime &&
      voucherData.voucherDescription.arrivalTime
    ) {
      // Get the date strings
      let departureDateStr = voucherData.voucherDescription.departureDate;
      let arrivalDateStr = voucherData.voucherDescription.arrivalDate;

      // Get the time strings
      let departureTimeStr = voucherData.voucherDescription.departureTime;
      let arrivalTimeStr = voucherData.voucherDescription.arrivalTime;

      // Combine the date and time strings into one string
      let departureDateTimeStr = `${departureDateStr} ${departureTimeStr}`;
      let arrivalDateTimeStr = `${arrivalDateStr} ${arrivalTimeStr}`;

      // Parse the combined date and time strings into Date objects
      let departureDate = new Date(departureDateTimeStr);
      let arrivalDate = new Date(arrivalDateTimeStr);

      // Check for invalid dates
      if (isNaN(departureDate) || isNaN(arrivalDate)) {
        return 0;
      }

      // Calculate the difference in milliseconds
      let timeDifferenceInMs = arrivalDate - departureDate;

      // Convert the difference from milliseconds to hours and minutes
      let hoursDifference = timeDifferenceInMs / (1000 * 60 * 60); // Convert ms to hours

      return Math.abs(hoursDifference); // Return the absolute difference in hours
    } else {
      // Return 0 if required data is missing
      return 0;
    }
  }

  let dateDifferenceInHour = calculateHourDifference(voucherData);

  // Declare totalDa outside the if statement
  let totalDa = 0;

  // Step 2: Calculate the total daily allowance based on the duration
  const dailyAllowance = +voucherData?.voucherDescription?.dailyAllowance || 0; // Get daily allowance, default to 0 if undefined

  // Ensure dateDifferenceInHour is valid
  if (dateDifferenceInHour > 0) {
    // Step 3: Calculate the totalDA inside the if block
    totalDa = ((dateDifferenceInHour * dailyAllowance) / 24).toFixed(2);

    console.log(`Total Daily Allowance (DA) inside block: ${totalDa}`);
  } else {
    console.log("Invalid tour duration.");
  }

  // Now you can use totalDa outside the if block as well
  console.log(`Total Daily Allowance (DA) outside block: ${totalDa}`);

  let settlementAmount = 0;
  if (voucherData) {
    const expensesExpectFood =
      expenseData?.Misc + expenseData?.accomondation + expenseData?.travel;
    // console.log(
    //   "EXPENSEEXPECTEDFOOD",
    //   expensesExpectFood,
    //   "TOTALdA",
    //   totalDa,
    //   "ADV.caSH",
    //   voucherData?.voucherDescription?.advanceCash,
    //   "food",
    //   food
    // );

    if (totalDa > 0) {
      settlementAmount =
        +expensesExpectFood + 
        +totalDa -
        voucherData?.voucherDescription?.advanceCash;
    }
    if (totalDa == 0 || isNaN(totalDa)) {
      settlementAmount =
        +expensesExpectFood +
        +expenseData?.food -
        voucherData?.voucherDescription?.advanceCash;
    }
  }
  const sendCommentHandler = async () => {
    try {
      const response = await axios.post(`${connectionUrl}/admin/postComment`, {
        voucherId: props.voucherId,
        // userId: ,
        token: user.access_token,
        domain: user.domain,
        comment: CommentRef.current.value,
      });
      // setVoucherStatus("Accepted");

      setEditComment(false);
      setVoucherData((prev) => {
        return {
          ...prev,
          comment: CommentRef.current.value,
          firstName: voucherData.user.firstName,
          lastNAme: voucherData.user.lastNAme,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <UpdateExpenseModal
        open={update}
        onClose={() => {
          setUpdate(!update);
        }}
        updateData={updateData}
        voucherId={voucherId}
      ></UpdateExpenseModal>
      <UpdateTourDescription
        open={openDescription}
        close={() => {
          setOpenDescription(false);
        }}
        description={voucherData?.voucherDescription}
      ></UpdateTourDescription>
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
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto pt-[70px] ">
              <div className="flex min-h-full  justify-center   text-center items-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform  rounded-lg text-left shadow-xl transition-all sm:my-8 h-[80vh] w-[100%] min-[700px]:w-[700px]  py-4 bg-white text-black">
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
                    {voucherData.statusType == "Pending" && (
                      <div className="fixed left-4 w-[90px] border-2 bg-yellow-500 top-2 rounded-md flex  font-bold ">
                        <p className="text-white p-2">Pending...</p>
                      </div>
                    )}
                    <div
                      className="fixed right-4 top-2 flex cursor-pointer font-bold underline"
                      onClick={() => props.close()}
                    >
                      <IoIosCloseCircle className="w-[30px] h-[30px]"></IoIosCloseCircle>
                      close
                    </div>
                    <div className="text-2xl flex flex-col items-center justify-center w-[100%] border-b-2 font-bold pb-3">
                      <p>Tour Voucher</p>{" "}
                      {path == "/YOURVOUCHER" &&
                        (voucherData.statusType === "Created" ||
                          voucherData.statusType === "Pending") && (
                          <FaRegEdit
                            className="text-blue-500 m-1 cursor-pointer w-[25px] h-[25px]"
                            onClick={() => setOpenDescription(true)}
                          ></FaRegEdit>
                        )}
                    </div>
                    {/* <div className="flex w-[100%] min-[700px]:flex-row flex-col"></div> */}
                    <div className="overflow-y-scroll h-[calc(100%-70px)]">
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[40%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold">Name : </p>
                          {voucherData.user?.firstName +
                            " " +
                            voucherData.user?.lastName}
                        </div>
                        <div className="w-[60%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold ">Designation : </p>
                          {voucherData.user?.designation}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[40%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold">Voucher Id : </p>
                          {`OMR/${voucherData?.tourDate?.split("/")[2]}/${
                            voucherData?.id
                          }`}
                        </div>
                        <div className="w-[60%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold ">Employee id : </p>
                          IOS/EMP/{voucherData?.userId}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <p className="w-[100%] px-2 py-1 font-semibold border-2">
                          Purpose : {voucherData?.voucherDescription?.purpose}
                        </p>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <p className="w-[100%] px-2 py-1 font-semibold border-2">
                          Location : {voucherData?.tourLocation}
                        </p>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <p className="w-[100%] px-2 py-1 font-semibold border-2">
                          Advance Cash Recieved :
                          {voucherData?.voucherDescription?.advanceCash}
                        </p>
                      </div>
                      <p className="justify-center font-bold text-xl py-2 flex">
                        Tour Duration{" "}
                        <span>
                          {/* <FaRegEdit className="text-blue-500 m-1 cursor-pointer w-[25px] h-[25px]"></FaRegEdit> */}
                        </span>
                      </p>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold"> Date from : </p>
                          {voucherData.voucherDescription?.departureDate}
                        </div>
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold ">Date to : </p>
                          {voucherData.voucherDescription?.arrivalDate}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold"> Time from : </p>
                          {voucherData.voucherDescription?.departureTime}
                        </div>
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold ">Time to : </p>
                          {voucherData.voucherDescription?.arrivalTime}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold"> Travel Vehicle : </p>
                          {voucherData.voucherDescription?.transportDeparture}
                        </div>
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold ">
                            Travel Vehicle (Return) :
                          </p>
                          {voucherData.voucherDescription?.transportArrival}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                          Total Tour Duration (hrs) :
                          {dateDifferenceInHour.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-center font-bold text-xl py-2">
                        Tour Daily Allowance (DA)
                      </p>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold">
                            DA ({voucherData?.currency}/day) :
                          </p>
                          {+voucherData.voucherDescription?.dailyAllowance}
                        </div>
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold">
                            DA ({voucherData?.currency}/hr) :
                          </p>
                          {(
                            +voucherData?.voucherDescription?.dailyAllowance /
                            24
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                          Total DA Alloted ({voucherData?.currency}) : {totalDa}
                        </p>
                      </div>
                      <p className="text-center font-bold text-xl py-2">
                        Tour Expenses
                      </p>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[100%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold"> FOOD (cash + Online): </p>
                          {expenseData?.food}
                        </div>
                        {/* <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold"> Travel : </p>
                          {expenseData?.travel}
                        </div> */}
                      </div>   <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                      <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold"> Travel (Cash): </p>
                          {expenseData?.travel}
                        </div>
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold"> Travel (Online): </p>
                          {expenseData?.travelOnline}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold"> Accomondation (Cash): </p>
                          {expenseData?.accomondation}
                        </div>
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold"> Accomondation (online): </p>
                          {expenseData?.accomondationOnline}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                       <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold"> Misc (Cash): </p>
                          {expenseData?.Misc}
                        </div> <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold"> Misc (Online) : </p>
                          {expenseData?.MiscOnline}
                        </div>
                        
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <p className="w-[100%] px-2 font font-semibold bg-blue-300">
                          Total Tour Expenses ({voucherData?.currency}) :
                          {expenseData?.Misc +
                            expenseData?.accomondation +
                            expenseData?.travel +
                            expenseData?.food}
                        </p>
                      </div>
                      <p className="text-center font-bold">
                        Expenses Payment Method
                      </p>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1">
                          <p className="font-semibold">
                            Credit Card (office) :
                          </p>
                          {expenseData?.creditCard}
                        </div>
                        <div className="w-[50%] px-2 border-2 max-[700px]:w-[100%] flex py-1 ">
                          <p className="font-semibold"> Cash : </p>
                          {expenseData?.cashExpense}
                        </div>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col font-semibold">
                        <p className="w-[100%] px-2 border-2 max-[700px]:w-[100%]">
                          online (train/bus/flight tickets by office):
                          {expenseData?.onlinePayment}
                        </p>
                      </div>
                      <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                        {settlementAmount > 0 && (
                          <>
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
                            Amount for settlement : {settlementAmount} (
                            {voucherData?.currency})
                            <span> (user will deposit in office)</span>
                          </p>
                        )}
                        {settlementAmount == 0 ||
                          (!settlementAmount && (
                            <p
                              className={`w-[100%] px-2 font font-semibold ${"bg-yellow-400"} text-white p-2`}
                            >
                              Amount for settlement : {settlementAmount} (
                              {voucherData?.currency})
                              <span> (user will recieve from office )</span>
                            </p>
                          ))}
                      </div>
                      <div className="w-full h-[300px] border-2 border-gray-300 overflow-x-auto">
                        <div className="flex w-[810px] border-b-2">
                          <div className="w-[120px] font-bold px-2">date</div>
                          <div className="w-[130px] font-bold px-2">
                            Description
                          </div>
                          <div className="w-[125px] font-bold px-2">
                            Exp. Type
                          </div>
                          <div className="w-[135px] font-bold px-2">
                            Paym. Type
                          </div>
                          <div className="w-[110px] font-bold px-2">Amount</div>
                          <div className="w-[110px] font-bold px-2">
                            Bill No
                          </div>
                          {/* <div className="w-[110px] font-bold px-2"></div> */}
                        </div>
                        {voucherData?.voucherExpenses?.map((current) => {
                          return (
                            <div className="flex w-[810px]  border-b-2">
                              <div className="flex w-[120px]   overflow-x-hidden break-words">
                                <p className="w-[100%] px-2">
                                  {" "}
                                  {current?.date}
                                </p>
                              </div>
                              <div className="flex w-[130px]   overflow-x-hidden break-words">
                                <p className="w-[100%] px-2">
                                  {" "}
                                  {current?.description}
                                </p>
                              </div>
                              <div className="flex w-[125px]   overflow-x-hidden break-words">
                                <p className="w-[100%] px-2">
                                  {" "}
                                  {current?.expenseType}
                                </p>
                              </div>
                              <div className="flex w-[135px]   overflow-x-hidden break-words">
                                <p className="w-[100%] px-2">
                                  {" "}
                                  {current?.paymentType}
                                </p>
                              </div>
                              <div className="flex w-[110px]   overflow-x-hidden break-words">
                                <p className="w-[100%] px-2">
                                  {" "}
                                  {current?.Amount}
                                </p>
                              </div>
                              <div className="flex w-[110px]   overflow-x-hidden break-words">
                                <p className="w-[100%] px-2">
                                  {" "}
                                  {current?.voucherNo}
                                </p>
                              </div>

                              {voucherData?.userId == user?.id &&
                                voucherData?.statusType != "Accepted" &&
                                voucherData?.statusType != "Closed" && (
                                  <div className="flex">
                                    <FaRegEdit
                                      className="w-[25px] h-[25px] text-green-500 hover:text-green-700 cursor-pointer"
                                      onClick={() => {
                                        setUpdate(true);
                                        setUpdateData(current);
                                        setVoucherId(voucherData?.id);
                                      }}
                                    ></FaRegEdit>
                                    <MdDelete
                                      className="w-[25px] h-[25px] text-red-500 hover:text-red-700  cursor-pointer"
                                      onClick={() =>
                                        deleteExpenseHAndler(current?.id)
                                      }
                                    ></MdDelete>
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="font-bold w-[100%] text-center border-b-2 py-3">
                        Bills Images
                      </div>
                      {imageArray &&
                        imageArray.map((current, index) => {
                          console.log(current);
                          return (
                            <div
                              className="text-center font-semibold  text-white"
                              key={index}
                            >
                              <p>Bill Image-{index + 1}</p>
                              <img
                                src={`${current}`}
                                className="border-b-2 border-black"
                              ></img>
                            </div>
                          );
                        })}
                      {!voucherData.comment &&
                        voucherData?.statusType == "Pending" &&
                        (user?.isAdmin || user?.supervisor) && (
                          <div className="my-2 flex w-[100%]  border-b-2">
                            <div className="font-semibold my-2 px-2">
                              Comment :
                            </div>
                            <textarea
                              rows={3}
                              className="max-h-[100px] min-h-[50px] border-2 m-2 w-[60%]"
                              ref={CommentRef}
                            ></textarea>
                          </div>
                        )}
                      {(user?.isAdmin || user?.supervisor) &&
                        !editComment &&
                        voucherData?.comment && (
                          <div className="my-2 flex w-[100%]  border-b-2">
                            <div className="font-semibold my-2 px-2">
                              Comment :
                            </div>
                            <div
                              rows={3}
                              className="text-[.85rem] m-2 w-[50%] border-yellow-400 border-2"
                            >
                              <p className="p-2">{voucherData?.comment}</p>
                            </div>
                            {voucherData.userId != user?.id && (
                              <div className="mb-2">
                                <a
                                  className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-1 focus:outline-none focus:ring mx-2 mt-3 h-[35px] "
                                  href="#"
                                >
                                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-600 transition-all group-hover:h-full group-active:bg-indigo-500"></span>

                                  <span
                                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white flex"
                                    onClick={() => {
                                      setEditComment(true);
                                    }}
                                  >
                                    <CiEdit className="w-[20px] h-[20px]" />
                                    edit
                                  </span>
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      {(user?.isAdmin || user?.supervisor) &&
                        voucherData?.userId != user?.id &&
                        editComment && (
                          <div className="my-2 flex w-[100%]  border-b-2">
                            <div className="font-semibold my-2 px-2">
                              Comment :
                            </div>
                            <textarea
                              rows={3}
                              className="max-h-[100px] min-h-[50px] border-2 m-2 w-[50%]"
                              ref={CommentRef}
                            ></textarea>
                            <div className="flex items-center">
                              <p
                                className="p-2 bg-orange-400 text-white mx-2 rounded-md hover:bg-orange-600 cursor-pointer  h-fit"
                                onClick={() => {
                                  // setVoucherStatus("Rejected");
                                  // rejectVoucherHandler();
                                  sendCommentHandler();
                                }}
                              >
                                Re-comment
                              </p>
                            </div>
                          </div>
                        )}
                      {voucherData?.userId == user?.id && (
                        <div className="my-2 flex w-[100%]  border-b-2">
                          <div className="font-semibold my-2 px-2">
                            Comment :
                          </div>
                          <p>{voucherData?.comment}</p>
                        </div>
                      )}
                      {user?.isAdmin &&
                        !voucherData?.assignedTo &&
                        voucherData?.statusType == "Pending" && (
                          <div className="my-4 flex w-[100%] flex-col  border-b-2  items-center pb-2">
                            <p className="mx-2  font-bold">
                              Assign to Account Department :
                            </p>
                            <div
                              className="border-2 w-[250px] text-center cursor-pointer"
                              onClick={() => {
                                setPaymentDepartMentOpen(
                                  !paymentDepartmentOpen
                                );
                              }}
                            >
                              {selectedSupervisor
                                ? `${selectedSupervisor?.firstName} ${selectedSupervisor?.lastName}`
                                : "Select a value..."}
                            </div>
                            {paymentDepartmentOpen && paymentSupervisor && (
                              <div className="h-[150px] w-[250px] border-2 overflow-y-auto">
                                {paymentSupervisor.map((current) => {
                                  return (
                                    <div className="font-semibold border-b-2">
                                      <p
                                        className="text-ellipsis overflow-hidden whitespace-nowrap px-2 py-1 bg-blue-500  hover:bg-gray-400 cursor-pointer"
                                        onClick={() => {
                                          setPaymentDepartMentOpen(false);
                                          setSelectedSupervisor(current);
                                        }}
                                      >
                                        {current?.firstName} {current?.lastName}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      {user?.isAdmin &&
                        voucherData?.statusType != "Pending" &&
                        path != "/YOURVOUCHER" &&
                        !reAssignVoucher && (
                          <div className="my-4 flex w-[100%]  border-b-2  items-center pb-2">
                            <p className="mx-2  font-semibold">
                              Assigned For Payment Settlement :
                            </p>
                            <p className="px-2">{voucherData?.assignedName}</p>
                            <a
                              className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-1 focus:outline-none focus:ring mx-2 mt-3 h-[35px] "
                              href="#"
                              onClick={() => {
                                setReAsignVoucher(true);
                              }}
                            >
                              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-600 transition-all group-hover:h-full group-active:bg-indigo-500"></span>

                              <span
                                className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white flex"
                                onClick={() => {
                                  setReAsignVoucher(true);
                                }}
                              >
                                <MdAssignmentInd className="w-[20px] h-[20px] mx-2" />
                                Reassign
                              </span>
                            </a>
                          </div>
                        )}
                      {user?.isAdmin &&
                        voucherData?.statusType != "Pending" &&
                        reAssignVoucher && (
                          <div className="my-4 flex w-[100%] flex-col  border-b-2  items-center pb-2">
                            <p className="mx-2  font-bold">
                              Re- Assign to Account Department :
                            </p>
                            <div
                              className="border-2 w-[250px] text-center cursor-pointer"
                              onClick={() => {
                                setPaymentDepartMentOpen(
                                  !paymentDepartmentOpen
                                );
                              }}
                            >
                              {selectedSupervisor
                                ? `${selectedSupervisor?.firstName} ${selectedSupervisor?.lastName}`
                                : "Select a value..."}
                            </div>
                            {paymentDepartmentOpen && paymentSupervisor && (
                              <div className="h-[150px] w-[250px] border-2 overflow-y-auto">
                                {paymentSupervisor.map((current) => {
                                  return (
                                    <div className="font-semibold border-b-2">
                                      <p
                                        className="text-ellipsis overflow-hidden whitespace-nowrap px-2 py-1 bg-blue-500  hover:bg-gray-400 cursor-pointer"
                                        onClick={() => {
                                          setPaymentDepartMentOpen(false);
                                          setSelectedSupervisor(current);
                                        }}
                                      >
                                        {current?.firstName} {current?.lastName}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <p
                              className="border-2 border-green-400 text-black hover:text-white my-2 p-1 hover:bg-green-500 cursor-pointer rounded-md font-semibold"
                              onClick={() => {
                                reAssignVoucherHandler();
                              }}
                            >
                              Assign now
                            </p>
                          </div>
                        )}
                      {user?.isAdmin &&
                        voucherData?.voucherDescription?.dailyAllowance == 0 &&
                        voucherData?.statusType == "Pending" && (
                          <div className="my-4 flex w-[100%]   border-b-2 py-2">
                            <p className="mx-2  font-bold">DA Allowances :</p>
                            <input
                              className="border-2 w-[100px] px-2"
                              type="number"
                              ref={daAllowanceRef}
                            ></input>
                            <p className="p-2 font-semibold">
                              {voucherData?.currency}
                            </p>
                            <a
                              className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-1 focus:outline-none focus:ring mx-2 "
                              href="#"
                              onClick={() => {
                                setVoucherData((prev) => {
                                  return {
                                    ...prev,
                                    voucherDescription: {
                                      ...voucherData?.voucherDescription,
                                      dailyAllowance:
                                        daAllowanceRef.current.value,
                                    },
                                  };
                                });
                              }}
                            >
                              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-600 transition-all group-hover:h-full group-active:bg-indigo-500"></span>

                              <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                Check
                              </span>
                            </a>
                          </div>
                        )}
                      {voucherData?.statusType == "Pending" && (
                        <div className="my-2 flex w-[100%] justify-evenly font-bold text-white mb-[50px]">
                          {!voucherData?.comment &&
                            voucherData?.statusType == "Pending" &&
                            (user?.isAdmin || user?.supervisor) &&
                            voucherData?.userId != user?.id && (
                              <p
                                className="p-2 bg-orange-400 w-fit mx-2 rounded-md hover:bg-orange-600 cursor-pointer"
                                onClick={() => {
                                  sendCommentHandler();
                                }}
                              >
                                Comment Only
                              </p>
                            )}
                          {(user?.isAdmin || user?.supervisor) &&
                            voucherData?.userId != user?.id &&
                            user?.id && (
                              <>
                                <p
                                  className="p-2 bg-blue-400 w-fit rounded-md hover:bg-blue-600 cursor-pointer"
                                  onClick={() => {
                                    acceptVoucherHandler();
                                  }}
                                >
                                  Accept
                                </p>
                                <p
                                  className="p-2 bg-red-400 w-fit mx-2 rounded-md hover:bg-red-600 cursor-pointer"
                                  onClick={() => {
                                    // setVoucherStatus("Rejected");
                                    rejectVoucherHandler();
                                  }}
                                >
                                  Reject
                                </p>
                              </>
                            )}
                        </div>
                      )}
                      {/* {console.log(voucherData)} */}
                      {(user?.isAdmin || user?.supervisor) &&
                        path == "/ACCOUNTS" &&
                        voucherData?.assignedTo == user?.id &&
                        voucherData?.statusType == "Accepted" && (
                          <div className="w-[100%] flex justify-center">
                            <p
                              className="p-2 bg-blue-400 text-white w-fit rounded-md hover:bg-blue-600 cursor-pointer"
                              onClick={() => {
                                closeVoucherHandler();
                              }}
                            >
                              Acknowledge
                            </p>
                          </div>
                        )}
                      <div className="mt-[100px]"> </div>
                      <DownloadPdfButton
                        expenseData={expenseData}
                        data={{
                          settlementAmount,
                          dateDifferenceInHour,
                          expenseData,
                          totalDa,
                        }}
                        voucherData={voucherData}
                        bills={imageArray}
                      ></DownloadPdfButton>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          )}
        </Dialog>
      </Transition.Root>
    </>
  );
}
