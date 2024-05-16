import React from "react";

function UsersTour() {
  const ctx = {
    allUser: [
      {
        id: 23,
        firstName: "mumbai",
        lastName: "",
        date: "23/12/2024",
      },
    ],
  };
  return (
    <div className="shadow-md shadow-gray-700 w-[60%]  h-[280px]  bg-white m-2 rounded-lg">
      <p className="bg-purple-500 py-2 font-bold text-2xl text-center text-white rounded-t-lg h-[47px]">
        OnGoing Tour
      </p>
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[40px] font-bold items-center">
          <p className="w-[10%] px-1">id</p>
          <p className="w-[35%] px-1">TourName</p>
          <p className="w-[30%] px-1">Date</p>

          <p className="w-[25%] px-1 text-center"></p>
        </div>
      </div>
      <div className="w-[100%] h-[calc(280px-90px)] overflow-y-auto">
        {/* {console.log(ctx.allUser)} */}
        {ctx.allUser?.map((current) => {
          console.log(current);
          return (
            <div className="mx-2 bg-white text-black flex py-1 text-[.9rem] font-semibold">
              <p className="w-[10%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.id}
              </p>
              <p className="w-[35%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.firstName + " " + current.lastName}
              </p>
              <p className="w-[30%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.date}
              </p>

              <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                <p
                  className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500"
                  onClick={() => {
                    // fetchUserDetails(current.id);
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

export default UsersTour;
