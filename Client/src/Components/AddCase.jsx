import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const AddCase = () => {
  const [chainOfCustodyDate, setChainOfCustodyDate] = useState();
  const [findingsDate, setFindingsDate] = useState();
  const [createdAtDate, setCreatedAtDate] = useState();
  const [updatedAtDate, setUpdatedAtDate] = useState();
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("authtoken");

    if (!token) {
      toast.error("You must be logged in to create a case.");
      navigate("/login");
      return;
    }

    data.chainOfCustody = [
      {
        receivedBy: data.chainOfCustodyReceivedBy,
        dateReceived: chainOfCustodyDate
          ? format(chainOfCustodyDate, "yyyy-MM-dd")
          : null,
        location: data.chainOfCustodyLocation,
        notes: data.chainOfCustodyNotes,
      },
    ];

    data.toolsUsed = [
      {
        name: data.toolsUsedName,
        version: data.toolsUsedVersion,
        notes: data.toolsUsedNotes,
      },
    ];

    data.findings = [
      {
        summary: data.findingsSummary,
        details: data.findingsDetails,
        createdAt: findingsDate ? format(findingsDate, "yyyy-MM-dd") : null,
        addedBy: JSON.parse(localStorage.getItem("users")).officerCode,
      },
    ];

    data.createdAt = createdAtDate ? format(createdAtDate, "yyyy-MM-dd") : null;
    data.updatedAt = updatedAtDate ? format(updatedAtDate, "yyyy-MM-dd") : null;

    try {
      const response = await axios.post(
        "http://localhost:4001/cases/CreateCase",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        localStorage.setItem("cases", JSON.stringify(response.data));
        toast.success("Case successfully created!");
        reset();
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 401) {
          toast.error("Unauthorized: Please log in again.");
          navigate("/loginhome");
        } else {
          toast.error(`Error: ${error.response.data.message}`);
        }
      } else {
        console.error("Error message:", error.message);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="mt-10 mx-auto max-w-[70vw] p-6 bg-white shadow-lg rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Add Case
          </CardTitle>
          <CardDescription className="text-lg text-center text-gray-600">
            Add new forensic cases and ensure all relevant details are accurately captured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-gray-700 font-medium">
                Title of Case
              </label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                {...register("title")}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-gray-700 font-medium">
                Description of Case
              </label>
              <Textarea
                id="description"
                placeholder="Type your description here."
                {...register("description")}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Evidence Type, Status, Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="evidenceType" className="text-gray-700 font-medium">
                  Evidence Type
                </label>
                <Select onValueChange={(value) => setValue("evidenceType", value)}>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Evidence Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hard drive">Hard Drive</SelectItem>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="computer">Computer</SelectItem>
                    <SelectItem value="cloud data">Cloud Data</SelectItem>
                    <SelectItem value="network logs">Network Logs</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-gray-700 font-medium">
                  Status
                </label>
                <Select onValueChange={(value) => setValue("status", value)}>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="priority" className="text-gray-700 font-medium">
                  Priority
                </label>
                <Select onValueChange={(value) => setValue("priority", value)}>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chain of Custody */}
            <div className="space-y-2">
              <label htmlFor="chainOfCustody" className="text-gray-700 font-medium">
                Chain Of Custody
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  type="text"
                  placeholder="Name of receiver"
                  {...register("chainOfCustodyReceivedBy")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          !chainOfCustodyDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {chainOfCustodyDate ? (
                          format(chainOfCustodyDate, "PPP")
                        ) : (
                          <span>Case Receive on</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={chainOfCustodyDate}
                        onSelect={setChainOfCustodyDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Input
                  type="text"
                  placeholder="Receive at"
                  {...register("chainOfCustodyLocation")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="text"
                  placeholder="Add any note"
                  {...register("chainOfCustodyNotes")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Tools Used */}
            <div className="space-y-2">
              <label htmlFor="toolsUsed" className="text-gray-700 font-medium">
                Tools Used
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  type="text"
                  placeholder="Name of Tool"
                  {...register("toolsUsedName")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="text"
                  placeholder="Version Used"
                  {...register("toolsUsedVersion")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="text"
                  placeholder="Add any note"
                  {...register("toolsUsedNotes")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Findings */}
            <div className="space-y-2">
              <label htmlFor="findings" className="text-gray-700 font-medium">
                Findings
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Textarea
                  placeholder="Type your summary here."
                  {...register("findingsSummary")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Textarea
                  placeholder="Type your details here."
                  {...register("findingsDetails")}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          !findingsDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {findingsDate ? (
                          format(findingsDate, "PPP")
                        ) : (
                          <span>Created at</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                         mode="single"
                        selected={findingsDate}
                        onSelect={setFindingsDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Created At and Updated At */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="createdAt" className="text-gray-700 font-medium">
                  Created At
                </label>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          !createdAtDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {createdAtDate ? (
                          format(createdAtDate, "PPP")
                        ) : (
                          <span>Created at</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={createdAtDate}
                        onSelect={setCreatedAtDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="updatedAt" className="text-gray-700 font-medium">
                  Updated At
                </label>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          !updatedAtDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {updatedAtDate ? (
                          format(updatedAtDate, "PPP")
                        ) : (
                          <span>Updated At</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={updatedAtDate}
                        onSelect={setUpdatedAtDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Create Case
              </button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddCase;
