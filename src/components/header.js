import { useContext, useState } from "react";
import iosLogo from "../assests/images/ios logo2.png";
import ModeToggler from "./toggleButton";
import { FaPowerOff, FaRegUserCircle, FaUsers } from "react-icons/fa";
import { MdEmail, MdMenu, MdSupervisedUserCircle } from "react-icons/md";
import { IoIosLogOut, IoMdCall } from "react-icons/io";
import AddTourModal from "./user/AddTourModal";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Context from "../store/Context";
import { GrLogout } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { IoBarChart } from "react-icons/io5";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("token"));
  const [openTourModal, setTourModal] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const location = useLocation();
  const path = location.pathname.toUpperCase();

  const [userType, setUserType] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  const [openNavbar, setOpenNavbar] = useState(false);

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
    <>
      {" "}
      <AddTourModal
        open={openTourModal}
        close={() => {
          setTourModal(false);
        }}
      ></AddTourModal>
      <nav
        className={`NAVBARCOLOR pt-2 md:pt-1 pb-1 px-1 mt-0 h-16 fixed w-full z-20 top-0`}
      >
        <div className="flex flex-wrap items-center h-[100%] justify-between">
          <div className="flex flex-shrink h-[100%]  justify-center items-center md:justify-start text-white font-[poppins] md:font-[cursive]">
            <a href="/" aria-label="Home">
              <p className="flex items-center mx-1 min-[426px]:mx-6">
                <img
                  src={iosLogo}
                  className="w-14 h-8 min-[386px]:h-10 min-[386px]:w-16   sm:h-12 sm:w-24 mx-1"
                ></img>
                <span className=" sm:text-3xl min-[386px]:text-2xl text-xl font-bold pl-2 mx-1 min-[426px]:mx-3">
                  VOUCHER TRACKER
                </span>
              </p>
            </a>
          </div>

          {userType&&<div className="flex  pt-2 sm:content-center w-fit mx-auto md:mx-0 justify-end max-md:invisible">
            <ul className="list-reset flex justify-end flex-1 md:flex-none items-center">
              <li className="mr-4 ">
                <button
                  className="shadow-[0_0_0_3px_white_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400  hover:bg-white hover:text-black"
                  onClick={() => {
                    // setOpen(true);
                    setTourModal(true);
                  }}
                >
                  Add Tour
                </button>
              </li>
              <li className="flex-1  md:flex-none md:mr-3">
                <div className="relative inline-block">
                  <button
                    onClick={toggleDropdown}
                    className="drop-button text-black py-2 px-2 flex items-center bg-white rounded-full hover:bg-gray-200 font-semibold"
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
                    <div
                      onClick={() => {
                        localStorage.removeItem("token");
                        ctx.logOutHandler();
                        setOpenNavbar(false);
                        // window.location.href = "/login";
                        navigate("/home");
                      }}
                      className="flex cursor-pointer  p-2 hover:bg-gray-800 text-white text-lg no-underline hover:no-underline items-center font-semibold hover:text-red-400"
                    >
                      <FaPowerOff className="w-6 h-6 mt-2 mx-2" />
                      Log Out
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>}
          {(userType&&!userType?.isAdmin && !userType?.supervisor)  && (
            <div
              className="md:invisible border-2 border-[#d5d235]  cursor-pointer rounded-[25%] absolute right-0 mx-2 min-[330px]:mx-6"
              onClick={() => {
                setOpenNavbar(!openNavbar);
              }}
            >
              <MdSupervisedUserCircle className="h-[30px] w-[30px] text-[#d5d235] "/>
            </div>
          )}

          {(userType?.isAdmin || userType?.supervisor)  && (
            <div
              className="md:invisible border-2 border-[#40a4ce]  cursor-pointer rounded absolute right-0 mx-2 min-[330px]:mx-6"
              onClick={() => {
                setOpenNavbar(!openNavbar);
              }}
            >
              <MdMenu className="h-[25px] w-[25px] text-[#40a4ce] "></MdMenu>
            </div>
          )}
        </div>
      </nav>
      {openNavbar && (
        <div className="min-[924px]:hidden  h-[calc(100vh-64px)] w-[100%] min-[500px]:w-[300px] absolute backdrop-blur-sm bg-[#3B4D5D] right-0  mt-[15px] z-50 ">
          <div className="flex flex-col  ">
            <>
              <div className="bg-[#40a4ce] h-[fit]  w-[100%] text-white">
                <div className="flex ">
                
                  {!userData?.profilePic ? (
                    <FaRegUserCircle className="w-[60px] h-[60px] m-2" />
                  ) : (
                    <img
                      src={userData?.profilePic}
                      alt="profile"
                      className="w-[60px] h-[60px] m-2 border-2"
                    ></img>
                  )}
                  <div className=" flex justify-center flex-col">
                    {" "}
                    <p className=" px-2 font-bold  font-['Poppins']">
                      {userData?.firstName + " " + userData?.lastName}
                    </p>
                    {userData?.designation && (
                      <p className="text-[.75rem]">{`( ${userData?.designation} ) `}</p>
                    )}{" "}
                  </div>
                </div>

                <div className="flex border-b-2">
                  <MdEmail className="w-[25px] h-[25px] mx-2" />
                  <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis text-[.9rem]">
                    {userData?.email}{" "}
                  </p>
                </div>
                <div className="flex">
                  <IoMdCall className="w-[25px] h-[25px] mx-2" />
                  <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {userData?.mobile}
                  </p>
                </div>
              </div>
            </>
            <div>
              <ul className="list-reset flex flex-col md:pt-3 py-3 px-1 md:px-2 text-center md:text-left ">
                {" "}
                {userType?.isAdmin &&<li className="mr-3 flex-1 ">
                  <NavLink
                    to="/adminUserPanel"
                    className=" flex items-center py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white hover:border-b-2  hover:border-white font-semibold"
                  >
                    <FaUsers className="fa fa-envelope pr-0 md:pr-3 h-8 w-10" />
                    {/* <i "></i> */}
                    <span className="pb-1 md:pb-0 text-md  text-whiteflex pt-3 px-3 md:flex items-center pt-1">
                      Users
                    </span>
                  </NavLink>
                </li>}
                {userType?.isAdmin && (
                  <li className="mr-3 flex-1 ">
                    <NavLink
                      to="/adminReport"
                      className="flex  font-semibold items-center py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white hover:border-b-2 hover:border-white"
                    >
                      <IoBarChart className="fa fa-wallet pr-0 md:pr-3  h-8 w-10" />
                      {/* <TbReportSearch />{" "} */}
                      <span className="pb-1 mx-3 md:pb-0 text-md md:text-base text-white md:text-white block md:flex items-center pt-1">
                        Reports
                      </span>
                    </NavLink>
                  </li>
                )}
                {(userType?.isAdmin || userType?.supervisor) && (
                  <li className="mr-3 flex-1 ">
                    <NavLink
                      to="/Accounts"
                      className="flex  font-semibold items-centerpy-1 py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white hover:border-b-2  hover:border-white"
                    >
                      <TbReportSearch className="fa fa-wallet pr-0 md:pr-3  h-8 w-10" />
                      {/* <i ></i> */}
                      <span className="pb-1 md:pb-0 mx-3 text-md md:text-base text-whiteblock md:flex items-center pt-1">
                        Accounts Mode
                      </span>
                    </NavLink>
                  </li>
                )}
              </ul>
              {/* {(userType?.isAdmin || userType?.supervisor) &&
                path != "/USER" &&
                path != "/USERVOUCHERS" && (
                  <>
                    <div>
                      <div
                        onClick={() => {
                          navigate("/home");
                          setOpenNavbar(false);
                        }}
                        className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                      >
                        <span className="text-white">H</span>ome
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => {
                          navigate("/adminUser");
                          setOpenNavbar(false);
                        }}
                        className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                      >
                        <span className="text-white">U</span>sers
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => {
                          navigate("/adminReport");
                          setOpenNavbar(false);
                        }}
                        className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                      >
                        <span className="text-white">R</span>eports
                      </div>
                    </div>
                  </>
                )}
              {(userType?.isAdmin || userType?.supervisor) &&
                path != "/USER" &&
                path != "/USERVOUCHERS" && (
                  <div
                    onClick={() => {
                      navigate("/user");
                      setOpenNavbar(false);
                    }}
                    className="hover:text-yellow-400 font-bold text-lg rounded-md bg-blue-400 hover:bg-blue-600 text-white cursor-pointer m-2 p-2 border-2 w-fit"
                  >
                    <span className="text-white">U</span>ser Panel
                  </div>
                )}
              {!userType?.isAdmin && !userType?.supervisor && (
                <div
                  onClick={() => {
                    // setOpen(true);
                    setTourModal(true);
                    setOpenNavbar(false);
                  }}
                  className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                >
                  <span className="text-white">A</span>dd Tour
                </div>
              )}
              {(userType?.isAdmin || userType?.supervisor) &&
                (path === "/USER" || path === "/USERVOUCHERS") && (
                  <div
                    onClick={() => {
                      // setOpen(true);
                      setTourModal(true);
                      setOpenNavbar(false);
                    }}
                    className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                  >
                    <span className="text-white">A</span>dd Tour
                  </div>
                )} */}
              {/* {(userType?.isAdmin || userType?.supervisor) &&
                (path == "/USER" || path == "/USERVOUCHERS") && (
                  <>
                    <div>
                      <div
                        onClick={() => {
                          navigate("/user");
                          setOpenNavbar(false);
                        }}
                        className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                      >
                        <span className="text-white">D</span>ashboard
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={() => {
                          navigate("/userVouchers");
                          setOpenNavbar(false);
                        }}
                        className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                      >
                        <span className="text-white">V</span>ouchers
                      </div>
                    </div>
                  </>
                )} */}
              {/* {!userType?.isAdmin && !userType?.supervisor && (
                <>
                  <div>
                    <div
                      onClick={() => {
                        navigate("/user");
                        setOpenNavbar(false);
                      }}
                      className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                    >
                      <span className="text-white">D</span>ashboard
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        navigate("/userVouchers");
                        setOpenNavbar(false);
                      }}
                      className="hover:text-yellow-400 font-bold text-lg text-white cursor-pointer px-4 py-1"
                    >
                      <span className="text-white">V</span>ouchers
                    </div>
                  </div>
                </>
              )} */}
              {/* {(userType?.isAdmin || userType?.supervisor) &&
                (path === "/USER" || path === "/USERVOUCHERS") && (
                  <div
                    onClick={() => {
                      navigate("/home");
                      setOpenNavbar(false);
                    }}
                    className="hover:text-yellow-400 font-bold text-lg rounded-md bg-blue-400 hover:bg-blue-600 text-white cursor-pointer m-2 p-2 border-2 w-fit"
                  >
                    <span className="text-white">A</span>dmin Panel
                  </div>
                )} */}
              {/* {userType && !userType?.isAdmin && !userType?.supervisor && (
                <div
                  onClick={() => {
                    // setOpen(true);
                    setTourModal(true);
                    setOpenNavbar(false);
                  }}
                  className="text-lg font-bold text-semibold border-2 w-fit mx-3 my-2 text-white dark:text-white bg-red-400 hover:bg-red-500 px-4 py-1 cursor-pointer rounded-md"
                >
                  <span className="text-white">A</span>dd Tour
                </div>
              )} */}
              {userType && (
                <div
                  // href="/login"
                  className="text-lg font-bold text-semibold border-2 w-fit mx-3 text-white dark:text-white bg-red-400 hover:bg-red-500 px-4 py-1 cursor-pointer rounded-md"
                  onClick={() => {
                    localStorage.removeItem("token");
                    ctx.logOutHandler();
                    setOpenNavbar(false);
                    // window.location.href = "/login";
                    navigate("/home");
                  }}
                >
                  LogOut
                </div>
              )}
            </div>
            {/* <>
              <div className="bg-[#2980b9] h-[150px] rounded-md  w-[100%] text-white">
                <div className="flex ">
                  {console.log(userData?.profilePic)}{" "}
                  {!userData?.profilePic ? (
                    <FaRegUserCircle className="w-[60px] h-[80px] m-2" />
                  ) : (
                    <img
                      src={userData?.profilePic}
                      alt="profile"
                      className="w-[80px] h-[80px] m-2 border-2"
                    ></img>
                  )}
                  <div className=" flex justify-center flex-col">
                    {" "}
                    <p className=" px-2 font-bold  font-['Poppins']">
                      {userData?.firstName + " " + userData?.lastName}
                    </p>
                    {userData?.designation && (
                      <p className="text-[.75rem]">{`( ${userData?.designation} ) `}</p>
                    )}{" "}
                  </div>
                </div>

                <div className="flex border-b-2">
                  <MdEmail className="w-[25px] h-[25px] mx-2" />
                  <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis text-[.9rem]">
                    {userData?.email}{" "}
                  </p>
                </div>
                <div className="flex">
                  <IoMdCall className="w-[25px] h-[25px] mx-2" />
                  <p className="px-2 w-[100%] overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {userData?.mobile}
                  </p>
                </div>
              </div>
            </> */}
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
