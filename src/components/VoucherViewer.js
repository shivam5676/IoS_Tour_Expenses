import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../store/Context";

export default function VoucherViewer(props) {
  console.log(props.id);
  const connectionUrl = "http://localhost:2000";
  //   const [open, setOpen] = useState(false);
  const ctx = useContext(Context);
  const cancelButtonRef = useRef(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileRef = useRef();
  //   useEffect(()=>{console.log("object");},[])
  const signUpHandler = async () => {
    try {
      const response = await axios.post(`${connectionUrl}/admin/createUser`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        mobile: mobileRef.current.value,
      });
      console.log(response);
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
              <Dialog.Panel className="relative transform overflow-scroll rounded-lg text-left shadow-xl transition-all sm:my-8 h-[80vh] w-[80%] md:w-[500px] py-4 bg-white text-black">
                <div className="text-2xl font-semibold flex justify-center w-[100%]">
                  <p>Tour Voucher</p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">Name : shivam singh</p>
                  <p className="w-[60%] px-2">
                    designation : Software developr
                  </p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">Location:New delhi (India)</p>
                  <p className="w-[60%] px-2">EmpLoyee Id:Ios/EMP/5678 </p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[100%] px-2">
                    Purpose:for software related work
                  </p>
                </div>
                <p className="text-center font-bold">Tour Duration : 768 hrs</p>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">Date from : 05/12/2024</p>
                  <p className="w-[60%] px-2">Date to : 05/12/2024</p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">Time from : 9:00Am</p>
                  <p className="w-[60%] px-2">Time to : 9:30am</p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">Travel Vehicle : bus</p>
                  <p className="w-[60%] px-2">
                    Travel Vehicle (Return) : train
                  </p>
                </div>
                <p className="text-center font-bold">
                  Tour Daily Allowance (DA)
                </p>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">DA (rs/day) : 2100</p>
                  <p className="w-[60%] px-2">DA (rs/hr) : 2100/24</p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[100%] px-2 font font-semibold">
                    total DA alloted : 768 hrs*DA rs/hr
                  </p>
                </div>
                <p className="text-center font-bold">
                  Tour Expenses (17931.15) rs
                </p>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">food : 0</p>
                  <p className="w-[60%] px-2">travel : 8296.15</p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[40%] px-2">accomondation : 9635</p>
                  <p className="w-[60%] px-2">Misc : 0</p>
                </div>
                <p className="text-center font-bold">Expenses Payment Method</p>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[50%] px-2">Credit Card (office): 6557.15</p>
                  <p className="w-[50%] px-2">Cash : 11374</p>
                </div>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[100%] px-2">
                    online (train/bus/flight tickets by office): 0
                  </p>
                </div>
                <p className="w-[100%] px-2 font font-semibold">
                  total Amount Paid on expense : 17931
                </p>
                <div className="flex w-[100%] min-[700px]:flex-row flex-col">
                  <p className="w-[100%] px-2 font font-semibold bg-blue-500 text-white">
                    Amount for settlement :
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
