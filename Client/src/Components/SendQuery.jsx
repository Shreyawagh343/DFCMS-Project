import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const SendQuery = () => {
  const officerCode = JSON.parse(localStorage.getItem("users"))?.officerCode;
  const [caseName, setCaseName] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authtoken");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4001/query/CreateQuery", {
        CaseName: caseName,
        officerCode,
        query,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setCaseName("");
        setQuery("");
        toast.success("Query Submitted Successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 border rounded-lg shadow-lg bg-white max-w-md mx-auto mt-24">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Submit Query to Admin</h2>
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          <h3 className="font-bold">Error</h3>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          <h3 className="font-bold">Success</h3>
          <p className="mt-2 text-sm">Query submitted successfully!</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          value={caseName}
          onChange={(e) => setCaseName(e.target.value)}
          placeholder="Enter case name..."
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <Input
          type="text"
          value={officerCode}
          placeholder="Enter officer code..."
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          readOnly
        />
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? "Submitting..." : "Submit Query"}
        </Button>
      </form>
    </div>
  );
};

export default SendQuery;
