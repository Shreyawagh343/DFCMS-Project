import React, { useState } from "react";
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
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select";
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
  const [isOpen, setIsOpen] = useState(false);

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
        setFormData(response.data.getCase);
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

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

  const addNestedEntry = (field, template) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], template],
    }));
  };

  const removeNestedEntry = (field, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };

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
        setIsOpen(false);
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
          className="text-lg font-semibold bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ml-[15rem] w-[15vw] h-[3rem]"
        >
          Edit Case
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-800">
            Edit Case
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Make changes to the case details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            {/* Basic Fields */}
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="title" className="text-lg font-medium text-gray-700">
                Title
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="description" className="text-lg font-medium text-gray-700">
                Description
              </label>
              <Input
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="evidenceType" className="text-lg font-medium text-gray-700">
                Evidence Type
              </label>
              <Select
                value={formData.evidenceType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, evidenceType: value }))
                }
              >
                <SelectTrigger className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                    <SelectItem key={type} value={type} className="text-lg">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="status" className="text-lg font-medium text-gray-700">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {formData.status || "Select status"}
                </SelectTrigger>
                <SelectContent>
                  {["active", "new", "closed"].map((status) => (
                    <SelectItem key={status} value={status} className="text-lg">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="priority" className="text-lg font-medium text-gray-700">
                Priority
              </label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {formData.priority || "Select priority"}
                </SelectTrigger>
                <SelectContent>
                  {["low", "medium", "high"].map((priority) => (
                    <SelectItem key={priority} value={priority} className="text-lg">
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Chain of Custody */}
            <div className="grid grid-cols-4 items-center gap-6">
              <label className="text-lg font-medium text-gray-700">Chain of Custody</label>
              <div className="col-span-3">
                {formData.chainOfCustody.map((entry, index) => (
                  <div key={index} className="mb-6">
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
                      className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                      placeholder="Location"
                      className="mt-4 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="mt-4 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="mt-4 w-28 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => removeNestedEntry("chainOfCustody", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="w-28 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
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
            <div className="grid grid-cols-4 items-center gap-6">
              <label className="text-lg font-medium text-gray-700">Tools Used</label>
              <div className="col-span-3">
                {formData.toolsUsed.map((tool, index) => (
                  <div key={index} className="mb-6">
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
                      className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                      placeholder="Version"
                      className="mt-4 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="mt-4 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="mt-4 w-28 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => removeNestedEntry("toolsUsed", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="w-28 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
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
            <div className="grid grid-cols-4 items-center gap-6">
              <label className="text-lg font-medium text-gray-700">Findings</label>
              <div className="col-span-3">
                {formData.findings.map((finding, index) => (
                  <div key={index} className="mb-6">
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
                      className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                      placeholder="Details"
                      className="mt-4 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="mt-4 w-28 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => removeNestedEntry("findings", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="w-28 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
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
            <div className="grid grid-cols-4 items-center gap-6">
              <label htmlFor="createdBy" className="text-lg font-medium text-gray-700">
                Created By
              </label>
              <Input
                id="createdBy"
                value={formData.createdBy}
                readOnly
                className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Created At */}
            <div className="grid grid-cols-4 items-center gap-6">
              <label className="text-lg font-medium text-gray-700">Created At</label>
              <Input
                type="text"
                value={new Date(formData.createdAt).toLocaleString()}
                readOnly
                className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Updated At */}
            <div className="grid grid-cols-4 items-center gap-6">
              <label className="text-lg font-medium text-gray-700">Updated At</label>
              <Input
                type="datetime-local"
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
                className="col-span-3 p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Save Changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCaseButton;