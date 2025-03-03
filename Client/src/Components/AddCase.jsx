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
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import SideDrawer from "./SideDrawer";

const AddCase = () => {
  const [chainOfCustodyDate, setChainOfCustodyDate] = useState();
  const [findingsDate, setFindingsDate] = useState();
  const [createdAtDate, setCreatedAtDate] = useState();
  const [updatedAtDate, setUpdatedAtDate] = useState();
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    const token = localStorage.getItem("authtoken");

    // Check if the user is authenticated
    if (!token) {
      toast.error("You must be logged in to create a case.");
      navigate("/login"); // Redirect to login page
      return;
    }

    // Format dates
    data.chainOfCustody = [
      {
        receivedBy: data.chainOfCustodyReceivedBy,
        dateReceived: chainOfCustodyDate ? format(chainOfCustodyDate, "yyyy-MM-dd") : null,
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
        addedBy: JSON.parse(localStorage.getItem("users")).officerCode, // Use the authenticated user's ID
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
        toast.success("Case successfully created!");
        reset();
       // Redirect to Manage Case page
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 401) {
          toast.error("Unauthorized: Please log in again.");
          navigate("/loginhome"); // Redirect to login page if unauthorized
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
    <>
      <div className="mt-28 ml-28 text-[1.3rem] w-[85vw]">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-[2.3rem] ml-8 font-bold text-center">Add Case</h1>
            </CardTitle>
            <CardDescription>
              <p className="text-[1.2rem] ml-8 text-center text-gray-500">
                Add new forensic cases and ensure all relevant details are
                accurately captured
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title */}
              <div className="flex flex-col placeholder-gray-800">
                <label htmlFor="title" className="text-gray-500 ml-6 mt-5">
                  Title of Case
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Title"
                  {...register("title")}
                  className="w-[70vw] ml-6 mt-5 text-[1.1rem] border-2 border-gray-400 text-gray-800"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-500 ml-6 mt-5">
                  Description of Case
                </label>
                <Textarea
                  id="description"
                  placeholder="Type your description here."
                  {...register("description")}
                  className="border-2 border-gray-400 text-gray-800 text-[1.1rem] h-10 mt-3 ml-6 w-[70vw] pl-5 rounded-md"
                />
              </div>

              {/* Evidence Type, Status, Priority */}
              <div className="flex flex-row text-[1.1rem]">
                <div className="flex flex-col">
                  <label htmlFor="evidenceType" className="text-gray-500 ml-6 mt-5">
                    Evidence Type
                  </label>
                  <Select onValueChange={(value) => setValue("evidenceType", value)}>
                    <SelectTrigger className="h-10 mt-3 ml-6 w-80 pl-5 rounded-md border-2 border-gray-400 text-gray-800">
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

                <div className="flex flex-col">
                  <label htmlFor="status" className="text-gray-500 ml-6 mt-5">
                    Status
                  </label>
                  <Select onValueChange={(value) => setValue("status", value)}>
                    <SelectTrigger className="h-10 mt-3 ml-6 w-80 pl-5 rounded-md border-2 border-gray-400 text-gray-800">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="priority" className="text-gray-500 ml-6 mt-5">
                    Priority
                  </label>
                  <Select onValueChange={(value) => setValue("priority", value)}>
                    <SelectTrigger className="h-10 mt-3 ml-6 w-80 pl-5 rounded-md border-2 border-gray-400 text-gray-800">
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
              <div className="flex flex-col">
                <label htmlFor="chainOfCustody" className="text-gray-500 ml-6 mt-5">
                  Chain Of Custody
                </label>
                <div className="flex flex-row">
                  <Input
                    type="text"
                    placeholder="Name of receiver"
                    {...register("chainOfCustodyReceivedBy")}
                    className="w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400 text-gray-800"
                  />
                  <div className="flex ml-6 mt-5 border-2 border-gray-400 text-gray-800">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] text-[1.1rem] justify-start text-left font-normal",
                            !chainOfCustodyDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {chainOfCustodyDate ? format(chainOfCustodyDate, "PPP") : <span>Case Receive on</span>}
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
                    className="w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400 text-gray-800"
                  />
                  <Input
                    type="text"
                    placeholder="Add any note"
                    {...register("chainOfCustodyNotes")}
                    className="w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Tools Used */}
              <div className="flex flex-col">
                <label htmlFor="toolsUsed" className="text-gray-500 ml-6 mt-5">
                  Tools Used
                </label>
                <div className="flex flex-row">
                  <Input
                    type="text"
                    placeholder="Name of Tool"
                    {...register("toolsUsedName")}
                    className="w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400 text-gray-800"
                  />
                  <Input
                    type="text"
                    placeholder="Version Used"
                    {...register("toolsUsedVersion")}
                    className="w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400 text-gray-800"
                  />
                  <Input
                    type="text"
                    placeholder="Add any note"
                    {...register("toolsUsedNotes")}
                    className="w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* Findings */}
              <div className="flex flex-col">
                <label htmlFor="findings" className="text-gray-500 ml-6 mt-5">
                  Findings
                </label>
                <div className="flex flex-row">
                  <Textarea
                    placeholder="Type your summary here."
                    {...register("findingsSummary")}
                    className="text-[1.1rem] border-2 border-gray-400 text-gray-800 h-10 mt-3 ml-6 w-80 pl-5 rounded-md"
                  />
                  <Textarea
                    placeholder="Type your details here."
                    {...register("findingsDetails")}
                    className="text-[1.1rem] border-2 border-gray-400 text-gray-800 h-10 mt-3 ml-6 w-80 pl-5 rounded-md"
                  />
                  <div className="ml-10 mt-5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] text-[1.1rem] justify-start text-left font-normal",
                            !findingsDate && "text-muted-foreground border-2 border-gray-400 text-gray-800"
                          )}
                        >
                          <CalendarIcon />
                          {findingsDate ? format(findingsDate, "PPP") : <span>Created at</span>}
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
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <label htmlFor="createdAt" className="text-gray-500 ml-6 mt-5">
                    Created At
                  </label>
                  <div className="ml-7 mt-5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] text-[1.1rem] justify-start text-left font-normal",
                            !createdAtDate && "text-muted-foreground border-2 border-gray-400 text-gray-800"
                          )}
                        >
                          <CalendarIcon />
                          {createdAtDate ? format(createdAtDate, "PPP") : <span>Created at</span>}
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

                <div className="flex flex-col">
                  <label htmlFor="updatedAt" className="text-gray-500 ml-6 mt-5">
                    Updated At
                  </label>
                  <div className="ml-7 mt-5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] text-[1.1rem] justify-start text-left font-normal",
                            !updatedAtDate && "text-muted-foreground border-2 border-gray-400 text-gray-800"
                          )}
                        >
                          <CalendarIcon />
                          {updatedAtDate ? format(updatedAtDate, "PPP") : <span>Updated At</span>}
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
              <div className="flex flex-row">
                <button
                  type="submit"
                  className="btn dark:bg-[#001845] btn-active bg-[#00b4d8] text-white ml-6 text-[1.2rem] w-44 mt-10"
                >
                  Create Case
                </button>
              </div>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <SideDrawer/>
      </div>
    </>
  );
};

export default AddCase;