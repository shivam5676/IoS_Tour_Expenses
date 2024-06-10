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
        // console.log(response.data.users);
        // response.data.users.map((current) => {
        //   ctx.addUserData(current);
        // });
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
      console.log(response.data.user);
      ctx.AdminCurrentUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="shadow-md shadow-gray-700 w-[100%]  min-[689px]:w-[60%]  min-h-[250px] h-[40vh]  bg-white m-2 rounded-lg">
      <p className=" bg-gradient-to-r bg-[#2fc7f8]  py-2 font-bold text-2xl text-center text-white rounded-t-lg h-[47px]">
        All users
      </p>
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center border-b-2">
          <p className="w-[10%] px-1">User Id</p>
          <p className="w-[35%] px-1">Name</p>
          <p className="w-[30%] px-1">Mobile</p>

          <p className="w-[25%] px-1 text-center"></p>
        </div>
      </div>
      <div className="w-[100%]  h-[calc(40vh-90px)] min-h-[calc(250px-90px)] overflow-y-auto">
        {/* {console.log(ctx.allUser)} */}
        {ctx.allUser?.map((current) => {
          return (
            <div className="mx-2 bg-white text-black flex py-1 text-[.9rem] font-semibold">
              <p className="w-[10%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.id}
              </p>
              <p className="w-[35%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.firstName + " " + current.lastName}
              </p>
              <p className="w-[30%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.mobile}
              </p>

              <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                <p
                  className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500"
                  onClick={() => {
                    fetchUserDetails(current.id);
                    props.showData()
                  }}
                >
                  {" "}
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
