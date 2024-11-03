import React from "react";
import { useState, useEffect } from "react";
import { auth } from "./Firebase";

const SidebarComp = () => {
  const [userDetails, setuserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      setuserDetails(user);
    });
  };
  async function handlelogout(){
    try {
      await auth.signOut();
      window.location.href="/";
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
      <div className="drawer fixed z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button fixed -z-50"
          >
            Manage Cases
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-10">
            <li>
              <a href="">
                {" "}
                {userDetails ? (
                  <>
                    <div className="avatar mt-3 md:mt-2 -ml-5 md:ml-[1rem]">
                      <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                        <img src="https://img.freepik.com/premium-vector/manager-icon_933463-4265.jpg?w=740" />
                      </div>
                      <div className="-mt-2 ml-5 text-xl">
                        {userDetails.displayName}
                      </div>
                      <p className="mt-5 -ml-24 text-gray-500">Welcome</p>
                    </div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </a>
            </li>
            <li>
  
              <a href="/dashboard/Office12" className="-mt-[2rem] ml-5 text-[1.2rem]">Dashboard</a>
            </li>
            <li>
              <a href="/dashboard/ManageCase" className=" ml-5  text-[1.2rem]">
                Manage Case
              </a>
            </li>
            <li>
              <a href="/dashboard/AddCase" className=" ml-5  text-[1.2rem]">Add Case</a>
            </li>
            <li>
              <a href="/signin" className=" ml-5  text-[1.2rem]">SiginIn</a>
            </li>
            <li>
              <a onClick={handlelogout} className=" ml-5  text-[1.2rem]">Logout</a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
};

export default SidebarComp;
