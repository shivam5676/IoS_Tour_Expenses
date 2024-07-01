import axios from "axios";
import React, { useContext, useEffect } from "react";
import Context from "../store/Context";

function AdminUserList(props) {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const user = JSON.parse(localStorage.getItem("token"));

  const ctx = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/getAllUser`, {
          token: user.access_token,
          domain: user.domain,
        });
     
        ctx.addUserData(response.data.users);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.post(
        `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/admin/getUser?id=${id}`,{
          token: user.access_token,
          domain: user.domain,
        }
      );
      ctx.AdminCurrentUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="shadow-md shadow-gray-700 w-[100%]  min-[689px]:w-[60%]  min-h-[250px] h-[40vh]  bg-white md:m-2 rounded-lg">
      <p className=" bg-[#2980b9]  py-2 font-bold text-2xl text-center text-white rounded-t-lg h-[47px]">
        All users
      </p>
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center border-b-2">
          <p className="md:w-[15%] w-[25%] px-1">User Id</p>
          <p className="md:w-[35%] w-[25%] px-1">Name</p>
          <p className="md:w-[30%] w-[25%] px-1">Mobile</p>

          <p className="w-[25%] md:w-[20%] px-1 text-center"></p>
        </div>
      </div>
      <div className="w-[100%]  h-[calc(40vh-90px)] min-h-[calc(250px-90px)] overflow-y-auto">
        {/* {console.log(ctx.allUser)} */}
        {ctx.allUser?.map((current) => {
          return (
            <div className="mx-2 bg-white text-black flex py-1 text-[.9rem] font-semibold">
              <p className="md:w-[15%] w-[25%]  px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.id}
              </p>
              <p className="md:w-[35%] w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.firstName + " " + current.lastName}
              </p>
              <p className="md:w-[30%] w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.mobile}
              </p>

              <div className="w-[20%] md:w-[20%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                <p
                  className="bg-blue-500 text-white font-bold text-center rounded hover:bg-blue-700 cursor-pointer"
                  onClick={() => {
                    fetchUserDetails(current.id);
                    props.showData()
                  }}
                >
                  
                  Select
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminUserList;
