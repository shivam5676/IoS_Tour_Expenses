import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const TokenValidator = (props) => {
  const [createLoader, setCreateLoader] = useState(false);
  const cancelButtonRef = useRef();
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const user = JSON.parse(localStorage.getItem("token"));

  const siginValidator = async () => {
    setCreateLoader(true);
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/sessionRefresh`,
        {
          token: user.access_token,
          domain: user.domain,
          refreshToken: user.refresh_token,
        }
      );

      const updatedUser = {
        ...user,
        refresh_token: response.data.refresh_token,
        access_token: response.data.access_token,
      };
      localStorage.setItem("token", JSON.stringify(updatedUser));

      //   const res = response.data.voucher;
      setCreateLoader(false);
      //   ctx.addTourInOngoing(res);
      //   toast.success("Tour created successfully...");
      props.close();
    } catch (err) {
      setCreateLoader(false);
      //   if (err.response && err.response.data) {
      //     toast.error(err.response.data.msg);
      //   } else {
      //     toast.error("Something went wrong");
      //   }
      //   console.log(err);
    }
  };
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
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
              as="div" // Change Fragment to div here
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[100%] md:w-[500px] py-4 bg-white">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Session Expired !!!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your session has been Expired ,Click on Validate Now
                          Button for getting Access in IOS Tour Voucher App
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    // onClick={props.onDeactivate} // Use prop function to handle Deactivate action
                    onClick={siginValidator}
                  >
                    {!createLoader ? (
                      "Validate Sign-In"
                    ) : (
                      <ThreeDots
                        visible={true}
                        height="22"
                        width="80"
                        color="white"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    )}
                  </button>
                  {/* <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={props.close}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TokenValidator;
