import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./ui/sheet"; // Assuming you're using a UI library like shadcn/ui
import { Input } from "./ui/input"; // Input component
import { Button } from "./ui/button"; // Button component
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select"; // Select component for enums

const EditCase = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    evidenceType: "",
    status: "",
    priority: "",
    chainOfCustody: [],
    toolsUsed: [],
    findings: [],
    createdBy: "",
  });

  // Fetch case details when the component mounts or caseId changes
  useEffect(() => {
    const fetchCaseDetails = async () => {
        const token = localStorage.getItem('authtoken');
      try {

        const response = await axios.get(`/api/cases/${caseId}`, {
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
        setFormData(data.cases); // Set the fetched cases to state
    } catch (error) {
        console.error("Fetch Error:", error); // Debugging: Log the error
        setError(error.message); // Set error message if something goes wrong
    }
};

fetchCaseDetails();
}, [caseId]); // Re-fetch when officerCode changes


  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle nested array changes (e.g., chainOfCustody, toolsUsed, findings)
  const handleNestedChange = (field, index, key, value) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[field]];
      updatedArray[index][key] = value;
      return {
        ...prevData,
        [field]: updatedArray,
      };
    });
  };

  // Add a new entry to a nested array
  const addNestedEntry = (field, template) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], template],
    }));
  };

  // Remove an entry from a nested array
  const removeNestedEntry = (field, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/cases/${caseId}`, formData);
      onSave(response.data); // Notify parent component of the update
      alert("Case updated successfully!");
    } catch (error) {
      console.error("Error updating case:", error);
      alert("Failed to update case.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <button className="btn btn-outline btn-success">Edit</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Case</SheetTitle>
          <SheetDescription>
            Make changes to the case details here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Basic Fields */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="evidenceType">Evidence Type</label>
            <Select
              value={formData.evidenceType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, evidenceType: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                {formData.evidenceType || "Select evidence type"}
              </SelectTrigger>
              <SelectContent>
                {["hard drive", "smartphone", "computer", "cloud data", "network logs", "other"].map(
                  (type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                {formData.status || "Select status"}
              </SelectTrigger>
              <SelectContent>
                {["pending", "in_progress", "completed"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="priority">Priority</label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                {formData.priority || "Select priority"}
              </SelectTrigger>
              <SelectContent>
                {["low", "medium", "high"].map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nested Arrays */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label>Chain of Custody</label>
            <div className="col-span-3">
              {formData.chainOfCustody.map((entry, index) => (
                <div key={index} className="mb-4">
                  <Input
                    placeholder="Received By"
                    value={entry.receivedBy}
                    onChange={(e) =>
                      handleNestedChange("chainOfCustody", index, "receivedBy", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Location"
                    value={entry.location}
                    onChange={(e) =>
                      handleNestedChange("chainOfCustody", index, "location", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => removeNestedEntry("chainOfCustody", index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  addNestedEntry("chainOfCustody", {
                    receivedBy: "",
                    dateReceived: new Date(),
                    location: "",
                    notes: "",
                  })
                }
              >
                Add Entry
              </Button>
            </div>
          </div>

          {/* Repeat similar blocks for toolsUsed and findings */}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditCase;