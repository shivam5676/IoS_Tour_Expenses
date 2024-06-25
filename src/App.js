import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/login";
import AdminUserPanel from "./components/AdminUserPanel";
import AdminReportPanel from "./components/AdminReportPanel";
import UserHomePage from "./components/user/userHomePage";
import NavBar from "./components/NavBar";
import bgImage from "../src/assests/images/bg5.jpg";
import { useContext, useEffect, useState } from "react";
import Context from "./store/Context";

import UserVoucherPanel from "./components/user/userVoucherPanel";
import AccountDepartment from "./components/AccountDepartment";
import TokenValidator from "./components/tokenValidator";
import axios from "axios";

function App() {
  const [open, setOpen] = useState(false);

  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;

  const ctx = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  console.log(isLoggedIn);
  useEffect(() => {
    const tokenValidationChecker = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.post(
            `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/sessionVerify`,
            {
              token: isLoggedIn.access_token,
              domain: isLoggedIn.domain,
              refreshToken: isLoggedIn.refresh_token,
            }
          );
          console.log(response);
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
    }, 120000); // 120000 ms = 2 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [isLoggedIn, connectionUrl]);
  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("token")));
  }, [ctx.loginData]);
  const tokenIsValid = true;
  // const isLoggedIn = ctx.loginData
  console.log(ctx.loginData);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <NavBar></NavBar>
      {isLoggedIn && (
        <TokenValidator
          close={() => setOpen(false)}
          open={open}
        ></TokenValidator>
      )}
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login />} />
        ) : isLoggedIn.isAdmin || isLoggedIn.supervisor ? (
          <>
            <Route path="/adminUser" element={<AdminUserPanel />} />
            <Route path="/adminReport" element={<AdminReportPanel />} />
            <Route path="*" element={<AdminPanel />} />
            <Route path="/user" element={<UserHomePage />} />
            <Route
              path="/userVouchers"
              element={<UserVoucherPanel></UserVoucherPanel>}
            ></Route>
            <Route
              path="/Accounts"
              element={<AccountDepartment></AccountDepartment>}
            ></Route>
          </>
        ) : !isLoggedIn.isAdmin ? (
          <>
            {" "}
            <Route path="*" element={<UserHomePage />} />
            <Route
              path="/userVouchers"
              element={<UserVoucherPanel></UserVoucherPanel>}
            ></Route>
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
      <div>
        {/* <BlobProvider document={<MyDocument />}>
          {({ blob, url, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error: {error.message}</div>;
            return (
              <button onClick={() => FileSaver.saveAs(blob, "voucher.pdf")}>
                Download PDF
              </button>
            );
          }}
        </BlobProvider> */}
      </div>
    </div>
    // <AllTimePdf></AllTimePdf>
    // <YearlyPdf></YearlyPdf>
    // <MonthlyPdf></MonthlyPdf>
    // <UserPdf></UserPdf>
  );
}

export default App;
