import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../../store/Context";
function AddTourModal(props) {
  const connectionUrl = "http://localhost:2000";
  //   const [open, setOpen] = useState(true);
  const ctx = useContext(Context);
  const cancelButtonRef = useRef(null);
  const amountRef = useRef();
  const expenseCategoryRef = useRef("Travel");
  const descriptionRef = useRef();
  const voucherRef = useRef();
  const paymentTypeRef = useRef();
  const dateRef = useRef(null);
  const saveExpenseHandler = async () => {
    const data = {
      date: dateRef.current.value,
      amount: amountRef.current.value,
      expenseType: expenseCategoryRef.current,
      voucher: voucherRef.current.value,
      paymentType: paymentTypeRef.current.value,
      description: descriptionRef.current.value,
      voucherId: 1,
      userId: 1,
    };
    try {
      const response = await axios.post(
        `${connectionUrl}/user/saveExpense`,
        data
      );
      const res = response.data.expenseData;
      console.log(res);
      ctx.userExpenses(res);
      //   ctx.AllVoucher(response.data.userList);
    } catch (err) {
      console.log(err);
    }
  };
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[80%] md:w-[500px] py-4 bg-[#F33A6A] text-white">
                <div className="text-center pb-4">
                  <div className="text-2xl font-semibold flex items-center">
                    {" "}
                    <div className="bg-gradient-to-r from-[#F33A6A] to-white flex-1 h-[2px]"></div>
                    <div className="md:font-bold text-2xl m-3  text-white font-medium">
                      ADD TOUR
                    </div>
                    <div className="bg-gradient-to-r from-white to-[#F33A6A] flex-1 h-[2px]"></div>
                  </div>

                  {/* <p className="pb-2 text-[.9rem]">
                  Enjoy all Features of VTS{" "}
                </p> */}
                </div>{" "}
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Select State</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent "
                      ref={amountRef}
                      // type="phone"
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Select City</label>
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
                {/* <div className="flex flex-col sm:flex-row px-12">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      className="outline-none border-2 border-white  bg-transparent"
                      ref={descriptionRef}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Voucher No (if present)</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent"
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
                </div> */}
                <div className="w-[100%] flex  justify-center mb-4 mt-6">
                  <p
                    className="w-[80%] bg-white text-black text-center font-semibold py-3 rounded-md cursor-pointer"
                    onClick={saveExpenseHandler}
                  >
                    Create Tour
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

export default AddTourModal;
