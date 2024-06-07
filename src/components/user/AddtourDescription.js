import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../../store/Context";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
function AddtourDescriptionModal(props) {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;

  const ctx = useContext(Context);
  const user = JSON.parse(localStorage.getItem("token"));

  const cancelButtonRef = useRef(null);
  const arrivalDateRef = useRef(null);
  const departureDateRef = useRef(null);
  const purposeRef = useRef();
  const dailyAllowanceRef = useRef();
  const advanceCashRef = useRef();
  const transportArrivalRef = useRef(null);
  const transportDepartureRef = useRef();
  const arrivalTimeRef = useRef();
  const departureTimeRef = useRef();
  const tourDescriptionHandler = async () => {
    const data = {
      purpose: purposeRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      departureDate: departureDateRef.current.value,
      transportArrival: transportArrivalRef.current.value,
      transportDeparture: transportDepartureRef.current.value,
      arrivalTime: arrivalTimeRef.current.value,
      departureTime: departureTimeRef.current.value,
      advanceCash: advanceCashRef.current.value,

      dailyAllowance: 0,
      voucherId: ctx.currentTourIdData,
      token: user.access_token,
      domain: user.domain,
    };

    console.log(ctx.currentTourIdData);
    // return
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/addDetails`,
        data
      );
      const res = response.data;
      console.log(res);
      ctx.removeOnGoingTour(res.details.id);
      props.close();
      toast.success("voucher has been send to admin ...wait for thier action");
      // ctx.userExpenses(res);
      //   ctx.AllVoucher(response.data.userList);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          props.close();
          // props.removeOnGoingTour()
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[80%] md:w-[500px] py-4 bg-[#257894] text-white">
                <div className="text-center pb-2">
                  <div className="text-sm font-semibold flex items-center">
                    {" "}
                    <div
                      className="fixed right-4 top-2 flex cursor-pointer font-bold underline"
                      onClick={() => props.close()}
                    >
                      <IoIosCloseCircle className="w-[30px] h-[30px]"></IoIosCloseCircle>
                      close
                    </div>{" "}
                    <div className="md:font-bold text-md m-3 mt-7  text-white font-medium px-2">
                      we want some more details about this tour before sending
                      your voucher to the administrator.
                    </div>
                    {/* <div className="bg-gradient-to-r from-white to-[#F33A6A] flex-1 h-[2px]"></div> */}
                  </div>

                  {/* <p className="pb-2 text-[.9rem]">
                  Enjoy all Features of VTS{" "}
                </p> */}
                </div>{" "}
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Arrival date</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent text-white"
                      type="date"
                      ref={arrivalDateRef}
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Departure date</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent text-white"
                      type="date"
                      ref={departureDateRef}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Arrival Time</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent text-white"
                      ref={arrivalTimeRef}
                      type="time"
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Deparure Time</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent text-white"
                      type="time"
                      ref={departureTimeRef}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>purpose</label>
                    <textarea
                      rows={1}
                      className="outline-none border-2 border-white  bg-transparent text-white px-2"
                      ref={purposeRef}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Transport (Arrival)</label>
                    <select
                      className="outline-none border-2  font-semibold border-white  bg-transparent"
                      ref={transportDepartureRef}
                      onChange={(e) => {
                        // paymentTypeRef.current.value = e.target.value;
                      }}
                    >
                      <option value={"Flight"} className="bg-blue-400">
                        Flight
                      </option>
                      <option value={"Train"} className="bg-blue-400">
                        Train
                      </option>
                      <option value={"Bus"} className="bg-blue-400">
                        Bus
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Transport (Departure)</label>
                    <select
                      className="outline-none border-2  font-semibold border-white  bg-transparent bg-blue-500"
                      ref={transportArrivalRef}
                      onChange={(e) => {
                        // paymentTypeRef.current.value = e.target.value;
                      }}
                    >
                      <option value={"Flight"} className="bg-blue-400">
                        Flight
                      </option>
                      <option value={"Train"} className="bg-blue-400">
                        Train
                      </option>
                      <option value={"Bus"} className="bg-blue-400">
                        Bus
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Advance Cash (if taken)</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent text-white px-2"
                      ref={advanceCashRef}
                    ></input>
                  </div>
                  {/* <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Daily allowance</label>
                    <input
                      className="outline-none border-2 border-white  bg-transparent text-white ps-2"
                      type="number"
                      ref={dailyAllowanceRef}
                    ></input>
                  </div> */}
                </div>
                <div className="w-[100%] flex  justify-center mb-4 mt-6">
                  <p
                    className="w-[80%] hover:bg-gray-300
                     bg-white text-black  text-center font-semibold py-3 rounded-md cursor-pointer"
                    onClick={tourDescriptionHandler}
                  >
                    Send Voucher
                  </p>
                </div>
                {/* <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Deactivate account
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently
                        removed. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
                {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddtourDescriptionModal;
