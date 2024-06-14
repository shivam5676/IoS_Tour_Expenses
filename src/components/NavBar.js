import React, { useContext, useEffect, useState } from "react";
import iosLogo from "../assests/images/ios logo2.png";
import Context from "../store/Context";
import SignUpModal from "./SignUpModal";
import { useLocation, useNavigate } from "react-router-dom";
import AddTourModal from "./user/AddTourModal";
import { MdMenu } from "react-icons/md";
function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(false);
  const [openTourModal, setTourModal] = useState(false);
  const [userType, setUserType] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  const ctx = useContext(Context);

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem("token")));
  }, [ctx.loginData]);
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
      <nav className=" border-gray-200 z-50  fixed w-[100vw]  border-b-2  backdrop-blur-sm bg-white/20">
        <div className="flex flex-wrap justify-between items-center w-[100vw] min-[531px]:px-16 px-4 py-3">
          <a
            href=""
            className="flex max-[531px]:flex-col min:[531px]:items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={iosLogo}
              className="min-[531px]:h-12 h-8 min-[700px]:w-24 w-20 max-[531px]:mx-2"
              alt="Flowbite Logo"
            />
            <p className="self-center text-2xl min-[700px]:text-3xl font-semibolds whitespace-nowrap text-yellow-500  dark:text-white font-bold ">
              V<span className="text-white">oucher </span>T
              <span className="text-white">racker</span>
            </p>
          </a>
          {(userType?.isAdmin || userType?.supervisor) &&
            path !== "/USER" &&
            path !== "/USERVOUCHERS" && (
              <p className="bg-blue-500 p-2 rounded-md text-white font-semibold max-[923px]:hidden">
                Admin Mode
              </p>
            )}

          <div className="flex items-center space-x-6 rtl:space-x-reverse max-[923px]:hidden">
            {(userType?.isAdmin || userType?.supervisor) &&
              path != "/USER" &&
              path != "/USERVOUCHERS" && (
                <a
                  onClick={() => {
                    navigate("/user");
                  }}
                  className="text-lg  cursor-pointer font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white  px-2 py-1 rounded-md"
                >
                  User Panel
                </a>
              )}
            {(userType?.isAdmin || userType?.supervisor) &&
              (path === "/USER" || path === "/USERVOUCHERS") && (
                <a
                  onClick={() => {
                    navigate("/home");
                  }}
                  className="text-lg  cursor-pointer font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-md"
                >
                  Admin Panel
                </a>
              )}

            {(userType?.isAdmin || userType?.supervisor) &&
              (path === "/USER" || path === "/USERVOUCHERS") && (
                <a
                  onClick={() => {
                    // setOpen(true);
                    setTourModal(true);
                  }}
                  className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white  cursor-pointer  px-2 py-1 rounded-md"
                >
                  Add Tour
                </a>
              )}
            {userType && !userType?.isAdmin && !userType?.supervisor && (
              <a
                onClick={() => {
                  // setOpen(true);
                  setTourModal(true);
                }}
                className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white  cursor-pointer px-2  py-1 rounded-md"
              >
                Add Tour
              </a>
            )}
            {userType && (
              <a
                // href="/login"
                className="text-lg font-bold text-semibold border-2  text-white dark:text-white hover:bg-white hover:text-black  px-2 py-1 cursor-pointer rounded-md"
                onClick={() => {
                  localStorage.removeItem("token");
                  ctx.logOutHandler();
                  window.location.href = "/login";
                  // navigate("/home");
                }}
              >
                LogOut
              </a>
            )}
          </div>
          {userType && (
            <div
              className="min-[924px]:hidden border-2  cursor-pointer rounded"
              onClick={() => {
                setOpenNavbar(!openNavbar);
              }}
            >
              <MdMenu className="h-[25px] w-[25px] text-white "></MdMenu>
            </div>
          )}
        </div>
      </nav>
      {openNavbar && (
        <div className="min-[924px]:hidden min-[531px]:h-[calc(100vh-74px)] h-[calc(100vh-90px)] w-[100%] min-[500px]:w-[300px] absolute backdrop-blur-sm bg-[#3B4D5D] right-0 min-[531px]:top-[74px] top-[90px] z-50">
          {(userType?.isAdmin || userType?.supervisor) &&
            path != "/USER" &&
            path != "/USERVOUCHERS" && (
              <>
                <div>
                  <div
                    onClick={() => {
                      navigate("/home");
                      setOpenNavbar(false);
                    }}
                    className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
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
                    className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
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
                    className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
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
                className="hover:text-yellow-400 font-bold text-xl rounded-md bg-blue-400 hover:bg-blue-600 text-white cursor-pointer m-2 p-2 border-2 w-fit"
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
              className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
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
                className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
              >
                <span className="text-white">A</span>dd Tour
              </div>
            )}
          {(userType?.isAdmin || userType?.supervisor) &&
            (path == "/USER" || path == "/USERVOUCHERS") && (
              <>
                <div>
                  <div
                    onClick={() => {
                      navigate("/user");
                      setOpenNavbar(false);
                    }}
                    className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
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
                    className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
                  >
                    <span className="text-white">V</span>ouchers
                  </div>
                </div>
              </>
            )}
          {!userType?.isAdmin && !userType?.supervisor && (
            <>
              <div>
                <div
                  onClick={() => {
                    navigate("/user");
                    setOpenNavbar(false);
                  }}
                  className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
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
                  className="hover:text-yellow-400 font-bold text-xl text-white cursor-pointer px-4 py-2"
                >
                  <span className="text-white">V</span>ouchers
                </div>
              </div>
            </>
          )}
          {(userType?.isAdmin || userType?.supervisor) &&
            (path === "/USER" || path === "/USERVOUCHERS") && (
              <div
                onClick={() => {
                  navigate("/home");
                  setOpenNavbar(false);
                }}
                className="hover:text-yellow-400 font-bold text-xl rounded-md bg-blue-400 hover:bg-blue-600 text-white cursor-pointer m-2 p-2 border-2 w-fit"
              >
                <span className="text-white">A</span>dmin Panel
              </div>
            )}
          {userType && !userType?.isAdmin && !userType?.supervisor && (
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
          )}
          {userType && (
            <div
              // href="/login"
              className="text-lg font-bold text-semibold border-2 w-fit mx-3 text-white dark:text-white bg-red-400 hover:bg-red-500 px-4 py-1 cursor-pointer rounded-md"
              onClick={() => {
                localStorage.removeItem("token");
                ctx.logOutHandler();
                setOpenNavbar(false);
                window.location.href = "/login";
                // navigate("/home");
              }}
            >
              LogOut
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default NavBar;
