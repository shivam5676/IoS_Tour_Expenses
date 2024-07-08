import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Context from "../store/Context";
import UserExpenseList from "./../components/user/UserExpenseList";
import UsersTour from "./../components/user/UsersTour";
import UserExpensesGraph from "./../components/user/UserExpensesGraph";

const UserHome = () => {
  const connectionUrl = process.env.REACT_APP_CONNECTION_STRING;
  const ctx = useContext(Context);
  const [tourSelected, setTourSelected] = useState(false);
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.post(
          `${connectionUrl}:${process.env.REACT_APP_BACKEND_PORT}/user/gettour`,
          {
            // userId: user.id,
            token: user.access_token,
            domain: user.domain,
          }
        );

        const res = response.data.vouchers;
        console.log(res);
        ctx.onGoingTour(res);

        console.log(response.data.valid);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTour();
  }, []);
  return (
    <section className="main-content flex-1 bg-white pt-5 md:pt-3  md:mt-2 pb-24 md:pb-5">
      <div className="flex  flex-col min-[689px]:flex-row mx-2 min-[1000px]:mx-12">
        <UsersTour
          selected={() => {
            setTourSelected(true);
          }}
          deSelect={() => {
            setTourSelected(false);
          }}
        ></UsersTour>
        {tourSelected && (
          <UserExpensesGraph tourSelected={tourSelected}></UserExpensesGraph>
        )}
      </div>
      {tourSelected && (
        <div className="flex flex-col min-[689px]:flex-row  mx-2 min-[1000px]:mx-12">
          <UserExpenseList
            removeOnGoingTour={() => setTourSelected(null)}
          ></UserExpenseList>
        </div>
      )}
    </section>
  );
};

export default UserHome;
