import React, { useContext, useEffect, useState } from "react";
import iosLogo from "../assests/images/ios logo.png";
import Context from "../store/Context";
import SignUpModal from "./SignUpModal";
import { useLocation, useNavigate } from "react-router-dom";
import AddTourModal from "./user/AddTourModal";
function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
      <nav className=" border-gray-200  fixed w-[100vw]  border-b-2  backdrop-blur-sm bg-white/20">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-16 py-3">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={iosLogo} className="h-12" alt="Flowbite Logo" />
            <p className="self-center text-3xl font-semibolds whitespace-nowrap text-yellow-500  dark:text-white font-bold ">
              V<span className="text-white">oucher </span>T
              <span className="text-white">racker</span>
            </p>
          </a>
          {userType?.isAdmin &&
            path !== "/USER" &&
            path !== "/USERVOUCHERS" && (
              <p className="bg-blue-500 p-2 rounded-md text-white font-semibold">
                Admin Mode
              </p>
            )}

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* {userType?.isAdmin &&
              path != "/USER" &&
              path != "/USERVOUCHERS" && (
                <a
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white  px-2 py-1 rounded-md"
                >
                  create user
                </a>
              )}{" "} */}
            {userType?.isAdmin && path != "/USER" && path != "/USERVOUCHERS" ? (
              <a
                onClick={() => {
                  navigate("/user");
                }}
                className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white  px-2 py-1 rounded-md"
              >
                User Panel
              </a>
            ) : (
              <a
                onClick={() => {
                  navigate("/home");
                }}
                className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white  px-2 py-1 rounded-md"
              >
                Admin Panel
              </a>
            )}
            {userType?.isAdmin
              ? (path == "/USER" || path == "/USERVOUCHERS") && (
                  <a
                    onClick={() => {
                      // setOpen(true);
                      setTourModal(true);
                    }}
                    className="text-lg font-bold text-semibold border-2 border-yellow-500 text-yellow-500 dark:text-white  px-2 rounded-md"
                  >
                    Add Tour
                  </a>
                )
              : userType && (
                  <a
                    onClick={() => {
                      // setOpen(true);
                      setTourModal(true);
                    }}
                    className="text-lg font-bold text-semibold border-2 border-yellow-400  text-yellow-500  hover:bg-yellow-500 hover:text-white  px-2 py-1 rounded-md"
                  >
                    Add Tour
                  </a>
                )}
            {!userType ? (
              <a
                href="/login"
                className="text-lg font-bold text-semibold border-2 border-yellow-500  text-yellow-500 dark:text-white hover:bg-yellow-500 hover:text-white  px-2 py-1   rounded-md"
              >
                Login
              </a>
            ) : (
              <a
                // href="/login"
                className="text-lg font-bold text-semibold border-2  text-white dark:text-white  px-2 py-1 cursor-pointer rounded-md"
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
        </div>
      </nav>
    </>
  );
}

export default NavBar;
