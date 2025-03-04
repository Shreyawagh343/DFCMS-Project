import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

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
      role: data.role,
    };
    axios
      .post("http://localhost:4001/users/SignIn", userinfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Successfully Signed In!");
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
    <div className="min-h-screen flex">
      {/* Left Side: Visual Section */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/african-american-hacker-holding-tablet-hack-online-system-causing-malware-network-planning-cyberattack-looking-security-server-access-database-steal-passwords_482257-62559.jpg?uid=R155647787&ga=GA1.1.74947205.1720868009&semt=ais_hybrid')",
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          height: "100vh", // Full viewport height
        }}
      >
        <div className="text-center text-white p-8  rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome!</h1>
          <p className="text-xl">
            Join our platform to manage digital forensic cases efficiently and securely.
          </p>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600 text-1xl mb-8">Get started with an account.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="fullname"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                {...register("fullname", {
                  required: { value: true, message: "This field is required" },
                  minLength: {
                    value: 3,
                    message: "Name must have between 3 and 25 characters",
                  },
                  maxLength: {
                    value: 25,
                    message: "Name must have between 3 and 25 characters",
                  },
                })}
              />
              {errors.fullname && (
                <span className="text-red-600 text-xs mt-1">
                  {errors.fullname.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="john.doe@example.com"
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Create password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
                {...register("password", {
                  required: { value: true, message: "This field is required" },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "Password must contain at least one lowercase letter, one uppercase letter, and one number",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                {...register("role", {
                  required: { value: true, message: "This field is required" },
                })}
              >
                <option value="officer">Officer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Officer Code Field */}
            <div>
              <label htmlFor="officerCode" className="block text-sm font-medium text-gray-700">
                Officer Code
              </label>
              <input
                type="text"
                id="officerCode"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="OFF123"
                {...register("officerCode", {
                  required: { value: false, message: "This field is required" },
                })}
              />
              {errors.officerCode && (
                <span className="text-red-600 text-xs mt-1">
                  {errors.officerCode.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-[1.2rem] text-gray-600">
              Already have an account?{" "}
              <Link to="/loginhome" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign;