import React from "react";
import { Link } from "react-router-dom";

const Mainpage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col justify-center items-center">
      {/* Main Content */}
      <div className="max-w-4xl text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          <span className="text-[#023E8A]">Welcome to the Digital Forensic Management System!</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Our platform ensures secure and efficient management of digital evidence, streamlining investigations and enhancing collaboration. Simplify your forensic processes with us and safeguard the digital world!
        </p>

        {/* Button */}
        <Link to="/signin">
          <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#0096C7] transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Mainpage;