import React, { useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog"; // Assuming you're using a UI library like shadcn/ui
import { Input } from "./ui/input"; // Input component
import { Button } from "./ui/button"; // Button component
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select"; // Select component for enums
import { useParams } from "react-router-dom";

const EditCaseButton = () => {
  const { caseId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    evidenceType: "",
    status: "in_progress",
    priority: "medium",
    chainOfCustody: [],
    toolsUsed: [],
    findings: [],
    createdBy: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

  // Fetch case details when the modal is opened
  const fetchCaseDetails = async () => {
    const token = localStorage.getItem("authtoken");
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4001/cases/${caseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setFormData(response.data.getCase); // Set the fetched case data
      } else {
        setError("Failed to fetch case details.");
      }
    } catch (error) {
      console.error("Error fetching case details:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

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
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authtoken");
      const response = await axios.put(
        `http://localhost:4001/cases/${caseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Case updated successfully!");
        setIsOpen(false); // Close the modal after successful submission
      } else {
        toast.error("Failed to update case.");
      }
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={fetchCaseDetails}
          className="text-[1.3rem] ml-[14rem] h-[3rem] bg-green-500 w-[15rem] mt-4"
        >
          Edit Case
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[1.6rem]"> Edit Case</DialogTitle>
          <DialogDescription>
            Make changes to the case details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
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
                  {[
                    "hard drive",
                    "smartphone",
                    "computer",
                    "cloud data",
                    "network logs",
                    "other",
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
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

            {/* Chain of Custody */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label>Chain of Custody</label>
              <div className="col-span-3">
                {formData.chainOfCustody.map((entry, index) => (
                  <div key={index} className="mb-4">
                    <Input
                      placeholder="Received By"
                      value={entry.receivedBy}
                      onChange={(e) =>
                        handleNestedChange(
                          "chainOfCustody",
                          index,
                          "receivedBy",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Location"
                      className="mt-2"
                      value={entry.location}
                      onChange={(e) =>
                        handleNestedChange(
                          "chainOfCustody",
                          index,
                          "location",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Notes"
                      className="mt-2"
                      value={entry.notes}
                      onChange={(e) =>
                        handleNestedChange(
                          "chainOfCustody",
                          index,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      type="button" 
                      className="mt-4 w-28 bg-red-600 hover:bg-red-700"
                      onClick={() => removeNestedEntry("chainOfCustody", index)}
                    >
                      Remove Entry
                    </Button>
                  </div>
                ))}
                <Button
                  type="button" className=" w-28 bg-green-600 hover:bg-green-700"
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

            {/* Tools Used */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label>Tools Used</label>
              <div className="col-span-3">
                {formData.toolsUsed.map((tool, index) => (
                  <div key={index} className="mb-4">
                    <Input
                      placeholder="Tool Name"
                      value={tool.name}
                      onChange={(e) =>
                        handleNestedChange(
                          "toolsUsed",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Version"
                      className="mt-2"
                      value={tool.version}
                      onChange={(e) =>
                        handleNestedChange(
                          "toolsUsed",
                          index,
                          "version",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Notes"
                      className="mt-2"
                      value={tool.notes}
                      onChange={(e) =>
                        handleNestedChange(
                          "toolsUsed",
                          index,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      type="button"
                      className="mt-4 w-28 bg-red-600 hover:bg-red-700"
                      onClick={() => removeNestedEntry("toolsUsed", index)}
                    >
                     Remove Entry
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"  className="w-28 bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    addNestedEntry("toolsUsed", {
                      name: "",
                      version: "",
                      notes: "",
                    })
                  }
                >
                  Add Entry
                </Button>
              </div>
            </div>

            {/* Findings */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label>Findings</label>
              <div className="col-span-3">
                {formData.findings.map((finding, index) => (
                  <div key={index} className="mb-4">
                    <Input
                      placeholder="Summary"
                      value={finding.summary}
                      onChange={(e) =>
                        handleNestedChange(
                          "findings",
                          index,
                          "summary",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Details"
                      className="mt-2"
                      value={finding.details}
                      onChange={(e) =>
                        handleNestedChange(
                          "findings",
                          index,
                          "details",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      type="button"
                      className="mt-4 w-28 bg-red-600 hover:bg-red-700"
                      onClick={() => removeNestedEntry("findings", index)}
                    >
                     Remove Entry
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"  className="w-28 bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    addNestedEntry("findings", {
                      summary: "",
                      details: "",
                      createdAt: new Date(),
                      addedBy: "",
                    })
                  }
                >
                  Add Entry
                </Button>
              </div>
            </div>

            {/* Created By */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="createdBy">Created By</label>
              <Input
                id="createdBy"
                value={formData.createdBy}
                readOnly // Make this field read-only
                className="col-span-3"
              />
            </div>

            {/* Created At */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label>Created At</label>
              <Input
                type="text"
                value={new Date(formData.createdAt).toLocaleString()}
                readOnly // Make this field read-only
                className="col-span-3"
              />
            </div>

            {/* Updated At */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label>Updated At</label>
              <Input
                type="datetime-local" // Use datetime-local for editable date and time
                value={
                  formData.updatedAt
                    ? new Date(formData.updatedAt).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  setFormData((prevData) => ({
                    ...prevData,
                    updatedAt: newDate,  
                  }));
                }}
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCaseButton;
