import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
// import faker from "faker";
function LineChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "category wise expense",
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dataset1Data = [400, 303, 600, 700, 200, 500, 800, 300, 600, 700, 200];
  const dataset2Data = [600, 500, 300, 200, 800, 400, 100, 300, 600, 700, 200];
  //we will create 4 data sets travel,DA(food),Accomondation,Misc
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataset1Data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: dataset2Data,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="m-2 bg-white shadow-black shadow-lg">
      <Bar options={options} data={data} />
    </div>
  );
}

export default LineChart;
