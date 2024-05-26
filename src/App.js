import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/login";
import AdminUserPanel from "./components/AdminUserPanel";
import AdminReportPanel from "./components/AdminReportPanel";
import UserHomePage from "./components/user/userHomePage";
import NavBar from "./components/NavBar";
import bgImage from "../src/assests/images/bg1.jpg";
import { useContext, useEffect, useState } from "react";
import Context from "./store/Context";
import AllTimePdf from "./components/AllTimePdf";
import YearlyPdf from "./components/YearlyPdf";
import MonthlyPdf from "./components/MonthlyPdf";
import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./components/MyDocument";
import FileSaver from "file-saver";
import UserPdf from "./components/UserPdf";

function App() {
  const ctx = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  console.log(isLoggedIn);
  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("token")));
  }, [ctx.loginData]);
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
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login />} />
        ) : isLoggedIn.isAdmin ? (
          <>
            <Route path="/adminUser" element={<AdminUserPanel />} />
            <Route path="/adminReport" element={<AdminReportPanel />} />
            <Route path="*" element={<AdminPanel />} />
          </>
        ) : !isLoggedIn.isAdmin ? (
          <Route path="*" element={<UserHomePage />} />
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
