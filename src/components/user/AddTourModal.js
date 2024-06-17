import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../../store/Context";
import State from "../../assests/State";
import City from "../../assests/Cities";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { InfinitySpin, RotatingLines } from "react-loader-spinner";
function AddTourModal(props) {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  // const [open, setOpen] = useState(props.open);
  const [citySelected, setCitySelected] = useState(null);
  const [cityDropDownOpen, setCityDropDownOpen] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);

  const [stateSelected, setStateSelected] = useState(null);
  const [stateDropDownOpen, setStateDropDownOpen] = useState(false);
  const currencyRef = useRef("");
  const cityRef = useRef("");

  const ctx = useContext(Context);

  const cancelButtonRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("token"));

  const saveTourHandler = async () => {
    setCreateLoader(true);
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/createTour`,
        {
          token: user.access_token,
          domain: user.domain,
          city: citySelected || cityRef.current.value,
          currency: currencyRef.current.value,
        }
      );
      const res = response.data.voucher;
      setCreateLoader(false);
      ctx.addTourInOngoing(res);
      toast.success("tour created successfully...");
      props.close();

      // ctx.userExpenses(res);
      //   ctx.AllVoucher(response.data.userList);
    } catch (err) {
      setCreateLoader(false);
      if (err.response && err.response.data) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("something went wrong");
      }
      console.log(err);
    }
  };

  const handleCurrencyChange = () => {
    const selectedCurrency = currencyRef.current.value;
    console.log("Selected currency:", selectedCurrency);
    // You can now use the selectedCurrency variable as needed
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[100%] md:w-[500px] py-4 bg-[#257894] text-white">
                <div
                  className="fixed right-4 top-2  flex cursor-pointer font-bold underline"
                  onClick={() => props.close()}
                >
                  <IoIosCloseCircle className="w-[30px] h-[30px]"></IoIosCloseCircle>
                  close
                </div>{" "}
                <div className="text-center pb-4">
                  <div className="text-2xl font-semibold flex items-center">
                    {" "}
                    <div className="bg-gradient-to-r from-[#257894] to-white flex-1 h-[2px]"></div>
                    <div className="md:font-bold text-2xl m-3  text-white font-medium">
                      ADD TOUR
                    </div>
                    <div className="bg-gradient-to-r from-white to-[#257894] flex-1 h-[2px]"></div>
                  </div>

                  {/* <p className="pb-2 text-[.9rem]">
                  Enjoy all Features of VTS{" "}
                </p> */}
                </div>{" "}
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label> State</label>
                    <div
                      className="outline-none border-2 border-white  bg-transparent "
                      onClick={() => {
                        setStateDropDownOpen(!stateDropDownOpen);
                      }}
                    >
                      {!stateSelected ? (
                        <p className="h-[30px] px-2">Select State here..</p>
                      ) : (
                        <p className="overflow-hidden w-[100%] flex flex-nowrap h-[30px] px-2">
                          {stateSelected}
                        </p>
                      )}
                    </div>
                    {stateDropDownOpen && (
                      <div className="outline-none border-2 border-white  bg-white h-[100px] overflow-y-auto overflow-x-hidden">
                        {State.map((current) => {
                          return (
                            <div
                              className="text-black border-2 border-b hover:bg-blue-400 hover:text-white"
                              onClick={() => {
                                setStateSelected(current);
                                setStateDropDownOpen(false);
                              }}
                            >
                              {current}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label> City</label>
                    <div
                      className="outline-none border-2 border-white  bg-transparent "
                      onClick={() => {
                        setCityDropDownOpen(!cityDropDownOpen);
                      }}
                    >
                      {!citySelected ? (
                        <p className="h-[30px] px-2">Select City here..</p>
                      ) : (
                        <p className="overflow-hidden w-[100%] flex flex-nowrap h-[30px] px-2">
                          {citySelected}
                        </p>
                      )}
                    </div>
                    {cityDropDownOpen && (
                      <div className="outline-none border-2 border-white  bg-white h-[100px] overflow-y-auto overflow-x-hidden">
                        {City[stateSelected]?.map((current) => {
                          return (
                            <div
                              className="text-black border-2 border-b hover:bg-blue-400 hover:text-white"
                              onClick={() => {
                                setCitySelected(current);
                                setCityDropDownOpen(false);
                              }}
                            >
                              {current}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex  min-[370px]:px-12">
                  <div className="flex    py-2">
                    <div>
                      <p className="px-2">City :</p>
                      <input
                        className="outline-none border-2 border-white mx-2 w-[100%]  bg-transparent "
                        ref={cityRef}
                      ></input>

                      <p className="text-sm px-2">
                        (if Not present in Above list)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex  min-[370px]:px-8">
                  <div className="flex   w-[100%] py-2 max-[370px]:px-2">
                    <div className="min-[370px]:px-6">
                      <p> Currency :</p>
                      <select
                        className="outline-none border-2 border-white bg-transparent   bg-blue-400 text-white font-bold "
                        ref={currencyRef}
                        onChange={handleCurrencyChange}
                      >
                        <option
                          value="INR"
                          className="border-b-2 bg-blue-400 hover:bg-white font-bold  hover:text-white"
                        >
                          Rupees
                        </option>
                        <option
                          value="USD"
                          className="border-b-2 bg-blue-400 hover:bg-white font-bold  hover:text-white"
                        >
                          US Dollar
                        </option>
                        <option
                          value="SGD"
                          className="border-b-2 bg-blue-400 hover:bg-white font-bold  hover:text-black"
                        >
                          Singapore Dollar
                        </option>
                        <option
                          value="JPY"
                          className="border-b-2 bg-blue-400 hover:bg-white font-bold  hover:text-black"
                        >
                          Japanese Yen{" "}
                        </option>
                        <option
                          value="EUR"
                          className="border-b-2 bg-blue-400 hover:bg-white font-bold  hover:text-black"
                        >
                          Euro{" "}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] flex  justify-center mb-4 mt-6">
                  {!createLoader ? (
                    <p
                      className="w-[80%] hover:bg-gray-300 bg-white text-black text-center font-semibold py-3 rounded-md cursor-pointer"
                      onClick={saveTourHandler}
                    >
                      Create Tour
                    </p>
                  ) : (
                    <p
                      className="w-[80%] hover:bg-gray-300 bg-white text-black flex justify-center font-semibold py-3 rounded-md cursor-pointer"
                      onClick={saveTourHandler}
                    >
                      <RotatingLines
                        visible={true}
                        height="24"
                        width="24"
                        color="red"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      /> Adding...
                    </p>
                  )}
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
