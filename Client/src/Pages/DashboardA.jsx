import DashboardOffA from "@/Components/DashboardOffA";
import Navabar from "@/Components/Navabar";
import SidebarComp from "@/Components/SidebarComp";
import React from "react";

const DashboardA = () => {
  return (
    <>
      <Navabar />
      <div className="">.</div>
      <div className="flex">
        <div className="">
          <h1 className="text-3xl ml-44 mt-16 font-bold">DashBoard</h1>
          <p className="text-1xl ml-44 mt-2 text-gray-500">
            Manage and track Your cases
          </p>
        </div>
        <div className="ml-[54rem] mt-[5rem]">
          <SidebarComp />
        </div>
      </div>
      <DashboardOffA />
    </>
  );
};

export default DashboardA;
