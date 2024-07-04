import React, { useContext } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Context from "../store/Context";
import { useLocation } from "react-router-dom";
function AdminExpenseGraph(props) {
  
  const ctx = useContext(Context);
  const login = true;
  let pending = 0;
  let rejected = 0;
  let accepted = 0;
  let total = 0;
  const location = useLocation();
  if (location.pathname.toUpperCase() == "/ADMINUSER") {
    ctx.adminCurrentUserData.Vouchers?.forEach((current) => {
      if (current.statusType == "Pending") {
        pending++;
      } else if (current.statusType == "Accepted") {
        accepted++;
      } else if (current.statusType == "Rejected") {
        rejected++;
      }
    });
  } else {
    ctx.allVoucherData?.forEach((current) => {
      if (current.status == "Pending") {
        pending++;
      } else if (current.status == "Accepted") {
        accepted++;
      } else if (current.status == "Rejected") {
        rejected++;
      }
    });
  }
  console.log(accepted, rejected, pending);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Rejected", "Pending", "Accepted"],
    datasets: [
      {
        label: "Vouchers",
        data: [rejected, pending, accepted],
        backgroundColor: [
          "rgba(255, 99, 132, 1.8)",

          "rgba(255, 206, 86,1.8)",
          "rgba(75, 192, 192, 1.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",

          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" w-[100%]  min-[689px]:w-[40%] min-h-[250px] h-[40vh] min-[689px]:m-2 my-2 bg-[white] rounded-lg shadow-md shadow-gray-700 text-center ">
      <p className={` border-white  py-2 font-bold text-white  CARDHEADERCOLOR  text-2xl rounded-t-lg font-sans`}>
        Vouchers Graph
      </p>
      <div className="w-[100%]  h-[calc(40vh-110px)] min-h-[calc(250px-90px)] my-2">
        {" "}
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                display: false, // hide legend
              },
              tooltip: {
                enabled: true, // hide tooltip
              },
            },
            cutout: "70%",
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="text-black flex justify-between text-[.8rem] px-2 font-bold">
        <div className="flex justify-center">
          {" "}
          <span className="text-center">
            <VscDebugBreakpointLog className="w-[20px] h-[20px] text-green-500" />
          </span>
          Accepted
        </div>

        <div className="flex justify-center">
          {" "}
          <span className="text-center">
            <VscDebugBreakpointLog className="w-[20px] h-[20px] text-yellow-500" />
          </span>
          Pending
        </div>
        <div className="flex justify-center px-2">
          {" "}
          <span className="text-center">
            <VscDebugBreakpointLog className="w-[20px] h-[20px] text-red-500" />
          </span>
          Rejected
        </div>
      </div>
    </div>
  );
}

export default AdminExpenseGraph;
