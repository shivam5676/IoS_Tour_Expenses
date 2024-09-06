import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../../store/Context";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
function AddtourDescriptionModal(props) {
  const connectionUrl = process.env.REACT_APP_BACKEND_URL;
  const [saveLoader, setSaveLoader] = useState(false);

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
    setSaveLoader(true);
    if (arrivalDateRef.current.value < departureDateRef.current.value) {
      toast.error("arrival date can not less than departure date");
      setSaveLoader(false);
      return;
    }

    const data = {
      purpose: purposeRef.current.value,
      arrivalDate: arrivalDateRef.current.value,
      departureDate: departureDateRef.current.value,
      transportArrival: transportArrivalRef.current.value,
      transportDeparture: transportDepartureRef.current.value,
      arrivalTime: arrivalTimeRef.current.value,
      departureTime: departureTimeRef.current.value,
      advanceCash: advanceCashRef.current.value,
      uid: user.id,
      dailyAllowance: 0,
      voucherId: ctx.currentTourIdData,
      token: user.access_token,
      domain: user.domain,
    };

    // return
    try {
      const response = await axios.post(
        `${connectionUrl}/user/addDetails`,
        data
      );
      const res = response.data;
      ctx.removeOnGoingTour(res.details.id);
      props.close("success");
      toast.success("voucher has been send to admin ...wait for thier action");
      setSaveLoader(false);
    } catch (err) {
      console.log(err);
      setSaveLoader(false);
      if (err.response && err.response.data.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("something went wrong while saving details....");
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto pt-[70px] md:pt-[60px]">
          <div className="flex min-h-full  justify-center p-4 text-center items-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[100%] md:w-[500px] py-4 bg-white text-black font-semibold">
                <div className="text-center pb-2">
                  <div className="text-sm font-semibold flex items-center">
                    {" "}
                    <div
                      className="fixed right-4 top-2 flex cursor-pointer font-bold underline"
                      onClick={() => props.close()}
                    >
                      <IoIosCloseCircle className="w-[30px] h-[30px]"></IoIosCloseCircle>
                    </div>{" "}
                    <div className="md:font-bold text-md m-3 mt-7  text-blue-500 font-medium px-2">
                      we want some more details about this tour before sending
                      your voucher to the administrator.
                    </div>
                  </div>
                </div>{" "}
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Departure date</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500"
                      type="date"
                      ref={departureDateRef}
                    ></input>
                  </div>{" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Arrival date</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500"
                      type="date"
                      ref={arrivalDateRef}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Deparure Time</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500"
                      type="time"
                      ref={departureTimeRef}
                    ></input>
                  </div>{" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Arrival Time</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500"
                      ref={arrivalTimeRef}
                      type="time"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>purpose</label>
                    <textarea
                      rows={1}
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500 px-2"
                      ref={purposeRef}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Transport (Arrival)</label>
                    <select
                      className="outline-none border-2  font-semibold border-gray-400  bg-transparent"
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
                      className="outline-none border-2  font-semibold border-gray-400  bg-transparent bg-blue-500"
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
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Advance Cash (if taken)</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500 px-2"
                      ref={advanceCashRef}
                    ></input>
                  </div>
                </div>
                <div className="w-[100%] flex  justify-center mb-4 mt-6">
                  <p
                    className="w-[80%] hover:bg-blue-700
                     bg-blue-600 text-white flex justify-center font-semibold py-3 rounded-md cursor-pointer"
                    onClick={tourDescriptionHandler}
                  >
                    {!saveLoader ? (
                      "Send Voucher"
                    ) : (
                      <RotatingLines
                        visible={true}
                        height="24"
                        width="24"
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    )}
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
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
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
