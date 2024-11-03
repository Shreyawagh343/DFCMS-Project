import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
  } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const Loginpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { officerCode, password } = data;
    const userinfo = { officerCode, password };

    axios
      .post("http://localhost:4001/users/LoginCode", userinfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // Store token and user info
          localStorage.setItem("token", res.data.token); // Save the token
          localStorage.setItem("users", JSON.stringify(res.data.user)); // Save user info
          toast.success("Successfully logged in!");

          // Redirect based on officer code
          switch (officerCode) {
            case "1234567890":
              window.location.href = "/dashboard/Office12";
              break;
            case "987654321":
              window.location.href = "/dashboard/Office13";
              break;
            case "654321789":
              window.location.href = "/dashboard/Office14";
              break;
            default:
              // Handle cases where officerCode doesn't match any known dashboard
              toast.error("Invalid officer code");
          }
        }
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
        <Tabs defaultValue="account" className="w-[25rem] ml-[35rem] mt-[10rem] ">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="account">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardDescription>
            Log in with your officer code to securely access your dashboard and manage assigned cases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <form onSubmit={handleSubmit(onSubmit)}>
              <input type="number" name="number" onChange={(e) =>()=>{
                  setOfficerCode(e.target.value)
                }
              }
              className='w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 dark:bg-slate-900 dark:text-white' placeholder='Officer Code'{...register("officerCode", { required: { value: true, message: "This field is required" }, minLength: { value: 8, message: "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number" }, pattern: { value: 8, message: "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number" } })} />
              {errors.officerCode && <span className='text-red-700 text-xs pl-5'>{errors.officerCode.message}</span>}
              <div className="login"></div>

              <input type="password" name='password' className='w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 dark:bg-slate-900 dark:text-white' placeholder='Password'{...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 8, message: "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number" }, pattern: { value: 8, message: "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number" } })} />
              {errors.password && <span className='text-red-700 text-xs pl-5'>{errors.password.message}</span>}
              <div className="login">

             <button className='w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 text-center text-white bg-blue-600'>Login</button>
             <p className=' md:text-[1.1rem] text-xs mt-5 md:ml-20 ml-9'>Don't have a account?<Link to="/signin" className='text-blue-500 pl-2 '>Signup</Link></p>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
          
        </Tabs>
    </>
  );
};

export default Loginpage;
