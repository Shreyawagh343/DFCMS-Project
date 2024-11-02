import DashbaordOffB from "@/Components/DashbaordOffB";
import Navabar from "@/Components/Navabar";
import SidebarComp from "@/Components/SidebarComp";
import React from "react";

const DashboardB = () => {
  return (
    <>
     <div className="w-[100vw] h-[120vh]">
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
      <DashbaordOffB/>
      </div>
    </>
  );
};

export default DashboardB;
