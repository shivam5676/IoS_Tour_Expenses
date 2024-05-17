import React, { useContext, useState } from "react";
import iosLogo from "../assests/images/ios logo.png";
import Context from "../store/Context";
import SignUpModal from "./SignUpModal";
import { useLocation } from "react-router-dom";
import AddTourModal from "./user/AddTourModal";
function NavBar() {
  const [open, setOpen] = useState(false);
  const [openTourModal, setTourModal] = useState(false);

  const ctx = useContext(Context);
  // console.log(ctx.signUpModalOpen);
  const location = useLocation();
  const path = location.pathname.toUpperCase();
  console.log(path);
  return (
    <>
      <AddTourModal
        open={openTourModal}
        close={() => {
          setTourModal(false);
        }}
      ></AddTourModal>
      <SignUpModal
        open={open}
        close={() => {
          setOpen(false);
        }}
      ></SignUpModal>
      <nav className=" border-gray-200  fixed w-[100vw]  border-b-2  ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-16 py-3">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={iosLogo} className="h-12" alt="Flowbite Logo" />
            <p className="self-center text-3xl font-semibolds whitespace-nowrap text-yellow-500  dark:text-white font-bold ">
              Voucher Tracker
            </p>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {!path == "/USER" ? (
              <a
                onClick={() => {
                  setOpen(true);
                }}
                className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white  px-2 rounded-md"
              >
                create user
              </a>
            ) : (
              <a
                onClick={() => {
                  // setOpen(true);
                  setTourModal(true);
                }}
                className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white  px-2 rounded-md"
              >
                Add Tour
              </a>
            )}
            <a
              href="/login"
              className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white  px-2 rounded-md"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
