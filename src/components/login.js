import React, { useCallback, useContext, useEffect, useRef } from "react";
import iosLogo from "../assests/images/ios logo.png";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../store/Context";
import queryString from "query-string";
import bitrixlogo from "../assests/images/bitrixLogo.png";

function Login() {
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
      const getAccessToken = async () => {
        try {
          const response = await axios.get(
            `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/callback/${code}`
          );
          console.log(response);
          if (response.data.data.access_token) {
            localStorage.setItem("token", JSON.stringify(response.data.data));
            ctx.loginDataHandler(response.data.data);
            // window.location.href = "http://localhost:3000/home";
            window.location.href = `${connectionString}:${process.env.REACT_APP_FRONTEND_PORT}/home`;
          } else {
            // window.location.href = "http://localhost:3000";
            window.location.href = `${connectionString}:${process.env.REACT_APP_FRONTEND_PORT}`;
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

  const verifyLoginHandler = async () => {
    console.log(
      emailRef.current.value,
      roleRef.current.value,
      passwordRef.current.value
    );
    try {
      const response = await axios.post(
        `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/login`,
        {
          email: emailRef.current.value,
        }
      );
      console.log(response.data);
      localStorage.setItem("data", JSON.stringify(response.data.data));
      ctx.loginDataHandler(response.data.data);
      // navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const bitrixHandler = useCallback(async () => {
    console.log(
      `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/queryParams/`
    );
    try{
    const response = await axios.get(
      `${connectionString}:${process.env.REACT_APP_BACKEND_PORT}/queryParams/`
    );
    console.log(response.data.data);
    const queryParams = response.data.data;
    const authorizationUrl = `${process.env.REACT_APP_BITRIX_URL}/oauth/authorize?${queryParams}`;
    // Redirect the user to the Bitrix24 authorization URL
    window.location.href = authorizationUrl;
    }catch(err){
      console.log(err);
    }

  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-transparent flex items-center justify-center">
      {/* <div className="w-[400px] bg-white pb-8 shadow-emerald-900 shadow-lg rounded-md">
        <div className="flex justify-center pt-10 flex-col items-center">
          <img src={iosLogo} className="w-[80px] "></img>
          <div className="w-[70%] min-[500px]:w-[60%] text-center font-bold text-[1.2rem] p-4">
            Tour & Travel Expense Tracker System
          </div>

          <div className="w-[80%] border-2 border-gray-300 flex my-2">
            <div className="w-[30px] h-[30px] ">
              <AiTwotoneMail className="w-[100%] h-[100%]"></AiTwotoneMail>
            </div>
            <input
              placeholder="email id or username"
              className="w-full  px-2 "
              ref={emailRef}
            ></input>
          </div>
          <div className="w-[80%] border-2 border-gray-300 flex my-2">
            <div className="w-[30px] h-[30px] ">
              <RiLockPasswordLine className="w-[100%] h-[100%]"></RiLockPasswordLine>
            </div>
            <input
              placeholder="enter password"
              className="w-full  px-2 "
              ref={passwordRef}
            ></input>
          </div>
          <div className="w-[80%]  border-gray-300 flex my-2">
            <p className="font-bold">User Type :</p>
            <select className="border-2 px-2 mx-2" ref={roleRef}>
              <option>Admin</option>
              <option>Employee</option>
            </select>
          </div>
          <div className="w-[80%]  border-gray-300 flex my-2 justify-between">
            <div
              className="bg-blue-400 p-2 rounded-md font-semibold text-white hover:bg-blue-500 cursor-pointer"
              onClick={bitrixHandler}
            >
              Sign in with bitrix
            </div>
            <div
              className="bg-blue-400 p-2 rounded-md font-semibold text-white hover:bg-blue-500 cursor-pointer"
              onClick={() => {
                verifyLoginHandler();
              }}
            >
              Sign in
            </div>
          </div>
        </div>
      </div> */}

      <div className=" flex flex-col w-[70%] backdrop-blur-sm bg-black/30 items-center pb-3">
        <div className="w-[100%] text-center">
          {" "}
          <p className="text-3xl text-white font-bold w-[100%] p-4 border-b-2">
            IOS Voucher Management System (VMS)
          </p>
        </div>
        <div className="w-[80%] text-yellow-500 font-semibold p-4">
          <p>
            Introducing a powerful and efficient tour voucher management system.your ultimate solution for
            seamless tour expense management! Easily add your tour expenses,
            submit your completed tour for admin review, and let our system
            handle the rest. Admins can conveniently review, accept, or reject
            vouchers, with all updates integrated directly into Bitrix task
            projects. Experience hassle-free tour management like never before!
          </p>{" "}
          <p>
            {" "}
            Log in now to enjoy all the features and streamline your voucher
            management process.
          </p>
        </div>
        <div className="w-[80%]  border-gray-300 flex my-2 justify-center ">
          <div
            className="bg-blue-400 p-2 rounded-md font-semibold text-white hover:bg-blue-500 cursor-pointer flex items-center hover:shadow-md hover:shadow-yellow-600"
            onClick={bitrixHandler}
          >
            Sign in with
            <img src={bitrixlogo} className="w-[100px] h-[50px] "></img>
          </div>
          {/* <div
            className="bg-blue-400 p-2 rounded-md font-semibold text-white hover:bg-blue-500 cursor-pointer"
            onClick={() => {
              verifyLoginHandler();
            }}
          >
            Sign in
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
