import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../store/Context";
import bitrixlogo from "../assests/images/bitrixLogo.png";
import { ColorRing } from "react-loader-spinner";
import loginImage from "../assests/loginImage2.png";


const Login = React.memo(() => {
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const connectionString = process.env.REACT_APP_CONNECTION_STRING;
  const frontendConnectionString=process.env.REACT_APP_FRONTEND_URL
  const backendConnectionString=process.env.REACT_APP_BACKEND_URL


  const getAccessToken = async (code) => {
    setLoginLoader(true);
    try {
      const response = await axios.get(
        `${backendConnectionString}/callback/${code}`
      );
  
      if (response.data.data.access_token) {
        localStorage.setItem("token", JSON.stringify(response.data.data));
        ctx.loginDataHandler(response.data.data);
        navigate("/");
        setLoginLoader(false);
        // window.location.href = "http://localhost:3000/home";
        // window.location.href = `${connectionString}:${process.env.REACT_APP_FRONTEND_PORT}/home`;
      } else {
        setLoginLoader(false);
        navigate("/");

        // window.location.href = "http://localhost:3000";
        // window.location.href = `${connectionString}:${process.env.REACT_APP_FRONTEND_PORT}`;
      }
    } catch (error) {
      console.error("Error fetching the access token", error);
    }
  };

  const bitrixHandler = useCallback(async () => {
    setLoginLoader(true);
    try {
      const response = await axios.get(
        `${backendConnectionString}/queryParams/`
      );
      const queryParams = response.data.data;
    
      const authorizationUrl = `${process.env.REACT_APP_BITRIX_URL}/oauth/authorize?${queryParams}`;
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const authWindow = window.open(
        authorizationUrl,
        "BitrixAuth",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const pollTimer = window.setInterval(() => {
        try {
          if (authWindow.closed) {
            window.clearInterval(pollTimer);
          } else {
            const searchParams = new URL(authWindow.location).searchParams;
            const authCode = searchParams.get("code");
            if (authCode) {
              
              getAccessToken(authCode);
              authWindow.close();
              // Redirect to your main application route and pass the authorization code
              // navigate(`/auth?code=${authCode}`);
            }
          }
        } catch (e) {
          // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        }
      }, 1000);

      setLoginLoader(false);
    } catch (err) {
      console.log(err);
      setLoginLoader(false);
    }
  }, [connectionString, navigate]);

  return (
    <div
      className="w-[100vw] h-[100vh] bg-transparent flex justify-center"
      style={{
        width: "100vw",
        height: "100vh",
        // backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-[1400px] flex-col sm:flex-row">
        <div className="w-[100%] sm:w-[50%] h-[100%] flex flex-col justify-center items-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2980b9] px-2 py-3 w-[100%] text-center">
            IOS <span className="text-[#2980b9]">V</span>oucher{" "}
            <span className="text-[#2980b9]">M</span>anagement{" "}
            <span className="text-[#2980b9]">S</span>ystem
          </p>
          <div className="flex sm:text-[1.2rem] lg:text-xl font-bold text-[#2980b9] text-center px-4 py-3 md:py-3">
            <p>Powerful & LightWeight Tour Voucher Tracker</p>
          </div>
          <div className="flex text-[#2980b9] px-6 md:px-12 py-2 text-center">
            <p>
              Login now to manage your tour vouchers and expenses digitally.
            </p>
          </div>
          <div className="w-[80%] border-gray-300 flex my-2 justify-center">
            <div
              className="bg-blue-500 p-2 rounded-md font-semibold text-[white] hover:bg-blue-700 cursor-pointer flex items-center hover:shadow-md hover:shadow-yellow-600"
              onClick={() => {
                if (!loginLoader) {
                  bitrixHandler();
                }
              }}
            >
              {!loginLoader ? (
                <>
                  Sign in with
                  <img
                    src={bitrixlogo}
                    className="w-[100px] h-[50px]"
                    alt="Bitrix Logo"
                  />
                </>
              ) : (
                <ColorRing
                  visible={true}
                  height="50"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["white", "white", "white", "white", "white"]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%] sm:flex items-center justify-center hidden">
          <img
            src={loginImage}
            className="h-[400px] w-[90%]"
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
});

export default Login;
