import React, { useContext, useEffect, useState } from "react";
import UserSidePanel from "./UserSidePanel";
import UserExpensesGraph from "./UserExpensesGraph";
import UsersTour from "./UsersTour";
import UserExpenseList from "./UserExpenseList";
import axios from "axios";
import Context from "../../store/Context";

function UserHomePage() {
  const connectionUrl = "http://localhost:2000";
  const ctx = useContext(Context);
  const [tourSelected, setTourSelected] = useState(false);
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.post(`${connectionUrl}/user/gettour`, {
          userId: user.id,
        });

        const res = response.data;
        console.log(res.vouchers);
        res.vouchers.forEach((current) => {
          ctx.onGoingTour(current);
        });

        // ctx.userExpenses(res)
        //   ctx.AllVoucher(response.data.userList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTour();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] text-white bg-transparent font-['Poppins'] pt-[90px]">
      <div className="min-[800px]:mx-4 min-[1000px]:mx-16 mx-4 min-[1200px]:mx-28 flex">
        <UserSidePanel></UserSidePanel>
        <div
          className="w-[100%]  h-[calc(100vh-90px)] mx-2 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex">
            <UsersTour
              selected={() => {
                setTourSelected(true);
              }}
            ></UsersTour>
            {tourSelected && (
              <UserExpensesGraph
                tourSelected={tourSelected}
              ></UserExpensesGraph>
            )}
          </div>
          {tourSelected && (
            <div className="flex">
              <UserExpenseList></UserExpenseList>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
