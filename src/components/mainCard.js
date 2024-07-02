import React from "react";
import AdminPEndingVouchers from "./AdminPEndingVouchers";
import AdminExpenseGraph from "./AdminExpenseGraph";
import CompletedVouchers from "./completedVouchers";
import AdminREjectedVoucher from "./AdminREjectedVoucher";
// import MetricCard from './MetricCard';
// import GraphCard from './GraphCard';
// import TableCard from './TableCard';
// import AdvertCard from './AdvertCard';

function Main() {
  return (
    <section className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
      <div className="flex flex-col min-[689px]:flex-row">
        <AdminExpenseGraph></AdminExpenseGraph>
        <AdminPEndingVouchers></AdminPEndingVouchers>
      </div>
      <div className="flex flex-col min-[689px]:flex-row">
      <CompletedVouchers></CompletedVouchers>
      <AdminREjectedVoucher></AdminREjectedVoucher>
     
      </div>
    </section>
  );
}

export default Main;
