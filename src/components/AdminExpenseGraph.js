import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
function AdminExpenseGraph() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Rejected", "Pending", "Accepted"],
    datasets: [
      {
        label: "Vouchers",
        data: [12, 19, 3],
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
    <div className=" w-[40%]  h-[40vh] m-2 bg-white rounded-lg shadow-md shadow-gray-700 text-center ">
      <p className=" border-white  py-2 font-bold bg-purple-500 text-[1.2rem] rounded-t-lg">
        Vouchers Graph
      </p>
      <div className="w-[100%] h-[70%] my-2">
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
            cutout: "75%",
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default AdminExpenseGraph;
