import React, { useCallback, useContext, useEffect, useRef } from "react";
import iosLogo from "../assests/images/ios logo.png";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../store/Context";
import queryString from "query-string";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    console.log("useEffect called");

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const code = params.get("code");

    if (code) {
      const getAccessToken = async () => {
        try {
          const response = await axios.get(
            `http://localhost:2000/callback/${code}`,
          );
          console.log(response)
          if (response.data.data.access_token) {
            localStorage.setItem("token", JSON.stringify(response.data.data));
            ctx.loginDataHandler(response.data.data);
            window.location.href = "http://localhost:3000/home";
          } else {
            window.location.href = "http://localhost:3000";
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
      const response = await axios.post("http://localhost:2000/login", {
        email: emailRef.current.value,
      });
      // console.log(response.data);
      localStorage.setItem("data", JSON.stringify(response.data.data));
      ctx.loginDataHandler(response.data.data);
      // navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const bitrixHandler = useCallback(async () => {
    const response = await axios.get(`http://localhost:2000/queryParams/`);
    console.log(response.data.data);
    const queryParams = response.data.data;
    const authorizationUrl = `https://b24-ohsmbq.bitrix24.in/oauth/authorize?${queryParams}`;
    // Redirect the user to the Bitrix24 authorization URL
    window.location.href = authorizationUrl;
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-transparent flex items-center justify-center">
      <div className="w-[400px] bg-white pb-8 shadow-emerald-900 shadow-lg rounded-md">
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
      </div>
    </div>
  );
}

export default Login;
