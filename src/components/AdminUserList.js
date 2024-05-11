import React from "react";

function AdminUserList() {
  return (
    <div className="shadow-md shadow-gray-700 w-[60%] border-2 h-[50vh]  bg-green-300 m-2 rounded-lg">
      <p className=" border-black border-b-2 py-2 font-bold text-[1.2rem] text-center text-black  h-[50px]">
        All users
      </p>
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center">
          <p className="w-[25%] px-1">id</p>
          <p className="w-[25%] px-1">name</p>
          <p className="w-[25%] px-1">mobile</p>
         
          <p className="w-[25%] px-1 text-center"></p>
        </div>
      </div>
      <div className="w-[100%] h-[calc(40vh-120px)] overflow-y-auto">
      <div className="m-2 bg-white text-black flex py-2">
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            1
          </p>
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            shivam singh
          </p>
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            9559923286
          </p>
         
          <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
            <p className="bg-blue-300 text-white text-center rounded hover:bg-blue-500">
              {" "}
              Select
            </p>
          </div>
        </div>
        <div className="m-2 bg-white text-black flex py-2">
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            1
          </p>
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            shivam singh
          </p>
          <p className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            9559923286
          </p>
         
          <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
            <p className="bg-blue-300 text-white text-center rounded hover:bg-blue-500">
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
