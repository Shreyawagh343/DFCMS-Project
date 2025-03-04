import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";

const TableDash = () => {
  const {caseId}= useParams();
  const [Caseinformation, setCaseinformation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4001/cases/AllCase")
      .then((response) => {
        setCaseinformation(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> Recent Case</CardTitle>
          <CardDescription>Track your recent cases</CardDescription>
        </CardHeader>
        <CardContent>
        <table className="table text-[1.1rem]">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {Caseinformation.slice(0, 4).map((cases) => (
              <tr key={cases.createdBy}>
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
        </CardContent>
      </Card>
    </>
  );
};

export default TableDash;
