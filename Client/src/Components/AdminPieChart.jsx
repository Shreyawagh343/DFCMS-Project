import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPieChart = () => {
  const [caseStatusData, setCaseStatusData] = useState({});

  // Fetch case data and calculate status distribution
  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        const response = await fetch("http://localhost:4001/cases/cases/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch case data");
        }

        const data = await response.json();
        const cases = data.AllCase;

        // Calculate status distribution
        const statusCounts = cases.reduce((acc, caseItem) => {
          const status = caseItem.status || "Unknown"; // Handle undefined status
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Prepare data for the pie chart
        setCaseStatusData({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              label: "Case Status Distribution",
              data: Object.values(statusCounts),
              backgroundColor: [
                "#FF6384", // Red
                "#36A2EB", // Blue
                "#FFCE56", // Yellow
                "#4BC0C0", // Teal
                "#9966FF", // Purple
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchCaseData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg mt-2 ml-48">
      <h2 className="text-xl font-semibold mb-4">Case Status Distribution</h2>
      <div className="w-full max-w-md mx-auto">
        {caseStatusData.labels ? (
          <Pie
            data={caseStatusData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        ) : (
          <p>Loading case data...</p>
        )}
      </div>
    </div>
  );
};

export default AdminPieChart;