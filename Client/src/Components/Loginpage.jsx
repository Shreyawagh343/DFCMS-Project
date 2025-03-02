import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Loginpage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post("http://localhost:4001/users/LoginCode", {
        email,
        password,
      });

      if (res.data) {
        // Store token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("users", JSON.stringify(res.data.user));
        toast.success("Successfully logged in!");

        // Navigate to the redirect URL provided by the backend
        navigate(res.data.redirectUrl || "/dashboard"); // Fallback to /dashboard if redirectUrl is missing
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <>
      <Tabs defaultValue="account" className="w-[25rem] ml-[35rem] mt-[10rem]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="account">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardDescription>
                Log in with your email to securely access your dashboard and
                manage assigned cases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="email"
                  name="email"
                  className="w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 dark:bg-slate-900 dark:text-white"
                  placeholder="Email"
                  {...register("email", {
                    required: { value: true, message: "This field is required" },
                    pattern: {
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-600 text-xs pt-3">
                    {errors.email.message}
                  </span>
                )}
                <div className="login"></div>

                <input
                  type="password"
                  name="password"
                  className="w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 dark:bg-slate-900 dark:text-white"
                  placeholder="Password"
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-700 text-xs pl-5">
                    {errors.password.message}
                  </span>
                )}
                  <button
                    type="submit"
                    className="w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 text-center text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Login
                  </button>
                  <p className="md:text-[1.1rem] text-xs mt-5 md:ml-20 ml-9">
                    Don't have an account?
                    <Link to="/signin" className="text-blue-500 pl-2">
                      Signup
                    </Link>
                  </p>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Loginpage;