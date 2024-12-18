import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "./Login";

const Sign = () => {
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const userinfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      officerCode: data.officerCode,
    };
    axios
      .post("http://localhost:4001/users/SignIn", userinfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Successfully Signin!");
        }
        localStorage.setItem("users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white ">
        <div className=" md:mt-10 mt-0 md:pt-5 pt-10 md:ml-[32rem] ml-[1rem] h-[45rem] md:w-[30rem] w-11/12 flex flex-col md:border border-0 p-5">
          <h1 className="text-3xl pl-7 relative">Create account</h1>
          <Link
            to="/home"
            className="btn btn-sm btn-circle btn-ghost left-[59rem] absolute"
          >
            ✕
          </Link>
          <p className="pl-7">Get started with an account.</p>
          <form
            className="flex flex-col pl-7 mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="" className="text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="fullname"
              className="border border-gray-300 h-10 mt-3 w-11/12 pl-5 rounded-md"
              {...register("fullname", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 3,
                  message: "name must have letters between 3 and 25",
                },
                maxLength: {
                  value: 25,
                  message: "name must have letters between 3 and 25",
                },
              })}
            />
            {errors.fullname && (
              <span className="text-red-600 text-xs pt-3">
                {errors.fullname.message}
              </span>
            )}

            <label htmlFor="label" className="text-gray-500 mt-5">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="border border-gray-300 h-10 mt-3 w-11/12 pl-5 rounded-md"
              {...register("email", {
                required: { value: true, message: "This field is required" },
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-xs pt-3">
                {errors.email.message}
              </span>
            )}

            <label htmlFor="label" className="text-gray-500 mt-5">
              Create password
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-300 h-10 mt-3 w-11/12 pl-5 rounded-md"
              {...register("password", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 8,
                  message:
                    "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number",
                },
                pattern: {
                  value: 8,
                  message:
                    "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-600 text-xs pt-3">
                {errors.password.message}
              </span>
            )}

            <label className="text-gray-500 mt-5" htmlFor="label">
              Comfirm password
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-300 h-10 mt-3 w-11/12 pl-5 rounded-md"
            />

            <label htmlFor="label" className="text-gray-500 mt-5">
              Officer Code
            </label>
            <input
              type="number"
              name="number"
              className="border border-gray-300 h-10 mt-3 w-11/12 pl-5 rounded-md"
              {...register("officerCode", {
                required: { value: true, message: "This field is required" },
              })}
            />
            {errors.officerCode && (
              <span className="text-red-600 text-xs pt-3">
                {errors.email.officerCode}
              </span>
            )}
            <button className="border border-gray-300 h-10 mt-5 w-11/12 pl-5 rounded-md bg-blue-500 text-white">
              Create account
            </button>
            <p className="mt-3 md:ml-16 ml-2 text-[1.1rem]">
              Already have a account!
              <p
                className="text-blue-500 ml-44 -mt-6 cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </p>
              <Login />
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sign;
