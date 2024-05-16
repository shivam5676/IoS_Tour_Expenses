import React from "react";
import iosLogo from "../assests/images/ios logo.png";
function NavBar() {
  return (
    <nav className=" border-gray-200  fixed w-[100vw]  border-b-2  ">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={iosLogo} className="h-12" alt="Flowbite Logo" />
          <p className="self-center text-3xl font-semibolds whitespace-nowrap dark:text-white font-bold text-blue-400 ">
            Voucher Tracker
          </p>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a
            href="/createUser"
            className="text-lg font-bold text-semibold border-2 border-yellow-600 text-yellow-500 dark:text-white  px-2 rounded-md"
          >
            create user
          </a>
          <a
            href="/login"
            className="text-lg font-bold text-semibold border-2 border-yellow-600 text-yellow-500 dark:text-white  px-2 rounded-md"          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
