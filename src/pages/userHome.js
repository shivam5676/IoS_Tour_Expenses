import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Context from "../store/Context";
import UserExpenseList from "./../components/user/UserExpenseList";
import UsersTour from "./../components/user/UsersTour";
import UserExpensesGraph from "./../components/user/UserExpensesGraph";

const UserHome = () => {
  const connectionUrl = process.env.REACT_APP_BACKEND_URL;
  const ctx = useContext(Context);
  const [tourSelected, setTourSelected] = useState(false);
  const [loadingPendingDAta, setLoadingPendingData] = useState(false);
  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.post(`${connectionUrl}/user/gettour`, {
          // userId: user.id,
          token: user.access_token,
          domain: user.domain,
        });

        const res = response.data.vouchers;
        console.log(res);
        ctx.onGoingTour(res);
        setLoadingPendingData(true);
        console.log(response.data.valid);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTour();
  }, [ctx.loginData]);
  return (
    <section className="main-content flex-1  h-[calc(100%-10px)] bg-white pt-5 md:pt-3  md:mt-2 pb-24 md:pb-5">
      <div className="flex  flex-col min-[689px]:flex-row mx-2 min-[1000px]:mx-12">
        <UsersTour
          loadingPendingDAta={loadingPendingDAta}
          selected={() => {
            setTourSelected(true);
          }}
          deSelect={() => {
            setTourSelected(false);
          }}
        ></UsersTour>
        {tourSelected && (
          <UserExpensesGraph
            tourSelected={tourSelected}
            selected={tourSelected}
          ></UserExpensesGraph>
        )}
      </div>
      {tourSelected && (
        <div className="flex flex-col min-[689px]:flex-row  mx-2 min-[1000px]:mx-12">
          <UserExpenseList
            removeOnGoingTour={() => setTourSelected(null)}
            selected={tourSelected}
          ></UserExpenseList>
        </div>
      )}
    </section>
  );
};

export default UserHome;
