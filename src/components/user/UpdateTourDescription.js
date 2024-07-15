import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useRef, useState } from "react";
import Context from "../../store/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";

const UpdateTourDescription = (props) => {
 
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
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
      descriptionId: props?.description?.id,
    };
    console.log(data);
    // return;
    // return
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/updateDetails`,
        data
      );
      //   const res = response.data;
      //   ctx.removeOnGoingTour(res.details.id);
      props.close();
      toast.success("voucher description changed please refresh the page ");
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto  pt-[90px] md:pt-[70px]">
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
                      defaultValue={props?.description?.departureDate}
                    ></input>
                  </div>{" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Arrival date</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500"
                      type="date"
                      ref={arrivalDateRef}
                      defaultValue={props?.description?.arrivalDate}
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
                      defaultValue={props?.description?.departureTime}
                    ></input>
                  </div>{" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Arrival Time</label>
                    <input
                      className="outline-none border-2 border-gray-400  bg-transparent text-gray-500"
                      ref={arrivalTimeRef}
                      type="time"
                      defaultValue={props?.description?.arrivalTime}
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
                      defaultValue={props?.description?.purpose}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Transport (Arrival)</label>
                    <select
                      className="outline-none border-2  font-semibold border-gray-400  bg-transparent"
                      ref={transportArrivalRef}
                      onChange={(e) => {}}
                      defaultValue={props?.description?.transportDeparture}
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
                      ref={transportDepartureRef}
                      onChange={(e) => {
                        // paymentTypeRef.current.value = e.target.value;
                      }}
                      //   defaultChecked={props?.description?.transportArrival}
                      defaultValue={props?.description?.transportArrival}
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
                      defaultValue={props?.description?.advanceCash}
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
                      "Update Details"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateTourDescription;
