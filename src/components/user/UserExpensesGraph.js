import React, { useContext } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import expenseGif from "../../assests/budgeting.gif";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Context from "../../store/Context";
function UserExpensesGraph(props) {
  console.log(props.tourSelected);
  const ctx = useContext(Context);
  ChartJS.register(ArcElement, Tooltip, Legend);
  console.log(ctx.userCurrentTourExpenseData);
  let Travel = 0;
  let food = 0;
  let Misc = 0;
  let Accomondation = 0;
  ctx.userCurrentTourExpenseData.forEach((current) => {
    if (current.expenseType == "Food(Da)") {
      food += +current.Amount;
    } else if (current.expenseType == "Travel") {
      Travel += +current.Amount;
    } else if (current.expenseType == "Misc") {
      Misc += +current.Amount;
    } else if (current.expenseType == "Accomondation") {
      Accomondation += +current.Amount;
    }
  });
  
  console.log(Travel, Misc, food, Accomondation);
  const data = {
    labels: ["Misc", "Travel", "Food", "Accomondation"],
    datasets: [
      {
        label: "amount",
        data: [Travel, Misc, food, Accomondation],
        backgroundColor: [
          "rgba(255, 99, 132, 1.8)",

          "rgba(255, 206, 86,1.8)",
          "rgba(75, 192, 192, 1.8)",
          "blue",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",

          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "blue",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className=" w-[40%]  min-h-[250px] h-[40vh]  m-2 bg-white rounded-lg shadow-md shadow-gray-700 text-center ">
      <p className=" border-white  py-2 font-bold bg-gradient-to-r from-[#dd2476] to-[#ff7e5f] text-2xl rounded-t-lg">
        Expense Graph
      </p>

      {props.tourSelected &&
      food == 0 &&
      Travel == 0 &&
      Accomondation == 0 &&
      Misc == 0 ? (
        <>
          <div className="w-[100%] h-[calc(40vh-110px)] min-h-[calc(250px-90px)] my-2 text-black flex justify-center items-center flex-col font-bold">
            <img src={expenseGif} className="h-[80px]" draggable={false}></img>{" "}
            <p>no data found</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-[100%] h-[calc(40vh-110px)] min-h-[calc(250px-90px)] my-2">
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
              Food
            </div>

            <div className="flex justify-center">
              {" "}
              <span className="text-center">
                <VscDebugBreakpointLog className="w-[20px] h-[20px] text-yellow-500" />
              </span>
              Travel
            </div>
            <div className="flex justify-center">
              {" "}
              <span className="text-center">
                <VscDebugBreakpointLog className="w-[20px] h-[20px] text-red-500" />
              </span>
              misc
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserExpensesGraph;
