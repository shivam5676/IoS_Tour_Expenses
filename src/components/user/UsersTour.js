import React, { useContext, useState } from "react";
import Context from "../../store/Context";
import axios from "axios";

function UsersTour(props) {
  const connectionUrl = "http://localhost:2000";
  const [selected, setSelected] = useState(null);

  const ctx = useContext(Context);
  const fetchTourDetails = async (id) => {
    try {
      const response = await axios.post(
        `${connectionUrl}/user/getTourExpenses?id=${id}`,
        { userId: 1, voucherId: id }
      );
      // console.log(response)
      console.log(response.data.expenses);
      response.data.expenses.forEach((current) => {
        ctx.userCurrentTourExpenses(current);
      });
      //  ctx.AdminCurrentUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="shadow-md shadow-gray-700 w-[60%]  min-h-[250px] h-[40vh]   bg-white m-2 rounded-lg">
      <p className="bg-gradient-to-r from-[#dd2476] to-[#ff7e5f] py-2 font-bold text-2xl text-center text-white rounded-t-lg h-[47px]">
        OnGoing Tour
      </p>
      <div className="w-[100%]">
        <div className="mx-2 bg-white text-black flex h-[35px] font-bold items-center border-b-2">
          <p className="w-[10%] px-1">id</p>
          <p className="w-[35%] px-1">TourName</p>
          <p className="w-[30%] px-1">Date</p>

          <p className="w-[25%] px-1 text-center"></p>
        </div>
      </div>
      <div className="w-[100%] h-[calc(40vh-110px)] min-h-[calc(250px-90px)] overflow-y-auto">
        {/* {console.log(ctx.allUser)} */}
        {ctx.onGoingData?.map((current) => {
          console.log(current);
          return (
            <div
              className={`mx-2 ${
                selected != current.id ? "bg-white" : "bg-yellow-500"
              } text-black flex py-1 text-[.9rem] font-semibold`}
            >
              <p className="w-[10%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.id}
              </p>
              <p className="w-[35%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.tourLocation}
              </p>
              <p className="w-[30%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {current.tourDate}
              </p>

              <div className="w-[25%] px-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                <p
                  className="bg-blue-300 text-white font-bold text-center rounded hover:bg-blue-500"
                  onClick={() => {
                    selected != current.id && fetchTourDetails(current.id);
                    selected != current.id && ctx.currentTourId(current.id);
                    selected != current.id && setSelected(current.id);
                    props.selected();
                  }}
                >
                  {" "}
                  {selected == current.id ? "Selected" : "Select"}
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
