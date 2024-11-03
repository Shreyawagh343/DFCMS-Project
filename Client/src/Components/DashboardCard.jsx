import React from "react";


const DashboardCard = () => {
  return (
    <>
    
      <div className="card bg-base-100 w-[17rem] h-32 shadow-xl ml-10 mt-10 dark:bg-slate-900 dark:text-white">
        <div className="flex">
          <h2 className="card-title text-gray-400 text-xl ml-5 mt-5">Total Cases</h2>
         </div>
          <p className="font-semibold text-2xl ml-5 mt-2">1234</p>
          <p className="font-semibold text-1xl ml-5 mt-2"><span className="text-green-700">+55% </span>more than last week</p>
      </div>
      <div className="card bg-base-100 w-[17rem] h-32 shadow-xl ml-10 mt-10 dark:bg-slate-900 dark:text-white">
        <div className="flex">
          <h2 className="card-title text-xl text-gray-400 ml-5 mt-5 ">Completed Cases</h2>
         </div>
          <p className="font-semibold text-2xl ml-5 mt-2">1234</p>
          <p className="font-semibold text-1xl ml-5 mt-2"><span className="text-green-700">+15% </span>more than last week</p>
      </div>
      <div className="card bg-base-100 w-[17rem] h-32 shadow-xl ml-10 mt-10 dark:bg-slate-900 dark:text-white">
      <div className="flex">
          <h2 className="card-title text-xl text-gray-400  ml-5 mt-5">Pending Cases</h2>
         </div>
          <p className="font-semibold text-2xl ml-5 mt-2">1234</p><p className="font-semibold text-1xl ml-5 mt-2"><span className="text-red-700">+5% </span>less than last week</p>
      </div>
      <div className="card bg-base-100 w-[17rem] h-32 shadow-xl ml-10 mt-10 dark:bg-slate-900 dark:text-white">
      <div className="flex">
          <h2 className="card-title text-xl text-gray-400 ml-5 mt-5">Ongoing Cases</h2>
         </div>
          <p className="font-semibold text-2xl ml-5 mt-2">1234</p>
          <p className="font-semibold text-1xl ml-5 mt-2"><span className="text-green-700">+35% </span>more than last week</p>
      </div>
      
    </>
  );
};

export default DashboardCard;
