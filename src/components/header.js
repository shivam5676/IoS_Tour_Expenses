import { useState } from "react";
import iosLogo from "../assests/images/ios logo2.png";
import ModeToggler from "./toggleButton";
import { FaPowerOff, FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosLogOut, IoMdCall } from "react-icons/io";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("token"));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const filterDropdown = () => {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown");
    const a = div.getElementsByTagName("a");

    for (let i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  };

  return (
    <nav className="bg-[#002147] pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-shrink  justify-center md:justify-start text-white font-[Montserrat]">
          <a href="#" aria-label="Home">
            <p className="flex items-center mx-6">
              <img
                src={iosLogo}
                className="min-[531px]:h-10 h-8 min-[700px]:w-24 w-20 max-[531px]:mx-2"
              ></img>
              <span className="text-4xl font-bold pl-2">Tour Voucher</span>
            </p>
          </a>
        </div>

        {/* <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
          <span className="relative w-full">
            <input
              aria-label="search"
              type="search"
              id="search"
              placeholder="Search"
              className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"
            />
            <div
              className="absolute search-icon"
              style={{ top: "1rem", left: ".8rem" }}
            >
              <svg
                className="fill-current pointer-events-none text-white w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>
          </span>
        </div> */}

<div className="flex w-full pt-2 sm:content-center sm:w-1/2 mx-auto md:mx-0 justify-end ">
  <ul className="list-reset flex justify-end flex-1 md:flex-none items-center">
    <li className="mr-4">
      <button className="shadow-[0_0_0_3px_white_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400  hover:bg-white hover:text-black">
        Add Tour
      </button>
    </li>
    <li className="flex-1 md:flex-none md:mr-3">
      <div className="relative inline-block">
        <button
          onClick={toggleDropdown}
          className="drop-button text-white py-2 px-2 flex items-center"
        >
          <span className="pr-2">
            <i className="em em-robot_face"></i>
          </span>
          Hi, {userData?.firstName}
          <svg
            className="h-3 fill-current inline ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
        <div
          id="myDropdown"
          className={`dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 ${
            dropdownOpen ? "" : "invisible"
          }`}
        >
          <div className="flex flex-col">
            <div className="bg-[#33a9c7] w-full text-white">
              <div className="flex">
                {!userData?.profilePic ? (
                  <FaRegUserCircle className="w-[60px] h-[60px] m-2" />
                ) : (
                  <img
                    src={userData?.profilePic}
                    alt="profile"
                    className="w-[60px] h-[60px] m-2 border-2"
                  />
                )}
                <div className="flex justify-center flex-col">
                  <p className="px-2 font-bold font-['Poppins']">
                    {userData?.firstName + " " + userData?.lastName}
                  </p>
                  {userData?.designation && (
                    <p className="text-[.75rem]">{`( ${userData?.designation} )`}</p>
                  )}
                </div>
              </div>
              <div className="flex border-b-2">
                <MdEmail className="w-[25px] h-[25px] mx-2" />
                <p className="px-2 w-full overflow-hidden whitespace-nowrap overflow-ellipsis text-[.9rem]">
                  {userData?.email}
                </p>
              </div>
              <div className="flex">
                <IoMdCall className="w-[25px] h-[25px] mx-2" />
                <p className="px-2 w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {userData?.mobile}
                </p>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="flex p-2 hover:bg-gray-800 text-white text-lg no-underline hover:no-underline items-center font-semibold hover:text-red-400"
          >
            <FaPowerOff className="w-8 h-8 mt-2 mx-2" />
            Log Out
          </a>
        </div>
      </div>
    </li>
  </ul>
</div>

      </div>
    </nav>
  );
};
export default Header;
