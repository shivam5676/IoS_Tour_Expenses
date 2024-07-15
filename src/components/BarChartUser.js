import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data
const data = {
  "lucknow-23/10/2024": {
    food: 0,
    travel: 0,
    accomondation: 0,
    misc: 0,
    cash: 0,
    digitalpayment: 0,
  },
  "Anantapur-17/05/2024": {
    food: 0,
    travel: 2200,
    accomondation: 2200,
    misc: 2200,
    cash: 0,
    digitalpayment: 6600,
  },
  "Anand-18/05/2024": {
    food: 0,
    travel: 13435,
    accomondation: 0,
    misc: 0,
    cash: 13435,
    digitalpayment: 0,
  },
  "Diu-18/05/2024": {
    food: 0,
    travel: 220000,
    accomondation: 0,
    misc: 0,
    cash: 0,
    digitalpayment: 220000,
  },
  "Saharanpur-19/05/2024": {
    food: 2000,
    travel: 2000,
    accomondation: 0,
    misc: 0,
    cash: 4000,
    digitalpayment: 0,
  },
};

// Extract city names and categories
const cities = Object.keys(data);
const categories = ["food", "travel", "accomondation", "misc"];

// Extract data for each category
const categoryData = categories.map((category) =>
  cities.map((city) => data[city][category])
);

// Chart.js data object
const chartData = {
  labels: cities,
  datasets: categories.map((category, index) => ({
    label: category.charAt(0).toUpperCase() + category.slice(1),
    data: categoryData[index],
    backgroundColor: `rgba(${index * 50 + 50}, ${index * 100 + 100}, ${
      index * 150 + 150
    }, 0.6)`,
    borderColor: `rgba(${index * 50 + 50}, ${index * 100 + 100}, ${
      index * 150 + 150
    }, 1)`,
    borderWidth: 1,
  })),
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "City-wise Expenses",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const BarChartUser = (props) => {
  const data = props.reportData || {};

  // Extract city names and categories
  
  const cities = Object.keys(data);
  const categories = ["food", "travel", "accomondation", "misc"];

  // Extract data for each category
  const categoryData = categories.map((category) =>
    cities.map((city) => (data[city] ? data[city][category] : 0))
  );

  // Chart.js data object
  const chartData = {
    labels: cities,
    datasets: categories.map((category, index) => ({
      label: category.charAt(0).toUpperCase() + category.slice(1) ,
      data: categoryData[index],
      backgroundColor: `rgba(${index * 50 + 50}, ${index * 100 + 100}, ${
        index * 150 + 150
      }, 0.6)`,
      borderColor: `rgba(${index * 50 + 50}, ${index * 100 + 100}, ${
        index * 150 + 150
      }, 1)`,
      borderWidth: 1,
    })),
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "City-wise Expenses",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={chartData} options={options} />;
};

export default BarChartUser;
