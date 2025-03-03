import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      console.log("Response from backend:", res.data);

      if (res.data) {
        // Store token and user info
        localStorage.setItem("authtoken", res.data.token);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r to-indigo-50">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="account">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome Back!
              </CardTitle>
              <CardDescription className="text-center">
                Log in with your email to securely access your dashboard and
                manage assigned cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    {...register("email", {
                      required: { value: true, message: "This field is required" },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-600 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    {...register("password", {
                      required: { value: true, message: "Password is required" },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-600 text-xs mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Login
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Loginpage;