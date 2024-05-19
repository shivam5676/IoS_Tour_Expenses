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
function LineChart(props) {
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
  const expenseData = props.expenseData ? props.expenseData : "";

  const getExpenseValues = (category) => {
    return labels.map((label) => {
      return expenseData[label] && expenseData[label][category] !== undefined
        ? expenseData[label][category]
        : 0;
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Accommodation",
        data: getExpenseValues("acc"),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Food(DA)",
        data: getExpenseValues("food"),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Travel",
        data: getExpenseValues("travel"),
        backgroundColor: "rgba(255, 165, 0,0.7)",
      },
      {
        label: "Misc",
        data: getExpenseValues("misc"),
        backgroundColor: "rgba(93, 192, 149, 0.8)",
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
