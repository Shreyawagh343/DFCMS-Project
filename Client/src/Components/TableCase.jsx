import React from "react";
import { useState , useEffect } from "react";
import { useParams } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditCase from "./EditCases";

const TableCase = () => {
    const { officerCode } = useParams();
        const [cases, setCases] = useState([]);
      
        useEffect(() => {
          const fetchCases = async () => {
              const token = localStorage.getItem('authtoken');
              try {
                  const response = await fetch(`http://localhost:4001/cases/officer/${officerCode}`, {
                      method: 'GET',
                      headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json',
                      },
                  });
                  if (response.status === 401) {
                      // Handle unauthorized access
                      console.log("Unauthorized access - redirecting to login");
                      localStorage.removeItem('authtoken');
                      return;
                  }
  
                  if (!response.ok) {
                      throw new Error('Failed to fetch cases');
                  }
  
                  const data = await response.json();
                  console.log("Fetched Data:", data); // Debugging: Log the fetched data
                  setCases(data.cases); // Set the fetched cases to state
              } catch (error) {
                  console.error("Fetch Error:", error); // Debugging: Log the error
                  setError(error.message); // Set error message if something goes wrong
              }
          };
  
          fetchCases();
      }, [officerCode]); // Re-fetch when officerCode changes
  
  return (
    <>

      <div className="overflow-x-auto">
        <table className="table text-[1.1rem]">
          {/* head */}
          <thead>
            <tr>
              <th>Task</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Details</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {cases.map((cases) => (
              <tr key={cases.createdBy}>
                <th>
                  <label className="flex">
                    <input type="checkbox" className="checkbox" />
                    <h1 className="ml-2">Task</h1>
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{cases.title}</div>
                    </div>
                  </div>
                </td>
                <td>{cases.status}</td>
                <td>{cases.priority}</td>
                <th>
                  {/* Details Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger>
                    <button className="btn btn-link  btn-primary">Open</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </th>
                <th>
                  {/* Edit Sheet */}
                  
                </th>
              </tr>
          ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
};

export default TableCase;
