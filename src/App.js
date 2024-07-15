import Header from "./components/header";
import MainContent from "./components/mainContent";
import Sidebar from "./components/sideBar";
// import "./index.css"
// import { Route, Routes } from "react-router-dom";
// import AdminPanel from "./components/AdminPanel";
// import Login from "./components/login";
// import AdminUserPanel from "./components/AdminUserPanel";
// import AdminReportPanel from "./components/AdminReportPanel";
// import UserHomePage from "./components/user/userHomePage";
// import NavBar from "./components/NavBar";
// import bgImage from "../src/assests/images/bg7.jpg";
import { useContext, useEffect, useState } from "react";
import Context from "./store/Context";

// import UserVoucherPanel from "./components/user/userVoucherPanel";
// import AccountDepartment from "./components/AccountDepartment";
import axios from "axios";
import TokenValidator from "./components/TokenValidator";
import Main from "./components/mainCard";
import { Route, Routes } from "react-router-dom";

import AdminHome from "./pages/adminHome";
import AdminUserPanel from "./pages/adminUser";
import UserHome from "./pages/userHome";
import AdminReportPanel from "./pages/adminReports";
import YourVoucher from "./pages/userVoucher";
import AccountsDepartment from "./pages/accountsDepartment";
import Login from "./components/login";
import AuthHandler from "./components/AuthHandler";

function App() {
  const [open, setOpen] = useState(false);

  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;

  const ctx = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("token"))
  );


  useEffect(() => {
    const tokenValidationChecker = async () => {
      if (isLoggedIn) {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
          const response = await axios.post(
            `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/sessionVerify`,
            {
              token: token.access_token,
              domain: token.domain,
              refreshToken: token.refresh_token,
            }
          );
         
        } catch (err) {
          setOpen(true);
          console.log(err);
        }
      }
    };

    // Run the checker immediately upon component mount
    tokenValidationChecker();

    const intervalId = setInterval(() => {
      tokenValidationChecker();
    }, 300000); // 120000 ms = 2 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [isLoggedIn, connectionUrl]);
  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("token")));
  }, [ctx.loginData]);
  const tokenIsValid = true;
  // const isLoggedIn = ctx.loginData
 

  return (
    <div className="BGCOLOR">
      {isLoggedIn && (
        <TokenValidator
          close={() => setOpen(false)}
          open={open}
        ></TokenValidator>
      )}
      {!isLoggedIn && (
        <div className="BGCOLOR font-sans leading-normal tracking-normal ">
          <Header />

          <Routes>
            <Route path="*" element={<Login />}></Route>{" "}
            <Route path="/auth.html" element={<AuthHandler />} />
          </Routes>
        </div>
      )}
      {isLoggedIn && (
        <div className={`BGCOLOR font-sans leading-normal tracking-normal`}>
          <Header />
          <div className="flex flex-col md:flex-row mt-12">
            <Sidebar></Sidebar>
            
            <Routes>
              <Route path="*" element={<UserHome></UserHome>}></Route>

              {(isLoggedIn?.isAdmin || isLoggedIn?.supervisor) && (
                <Route
                  path="/adminVouchers"
                  element={<AdminHome></AdminHome>}
                ></Route>
              )}
              {isLoggedIn?.isAdmin && (
                <Route
                  path="/adminUserPanel"
                  element={<AdminUserPanel></AdminUserPanel>}
                ></Route>
              )}
              {isLoggedIn?.isAdmin && (
                <Route
                  path="/adminReport"
                  element={<AdminReportPanel></AdminReportPanel>}
                ></Route>
              )}
              <Route
                path="/YourVoucher"
                element={<YourVoucher></YourVoucher>}
              ></Route>
              {(isLoggedIn?.isAdmin || isLoggedIn?.supervisor) && (
                <Route
                  path="/Accounts"
                  element={<AccountsDepartment></AccountsDepartment>}
                ></Route>
              )}
            </Routes>
            {/* <Main></Main> */}
          </div>
        </div>
      )}
      {/* <Header></Header> */}
    </div>
  );
}

export default App;
