import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import iosLogo from "../assests/images/ios logo.png";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../store/Context";
import queryString from "query-string";
import bitrixlogo from "../assests/images/bitrixLogo.png";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import loginImage from "../assests/loginImage2.png";

const Login = React.memo(() => {
  const [loginLoader, setLoginLoader] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const user = JSON.parse(localStorage.getItem("token"));
  const connectionString = process.env.REACT_APP_CONNECTION_STRING;

  useEffect(() => {
    console.log("useEffect called");

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
          console.log(response);
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

      getAccessToken();
    } else {
      console.log("No authorization code found in the URL.");
    }
  }, []);

  const bitrixHandler = useCallback(async () => {
    setLoginLoader(true);
    console.log(
      `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/queryParams/`
    );
    try {
      const response = await axios.get(
        `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/queryParams/`
      );
      console.log(response.data.data);
      const queryParams = response.data.data;
      const authorizationUrl = `${process.env.REACT_APP_BITRIX_URL}/oauth/authorize?${queryParams}`;
      // Redirect the user to the Bitrix24 authorization URL
      window.location.href = authorizationUrl;
      // setLoginLoader(false);
    } catch (err) {
      console.log(err);
      setLoginLoader(false);
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-transparent flex justify-center ">
      <div className="flex w-[1400px]  pt-[90px] flex-col sm:flex-row ">
        <div className="w-[100%] sm:w-[50%] h-[100%] flex flex-col justify-center items-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white px-2 py-2 w-[100%] text-center  md:py-8">
            IOS <span className="text-yellow-500">V</span>oucher{" "}
            <span className="text-yellow-500">M</span>anagement{" "}
            <span className="text-yellow-500">S</span>ystem
          </p>
          <div className="flex sm:text-[1.2rem] lg:text-xl font-bold text-white text-center px-4  md:py-2">
            <p>Powerful & LightWeight Tour Voucher Tracker</p>
          </div>
          <div className="flex  text-white px-6 md:px-12 py-4 text-center">
            <p>
              Login now to manage your tour vouchers and expenses digitally.
            </p>
          </div>{" "}
          <div className="w-[80%]  border-gray-300 flex my-2 justify-center ">
            <div
              className="bg-blue-400 p-2 rounded-md font-semibold text-white hover:bg-blue-500 cursor-pointer flex items-center hover:shadow-md hover:shadow-yellow-600"
              onClick={() => {
                if (!loginLoader) {
                  bitrixHandler();
                }
              }}
            >
              {!loginLoader ? (
                <>
                  Sign in with
                  <img src={bitrixlogo} className="w-[100px] h-[50px] "></img>
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
        <div className="w-[50%] sm:flex items-center justify-center hidden ">
          <img src={loginImage} className="h-[400px] w-[90%]"></img>
        </div>
      </div>
    </div>
  );
});

export default Login;
