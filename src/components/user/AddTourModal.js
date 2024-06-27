import React, { useContext, useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Context from "../../store/Context";
import State from "../../assests/State";
import City from "../../assests/Cities";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";

function AddTourModal(props) {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const [stateList, setStateList] = useState(State);
  const [cityList, setCityList] = useState(null);
  const [citySelected, setCitySelected] = useState(null);
  const [cityDropDownOpen, setCityDropDownOpen] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);

  const [stateSelected, setStateSelected] = useState(null);
  const [stateDropDownOpen, setStateDropDownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");

  const currencyRef = useRef("");
  const cityRef = useRef("");

  const ctx = useContext(Context);

  const cancelButtonRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("token"));

  const filterCityHandler = (e) => {
    const searchValue = e.target.value;
    if (searchValue === "") {
      setCityList(City[stateSelected]);
    } else {
      const findCity = City[stateSelected]?.filter((current) =>
        current.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCityList(findCity);
    }
  };

  const filterStateHandler = (e) => {
    const searchValue = e.target.value;
    setStateSearch(searchValue);
    if (searchValue === "") {
      setStateList(State);
      setStateDropDownOpen(false); // Close dropdown if input is empty
    } else {
      const findByCharacters = State.filter((current) =>
        current.toLowerCase().includes(searchValue.toLowerCase())
      );
      setStateList(findByCharacters);
      setStateDropDownOpen(true); // Open dropdown if input is not empty
    }
  };

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
      toast.success("Tour created successfully...");
      props.close();
    } catch (err) {
      setCreateLoader(false);
      if (err.response && err.response.data) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
      console.log(err);
    }
  };

  const handleCurrencyChange = () => {
    const selectedCurrency = currencyRef.current.value;
    console.log("Selected currency:", selectedCurrency);
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
          <div className="flex min-h-full justify-center p-4 text-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[100%] md:w-[500px] py-4  bg-white">
                <div
                  className="fixed right-4 top-2 flex cursor-pointer font-bold underline text-blue-600"
                  onClick={() => props.close()}
                >
                  <IoIosCloseCircle className="w-[30px] h-[30px]" />
                </div>
                <div className="text-center pb-4">
                  <div className="text-2xl font-semibold flex items-center">
                    <div className="bg-gradient-to-r from-white to-blue-600 flex-1 h-[2px]" />
                    <div className="md:font-bold text-2xl m-3 text-blue-600 font-medium">
                      ADD TOUR
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-white flex-1 h-[2px]" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row min-[370px]:px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2 relative font-semibold">
                    <label className=" py-1">State</label>
                    <div className="outline-none border-2 border-blue-500 bg-white">
                      <div className="flex">
                        {" "}
                        <input
                          className="w-full px-2 py-1"
                          placeholder="Enter Your State Name"
                          value={stateSelected || stateSearch}
                          onChange={filterStateHandler}
                          onFocus={() => {
                            if (stateSearch !== "") setStateDropDownOpen(true);
                          }}
                        />
                        {stateSelected !== null && (
                          <button
                            className="h-full m-1 flex items-center text-gray-500 hover:text-gray-700"
                            onClick={() => setStateSelected(null)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm3.707 12.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 111.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {stateDropDownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 border-2 border-blue-500 bg-white h-[150px] overflow-y-auto overflow-x-hidden z-20">
                          {stateList.length > 0 ? (
                            stateList.map((current) => (
                              <div
                                key={current}
                                className="text-black px-2 py-1 border-b bg-blue-400 hover:bg-blue-700 hover:text-white cursor-pointer"
                                onClick={() => {
                                  setStateSelected(current);
                                  setCityList(City[current]);
                                  setStateDropDownOpen(false);
                                  setStateSearch("");
                                }}
                              >
                                {current}
                              </div>
                            ))
                          ) : (
                            <div className="text-black px-2 py-1 border-b bg-red-400 hover:bg-red-500 cursor-pointer">
                              No state found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2 relative font-semibold">
                    <label className="font-semibold py-1">City</label>
                    <div
                      className="outline-none border-2 border-blue-500 bg-transparent cursor-pointer"
                      onClick={() => setCityDropDownOpen(!cityDropDownOpen)}
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
                      <div className="absolute top-full left-0 right-0 mt-1 outline-none border-2 border-blue-500 bg-white h-[150px] overflow-y-auto overflow-x-hidden z-20">
                        <input
                          placeholder="Enter Your City Name"
                          className="w-full px-2 py-1 border-b-2 outline-0"
                          onChange={filterCityHandler}
                        />
                        <div className="mt-2">
                          {cityList?.length > 0 ? (
                            cityList.map((current) => (
                              <div
                                key={current}
                                className="text-black px-2 py-1 border-b bg-blue-400 hover:bg-blue-700 hover:text-white cursor-pointer"
                                onClick={() => {
                                  setCitySelected(current);
                                  setCityDropDownOpen(false);
                                }}
                              >
                                {current}
                              </div>
                            ))
                          ) : (
                            <div className="text-black px-2 py-1 border-b bg-red-400 hover:bg-red-500 cursor-pointer">
                              No city found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row min-[370px]:px-12 py-2 font-semibold">
                  <div className="flex flex-col px-2 w-[100%] py-2 font-semibold">
                    <div>
                      <p className=" py-1">Other City:</p>
                      <input
                        ref={cityRef}
                        className="w-full px-2 py-1 outline-none border-2 border-blue-500 bg-white"
                        placeholder="Enter City Name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2 font-semibold">
                    <div>
                      <p className=" py-1">Currency:</p>
                      <input
                        ref={currencyRef}
                        className="w-full px-2 py-1 outline-none border-2 border-blue-500 bg-white"
                        placeholder="Enter Currency"
                        onChange={handleCurrencyChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end m-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={saveTourHandler}
                    disabled={createLoader}
                  >
                    {createLoader ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                      />
                    ) : (
                      "Save Tour"
                    )}
                  </button>
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
