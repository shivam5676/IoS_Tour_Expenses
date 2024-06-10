import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Context from "../store/Context";
import { toast } from "react-toastify";

export default function SignUpModal(props) {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const [open, setOpen] = useState(false);
  const ctx = useContext(Context);
  const cancelButtonRef = useRef(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileRef = useRef();  const user = JSON.parse(localStorage.getItem("token"));

  const signUpHandler = async () => {
    try {
      const response = await axios.post(`${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/createUser`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        mobile: mobileRef.current.value,
        token: user.access_token,
        domain: user.domain,
      });
      toast.success("user created successsfully");
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-[80%] md:w-[500px] py-4 bg-gradient-to-r from-[#3199ad] to-[#144786] text-white">
                <div className="text-center pb-8">
                  <div className="text-2xl font-semibold flex items-center">
                    {" "}
                    <div className="bg-gradient-to-r from-[#F33A6A] to-white flex-1 h-[2px]"></div>
                    <div className="md:font-bold text-2xl m-3  text-white font-medium">
                      Register Now
                    </div>
                    <div className="bg-gradient-to-r from-white to-[#F33A6A] flex-1 h-[2px]"></div>
                  </div>
                  <p className="pb-2 text-[.9rem]">
                    Enjoy all Features of VTS{" "}
                  </p>
                </div>{" "}
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>First Name</label>
                    <input
                      className="outline-none border-b border-white  bg-transparent h-[20px]"
                      ref={firstNameRef}
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Last Name</label>
                    <input
                      className="outline-none border-b border-white  bg-transparent h-[20px]"
                      ref={lastNameRef}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  {" "}
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Email</label>
                    <input
                      className="outline-none border-b border-white  bg-transparent h-[20px]"
                      ref={emailRef}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row px-12">
                  <div className="flex flex-col px-2 w-[100%] py-2">
                    <label>Password</label>
                    <input
                      className="outline-none border-b border-white bg-transparent"
                      ref={passwordRef}
                    ></input>
                  </div>
                  <div className="flex flex-col px-2 w-[100%] py-3">
                    <label>Mobile</label>
                    <input
                      className="outline-none border-b border-white  bg-transparent h-[20px]"
                      ref={mobileRef}
                    ></input>
                  </div>
                </div>
                <div className="w-[100%] flex  justify-center mb-4 mt-6">
                  <p
                    className="w-[80%] bg-white text-black text-center font-semibold py-3 rounded-md cursor-pointer"
                    onClick={signUpHandler}
                  >
                    Sign Up
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
