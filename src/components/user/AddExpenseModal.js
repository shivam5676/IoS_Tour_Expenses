import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../../store/Context";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";

function AddExpenseModal(props) {
  const connectionUrl = "http://localhost:2000";
  //   const [open, setOpen] = useState(true);
  const ctx = useContext(Context);
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
  const saveExpenseHandler = async () => {
    let base64Image = "";
    if (billImageRef.current.files[0]) {
      console.log(billImageRef.current.files[0]);
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
        } catch (err) {
          toast.error(err.response?.data?.msg);
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
      } catch (err) {
        toast.error(err.response?.data?.msg);
      }
    }
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.onClose}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[80%] md:w-[500px] py-4 bg-gradient-to-r from-[#3a5f66] to-[#144786] text-white">
                <div
                  className="fixed right-4 top-2 flex cursor-pointer font-bold underline"
                  onClick={() => props.onClose()}
                >
                  <IoIosCloseCircle className="w-[30px] h-[30px]"></IoIosCloseCircle>
                  close
                </div>
                <div className="text-center pb-4">
                  <div className="text-2xl font-semibold flex items-center">
                    {" "}
                    <div className="bg-gradient-to-r from-[#26718f] to-yellow-400 flex-1 h-[2px]"></div>
                    <div className="md:font-bold text-2xl m-3  text-white font-medium">
                      ADD EXPENSE
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-[#37aa3d] flex-1 h-[2px]"></div>
                  </div>
                  <div>
                    Date:
                    <input
                      type="date"
                      className="border-2 bg-transparent mx-3 px-2"
                      ref={dateRef}
                    ></input>
                  </div>
                  {/* <p className="pb-2 text-[.9rem]">
                  Enjoy all Features of VTS{" "}
                </p> */}
                </div>{" "}
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Amount</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent px-2 text-black"
                      ref={amountRef}
                      // type="phone"
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Expense Category</label>
                    <select
                      className="outline-none border-2 border-white text-black font-semibold bg-transparent"
                      //   ref={expenseCategoryRef}
                      onChange={(e) =>
                        (expenseCategoryRef.current = e.target.value)
                      }
                    >
                      <option value="Travel">Travel</option>
                      <option value="Food(Da)">Food(Da)</option>
                      <option value="Accomondation">Accomondation</option>
                      <option value="Misc">Misc</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      className="outline-none border-2 border-white  bg-transparent px-2 text-black"
                      ref={descriptionRef}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Bill No (if present)</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent text-black px-2"
                      ref={voucherRef}
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Payment Type</label>
                    <select
                      className="outline-none border-2 text-black font-semibold border-white  bg-transparent"
                      ref={paymentTypeRef}
                      onChange={(e) => {
                        paymentTypeRef.current.value = e.target.value;
                      }}
                    >
                      <option value={"Credit Card"}>Credit card</option>
                      <option value={"Cash"}>Cash</option>
                      <option value={"Online (train/flight)"}>
                        Online(train/flight)
                      </option>
                    </select>
                  </div>
                </div>{" "}
                <div className="text-center py-4">
                  <div>
                    Bill Image :
                    <input
                      type="file"
                      className="border-2 bg-transparent mx-3 px-2"
                      ref={billImageRef}
                      accept=".jpg,.jpeg,.png"
                      onChange={handleImageChange}
                    ></input>
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Bill Preview"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                </div>
                <div className="w-[100%] flex  justify-center mb-4 mt-6">
                  <p
                    className="w-[80%] hover:bg-gray-400 bg-white text-black text-center font-semibold py-3 rounded-md cursor-pointer"
                    onClick={saveExpenseHandler}
                  >
                    Add Expense
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
