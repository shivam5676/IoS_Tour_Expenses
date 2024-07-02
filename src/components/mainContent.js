// import { Chart } from "chart.js";
import { useEffect } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend ,LineController} from 'chart.js';

const MainContent = () => {
    // Initializing Chart.js instance after component mounts
    // useEffect(() => {    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend,LineController,PointerEvent);

    //   const ctx1 = document.getElementById("chartjs-7").getContext("2d");
    //   new Chart(ctx1, {
    //     type: 'bar',
    //     data: {
    //       labels: ["January", "February", "March", "April"],
    //       datasets: [
    //         {
    //           label: "Page Impressions",
    //           data: [10, 20, 30, 40],
    //           borderColor: "rgb(255, 99, 132)",
    //           backgroundColor: "rgba(255, 99, 132, 0.2)"
    //         },
    //         {
    //           label: "Adsense Clicks",
    //           data: [5, 15, 10, 30],
    //           type: 'line',
    //           fill: false,
    //           borderColor: "rgb(54, 162, 235)"
    //         }
    //       ]
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       }
    //     }
    //   });
    // }, []);
  
    return (
      <div id="main" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
        <div className="bg-gray-800 pt-3">
          <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <h1 className="font-bold pl-2">Analytics</h1>
          </div>
        </div>
  
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            <div className="bg-white border-transparent rounded-lg shadow-xl">
              <div className="bg-gradient-to-b from-blue-900 to-blue-500 text-white text-2xl p-2 text-center rounded-t-lg">
                <h2 className="font-bold">Page Impressions</h2>
              </div>
              {/* <div className="p-5">
                <canvas id="chartjs-7" className="chartjs" width="undefined" height="undefined"></canvas>
                <script>
                  // Chart.js initialization code moved to useEffect
                </script>
              </div> */}
            </div>
          </div>
          {/* Add other content components here */}
        </div>
      </div>
    );
  };
  export default MainContent