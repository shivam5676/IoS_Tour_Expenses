import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../../store/Context";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { MdClose } from "react-icons/md";

function AddExpenseModal(props) {
  const connectionUrl = process.env.REACT_APP_BACKEND_URL;
  //   const [open, setOpen] = useState(true);
  const ctx = useContext(Context);

  // console.log(ctx.currentTourDetailsData.tourDate, "currentdataaaaaa");
  const cancelButtonRef = useRef(null);
  const amountRef = useRef();
  const expenseCategoryRef = useRef("Travel");
  const descriptionRef = useRef();
  const voucherRef = useRef();
  const paymentTypeRef = useRef();
  const billImageRef = useRef(null);
  const dateRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("token"));
  const [imagePreview, setImagePreview] = useState(null);
  const [saveLoader, setSaveLoader] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    }
  };
  const removeImageHandler = () => {
    setImagePreview(null);
    billImageRef.current.value = null;
  };
  const saveExpenseHandler = async () => {
    setSaveLoader(true);
    let base64Image = "";
    const dateString = dateRef.current.value;

    // Convert the date string to a Date object
    const date = new Date(dateString);

    // Get day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    if (formattedDate < ctx?.currentTourDetailsData?.tourDate) {
      toast.error(
        "Expense date can not be smaller than tour creation(tour starting) date"
      );
      return;
    }

    if (billImageRef.current.files[0]) {
      const file = billImageRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        base64Image = reader.result;
        const data = {
          date: dateRef.current.value,
          amount: amountRef.current.value,
          expenseType: expenseCategoryRef.current,
          voucher: voucherRef.current.value,
          paymentType: paymentTypeRef.current.value,
          description: descriptionRef.current.value,
          voucherId: ctx.currentTourIdData,
          token: user.access_token,
          domain: user.domain,
          billImage: base64Image,
        };

        try {
          const response = await axios.post(
            `${connectionUrl}/user/saveExpense`,
            data
          );
          const res = response.data.expenseData;
          ctx.userCurrentTourExpenses(res);
          toast.success("Expense added.");
          setSaveLoader(false);
        } catch (err) {
          toast.error(err.response?.data?.msg);
          setSaveLoader(false);
        }
      };
    } else {
      const data = {
        date: dateRef.current.value,
        amount: amountRef.current.value,
        expenseType: expenseCategoryRef.current,
        voucher: voucherRef.current.value,
        paymentType: paymentTypeRef.current.value,
        description: descriptionRef.current.value,
        voucherId: ctx.currentTourIdData,
        token: user.access_token,
        domain: user.domain,
        billImage: base64Image,
      };

      try {
        const response = await axios.post(
          `${connectionUrl}/user/saveExpense`,
          data
        );
        const res = response.data.expenseData;
        ctx.userCurrentTourExpenses(res);
        toast.success("Expense added.");
        setSaveLoader(false);
      } catch (err) {
        toast.error(err.response?.data?.msg);
        setSaveLoader(false);
      }
    }
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          return;
        }}
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto pt-[80px] md:pt-[60px]">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[100%] md:w-[500px] py-4 bg-white text-white">
                <div
                  className="fixed right-4 top-2 flex cursor-pointer font-bold underline"
                  onClick={() => props.onClose()}
                >
                  <IoIosCloseCircle className="w-[30px] h-[30px] text-blue-600"></IoIosCloseCircle>
                </div>
                <div className="text-center pb-4">
                  <div className="text-2xl font-semibold flex items-center">
                    {" "}
                    <div className="bg-gradient-to-r from-white to-blue-600  flex-1 h-[2px]"></div>
                    <div className="md:font-bold text-2xl pt-2 m-3  text-blue-600 font-medium">
                      ADD EXPENSE
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-white  flex-1 h-[2px]"></div>
                  </div>
                  <div className="flex flex-col items-center text-black font-semibold">
                    <p className="">Date:</p>
                    <input
                      type="date"
                      className="border-2 bg-transparent w-[200px] mx-3 px-2"
                      ref={dateRef}
                    ></input>
                  </div>
                </div>{" "}
                <div className="flex flex-col sm:flex-row px-12 text-black font-semibold">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Amount</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent px-2 "
                      ref={amountRef}
                      // type="phone"
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2 text-black">
                    <label className="text-black">Expense Category</label>
                    <select
                      className="outline-none border-2 border-gray-400  font-semibold bg-transparent"
                      //   ref={expenseCategoryRef}
                      onChange={(e) =>
                        (expenseCategoryRef.current = e.target.value)
                      }
                    >
                      <option value="Travel" className="bg-blue-400">
                        Travel
                      </option>
                      <option value="Food(Da)" className="bg-blue-400">
                        Food
                      </option>
                      <option value="Accomondation" className="bg-blue-400">
                        Accomondation
                      </option>
                      <option value="Misc" className="bg-blue-400">
                        Misc
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12 text-black font-semibold">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      className="outline-none border-2 border-gray-400  bg-transparent px-2 "
                      ref={descriptionRef}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12 text-black font-semibold">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Bill No (if present)</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent  px-2"
                      ref={voucherRef}
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Payment Type</label>
                    <select
                      className="outline-none border-2  font-semibold border-gray-400  bg-transparent"
                      ref={paymentTypeRef}
                      onChange={(e) => {
                        paymentTypeRef.current.value = e.target.value;
                      }}
                    >
                      <option value={"Credit Card"} className="bg-blue-400">
                        Credit card
                      </option>
                      <option value={"Cash"} className="bg-blue-400">
                        Cash
                      </option>
                      <option
                        value={"Online (train/flight)"}
                        className="bg-blue-400"
                      >
                        Online(train/flight)
                      </option>
                    </select>
                  </div>
                </div>{" "}
                <div className="flex flex-col px-12 w-[100%] py-2 text-black font-semibold">
                  <p className="px-2">Bill Image :</p>
                  <input
                    type="file"
                    className="border-2 bg-transparent mx-2 "
                    ref={billImageRef}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                  ></input>

                  {imagePreview && (
                    <div className="mt-4 ">
                      <div
                        className="flex justify-end text-red-500 underline"
                        onClick={removeImageHandler}
                      >
                        Remove Image
                      </div>
                      <img
                        src={imagePreview}
                        alt="Bill Preview"
                        className="max-w-[100%]  h-auto"
                      />
                    </div>
                  )}
                </div>
                <div className="w-[100%] flex  justify-center mb-4 mt-6">
                  <p
                    className="w-[80%] bg-blue-600  hover:bg-blue-700 flex  justify-center font-semibold py-3 rounded-md cursor-pointer text-white"
                    onClick={saveExpenseHandler}
                  >
                    {!saveLoader ? (
                      "Add Expense"
                    ) : (
                      <RotatingLines
                        visible={true}
                        height="24"
                        width="24"
                        strokeColor="black"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    )}
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddExpenseModal;
