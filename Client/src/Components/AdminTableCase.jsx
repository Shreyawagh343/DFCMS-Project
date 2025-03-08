import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const AdminTableCase = ({ searchQuery, selectedStatus }) => {
  const { officerCode } = useParams();
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      const token = localStorage.getItem('authtoken');
      try {
        const response = await fetch(`http://localhost:4001/cases/cases/all`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          console.log("Unauthorized access - redirecting to login");
          localStorage.removeItem('authtoken');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }

        const data = await response.json();
        setCases(data.AllCase);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      }
    };

    fetchCases();
  }, [officerCode]);

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedStatus ? caseItem.status.toLowerCase() === selectedStatus.toLowerCase() : true)
  );

  return (
    <div className="overflow-x-auto">
      <table className="table text-[1.1rem]">
        <thead>
          <tr>
            <th>Task</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {filteredCases.map((caseItem) => (
            <tr key={caseItem._id}>
              <th>
                <label className="flex">
                  <Link to={`/case/${caseItem._id}/dashboard`}>
                    <input type="checkbox" className="checkbox" />
                  </Link>
                  <h1 className="ml-2">Task</h1>
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{caseItem.title}</div>
                  </div>
                </div>
              </td>
              <td>{caseItem.status}</td>
              <td>{caseItem.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTableCase;




