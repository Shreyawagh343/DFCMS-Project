import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const TableCase = () => {
  const { officerCode } = useParams();
  const [cases, setCases] = useState([]); // State to store fetched cases
  const [error, setError] = useState(null); // State for error handling

  // Fetch cases from the backend
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
  }, [officerCode]);

  // useEffect(() => {
  //   const filteredCases  = async () => {
  //     const token = localStorage.getItem('authtoken');
  //       const response = await fetch(`http://localhost:4001/cases/officer/${officerCode}`, {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (response.status === 401) {
  //         // Handle unauthorized access
  //         console.log("Unauthorized access - redirecting to login");
  //         localStorage.removeItem('authtoken');
  //         return;
  //       }

        

  //       const data = await response.json();
  //       console.log("Fetched Data:", data); 
  //       const filtered = data.filter((caseItem) => {
  //         const matchesSearchTerm = caseItem.title
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase());
  //         const matchesStatus = selectedStatus
  //           ? caseItem.status === selectedStatus
  //           : true; // If no status is selected, include all cases
  //         return matchesSearchTerm && matchesStatus;
  //       });
  //       filtered();
  //   filteredCases();
  // }, [officerCode];



  return (
    <div className="overflow-x-auto">
      <table className="table text-[1.1rem]">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Task</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {cases.map((cases) => (
            <tr key={cases._id}>
              <th>
                <label className="flex">
                  <Link to={`/case/${cases._id}/dashboard`}>
                    <input type="checkbox" className="checkbox" />
                  </Link>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCase;