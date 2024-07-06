import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../store/Context";
import bitrixlogo from "../assests/images/bitrixLogo.png";
import { ColorRing } from "react-loader-spinner";
import loginImage from "../assests/loginImage2.png";
import bgImage from "../assests/images/bg9.jpg";

const Login = React.memo(() => {
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const connectionString = process.env.REACT_APP_CONNECTION_STRING;

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const code = params.get("code");

    if (code) {
      setLoginLoader(true);
      const getAccessToken = async () => {
        try {
          const response = await axios.get(
            `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/callback/${code}`
          );
          if (response.data.data.access_token) {
            localStorage.setItem("token", JSON.stringify(response.data.data));
            ctx.loginDataHandler(response.data.data);
            navigate("/");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching the access token", error);
        } finally {
          setLoginLoader(false);
        }
      };

      getAccessToken();
    }

    const handleMessage = (event) => {
      if (event.origin === process.env.REACT_APP_BITRIX_URL) {
        console.log("Message received from authorization window:", event.data);
        // Handle the received message (e.g., extract authorization code, handle errors, etc.)
        const { code } = event.data;
        if (code) {
          navigate(`?code=${code}`);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate, ctx, connectionString]);

  const bitrixHandler = useCallback(async () => {
    setLoginLoader(true);
    try {
      const response = await axios.get(
        `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/queryParams/`
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
      console.log("Authorization window opened:", authWindow);

      const authCheckInterval = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(authCheckInterval);
          window.location.reload(); // Reload the parent window to check for the authorization code
        }
      }, 1000);

      setLoginLoader(false);
    } catch (err) {
      console.log(err);
      setLoginLoader(false);
    }
  }, [connectionString]);

  return (
    <div
      className="w-[100vw] h-[100vh] bg-transparent flex justify-center"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-[1400px] pt-[90px] flex-col sm:flex-row">
        <div className="w-[100%] sm:w-[50%] h-[100%] flex flex-col justify-center items-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white px-2 py-2 w-[100%] text-center md:py-8">
            IOS <span className="text-white">V</span>oucher{" "}
            <span className="text-white">M</span>anagement{" "}
            <span className="text-white">S</span>ystem
          </p>
          <div className="flex sm:text-[1.2rem] lg:text-xl font-bold text-white text-center px-4 md:py-2">
            <p>Powerful & LightWeight Tour Voucher Tracker</p>
          </div>
          <div className="flex text-white px-6 md:px-12 py-4 text-center">
            <p>
              Login now to manage your tour vouchers and expenses digitally.
            </p>
          </div>
          <div className="w-[80%] border-gray-300 flex my-2 justify-center">
            <div
              className="bg-blue-500 p-2 rounded-md font-semibold text-white hover:bg-blue-700 cursor-pointer flex items-center hover:shadow-md hover:shadow-yellow-600"
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
