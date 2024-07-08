import { FaHome, FaUsers } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoBarChart } from "react-icons/io5";
import { BsCash } from "react-icons/bs";
import { FaCarTunnel } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { useContext, useState } from "react";
import AddTourModal from "./user/AddTourModal";
import Context from "../store/Context";
const Sidebar = () => {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const [openTourModal, setTourModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <>
      <AddTourModal
        open={openTourModal}
        close={() => {
          setTourModal(false);
        }}
      ></AddTourModal>
      <nav
        aria-label="alternative nav"
        className={`SIDEBARCOLOR shadow-xl h-20 fixed bottom-0 md:mt-12 md:relative md:h-[calc(100vh-98px)] z-10  w-full md:w-56 content-center font-[Poppins] `}
      >
        <div className="md:mt-16 md:w-56  md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul className="list-reset flex flex-row  md:flex-col md:pt-3 md:py-3 px-1 md:px-2 text-center max-md:items-center md:text-left">
            <li className="mr-3 flex-1 ">
              <NavLink
                to="/"
                className="flex  flex-col md:flex-row py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white   border-b-2 border-transparent hover:border-b-2  hover:border-white"
              >
                <FaHome className="fas fa-tasks pr-0 md:pr-3 h-6 w-8 md:h-8 md:w-10"></FaHome>
                <span className="pb-1 md:pb-0 text-sm md:text-base md:text-white-400 max-md:flex md:text-[1rem] md:text-gray-200 block md:inline-block max-md:p-1 max-md:font-bold">
                  Home
                </span>
              </NavLink>
            </li>{" "}
            <li className="mr-3 flex-1 md:hidden">
              <div
                // to="/adminVouchers"
                onClick={() => {
                  // setOpen(true);
                  setTourModal(true);
                }}
                className="flex flex-col md:flex-row max-w-[425px]:flex-col py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white  border-b-2 border-transparent hover:border-b-2  hover:border-white "
              >
                <MdAddCircle className="fas fa-tasks pr-0 md:pr-3 h-8 w-10" />
                {/* <BsCash /> */}
                {/* <FaHome className="fas fa-tasks pr-0 md:pr-3 h-8 w-10"></FaHome> */}
                <span className="pb-1 md:pb-0 text-sm md:text-base md:text-white-400 max-md:flex md:text-[1rem] md:text-gray-200 block md:inline-block max-md:p-1 max-md:font-bold">
                  Add Tour
                </span>
              </div>
            </li>
            <li className="mr-3 flex-1">
              <NavLink
                to="/YourVoucher"
                className="flex flex-col md:flex-row  py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white  border-b-2 border-transparent hover:border-b-2  hover:border-white"
              >
                <FaCarTunnel className="fas fa-tasks pr-0 md:pr-3 h-8 w-10" />
                {/* <FaHome ></FaHome> */}
                <span className="pb-1 md:pb-0 text-sm md:text-base md:text-white-400 max-md:flex md:text-[1rem] md:text-gray-200 block md:inline-block max-md:p-1 max-md:font-bold">
                  Your Tours
                </span>
              </NavLink>
            </li>
            {(user?.isAdmin || user?.supervisor) && (
              <li className="mr-3 flex-1 max-md:hidden">
                <NavLink
                  to="/adminVouchers"
                  className="flex py-1 md:py-3 pl-1 items-center text-white no-underline hover:text-white  border-b-2 border-transparent hover:border-b-2  hover:border-white"
                >
                  <BsCash className="fas fa-tasks pr-0 md:pr-3 h-8 w-10" />
                  {/* <FaHome className="fas fa-tasks pr-0 md:pr-3 h-8 w-10"></FaHome> */}
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                    Voucher Manager
                  </span>
                </NavLink>
              </li>
            )}
            {user?.isAdmin && (
              <li className="mr-3 flex-1 max-md:hidden">
                <NavLink
                  to="/adminUserPanel"
                  className=" flex items-center py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white  border-b-2 border-transparent hover:border-b-2  hover:border-white"
                >
                  <FaUsers className="fa fa-envelope pr-0 md:pr-3 h-8 w-10" />
                  {/* <i "></i> */}
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                    Users
                  </span>
                </NavLink>
              </li>
            )}
            {user?.isAdmin && (
              <li className="mr-3 flex-1 max-md:hidden">
                <NavLink
                  to="/adminReport"
                  className="flex items-center py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white  border-b-2 border-transparent hover:border-b-2  hover:border-white"
                >
                  <IoBarChart className="fa fa-wallet pr-0 md:pr-3  h-8 w-10" />
                  {/* <TbReportSearch />{" "} */}
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                    Reports
                  </span>
                </NavLink>
              </li>
            )}
            {(user?.isAdmin || user?.supervisor) && (
              <li className="mr-3 flex-1 max-md:hidden">
                <NavLink
                  to="/Accounts"
                  className="flex items-centerpy-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white  border-b-2 border-transparent hover:border-b-2  hover:border-white"
                >
                  <TbReportSearch className="fa fa-wallet pr-0 md:pr-3  h-8 w-10" />
                  {/* <i ></i> */}
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:flex items-center">
                    Accounts Mode
                  </span>
                </NavLink>
              </li>
            )}
            <li className="mr-3 flex-1 max-md:hidden">
              <div
                onClick={() => {
                  localStorage.removeItem("token");
                  ctx.logOutHandler();
                  navigate("/");
                  // setOpenNavbar(false);
                }}
                className="cursor-pointer flex items-center py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-transparent hover:border-b-2  hover:border-white"
              >
                <GrLogout className="fa fa-wallet pr-0 md:pr-3  h-8 w-10" />
                {/* <TbReportSearch />{" "} */}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  LogOut
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Sidebar;
