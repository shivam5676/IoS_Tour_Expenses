import axios from "axios";
import React, { useEffect } from "react";

function AdminUserList() {
  const connectionUrl = "http://localhost:2000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${connectionUrl}/admin/getAllUser`);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="shadow-md shadow-gray-700 w-[60%]  h-[280px]  bg-white m-2 rounded-lg">
      <p className="bg-purple-500 py-2 font-bold text-2xl text-center text-white rounded-t-lg h-[47px]">
        All users
      </p>
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center">
          <p className="w-[10%] px-1">id</p>
          <p className="w-[35%] px-1">name</p>
          <p className="w-[30%] px-1">mobile</p>

          <p className="w-[25%] px-1 text-center"></p>
        </div>
      </div>
      <div className="w-[100%] h-[calc(280px-90px)] overflow-y-auto">
        <div className="mx-2 bg-white text-black flex py-1 text-[.9rem] font-semibold">
          <p className="w-[10%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            1
          </p>
          <p className="w-[35%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            shivam singh
          </p>
          <p className="w-[30%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            9559923286
          </p>

          <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
            <p className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500">
              {" "}
              Select
            </p>
          </div>
        </div>
        <div className="mx-2 bg-white text-black flex py-1 text-[.9rem] font-semibold">
          <p className="w-[10%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            1
          </p>
          <p className="w-[35%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            shivam singh
          </p>
          <p className="w-[30%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            9559923286
          </p>

          <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
            <p className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500">
              {" "}
              Select
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserList;
