import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import toast from 'react-hot-toast';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios"
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


const AddCase = () => {
  const [date, setDate] = useState();
  const { register, handleSubmit, reset , setValue  } = useForm();
  

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    console.log(token)
    console.log(data)
    // data.receivedDate = date ? format(date, "yyyy-MM-dd") : null;

    // Create FormData to handle file uploads
    try {
      const response = await axios.post(
        "http://localhost:4001/cases/createCase", 
        data,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        if (response.data) {
        toast.success("Case successfully created!");
        reset();
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error message:", error.message);
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="mt-28 ml-28 text-[1.3rem] w-[85vw]  ">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-[2.3rem] ml-8 font-bold text-center ">Add Case</h1>
            </CardTitle>
            <CardDescription>
              <p className="text-[1.2rem] ml-8 text-center text-gray-500 "> 
                Add new forensic cases and ensure all relevant details are
                accurately captured
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col placeholder-gray-800 ">
                <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                  Title of Case
                </label>
                <Input 
                id="title" 
                  type="text"
                  placeholder="Title "
                  {...register("title")}
                  className="w-[70vw] ml-6 mt-5 text-[1.1rem] border-2 border-gray-400  text-gray-800"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                  Description of Case
                </label>
                <Textarea
                {...register("description")}
                  placeholder="Type your description here."
                  className="border-2 border-gray-400  text-gray-800 text-[1.1rem] h-10 mt-3 ml-6 w-[70vw] pl-5 rounded-md"
                />
              </div>
              <div className="flex flex-row text-[1.1rem]">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                    Evidence Type
                  </label>
                  <Select onValueChange={(value) => setValue("evidenceType", value)} >
                    <SelectTrigger className="h-10 mt-3 ml-6 w-80 pl-5 rounded-md border-2 border-gray-400  text-gray-800 ">
                      <SelectValue placeholder="Evidence Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem  {...register("evidenceType")}  value="hard drive">Hard Drive</SelectItem>
                      <SelectItem  {...register("evidenceType")}  value="smartphone">Smartphone</SelectItem>
                      <SelectItem  {...register("evidenceType")}  value="computer">Computer</SelectItem>
                      <SelectItem  {...register("evidenceType")}  value="cloud data">Cloud Data</SelectItem>
                      <SelectItem  {...register("evidenceType")}  value="network logs">Network Logs</SelectItem>
                      <SelectItem  {...register("evidenceType")}  value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                    Status
                  </label>
                  <Select  onValueChange={(value) => setValue("status", value)} >
                    <SelectTrigger className="h-10 mt-3 ml-6  w-80 pl-5 rounded-md border-2 border-gray-400  text-gray-800">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem {...register("status")} value="pending">Pending</SelectItem>
                      <SelectItem {...register("status")} value="in_progress">In Progress</SelectItem>
                      <SelectItem {...register("status")} value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                    Priority
                  </label>
                  <Select>
                    <SelectTrigger className="h-10 mt-3 ml-6  w-80 pl-5 rounded-md border-2 border-gray-400  text-gray-800">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem {...register("priority")} value="low">Low</SelectItem>
                      <SelectItem {...register("priority")} value="medium">Medium</SelectItem>
                      <SelectItem {...register("priority")} value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                  Chain Of Custody
                </label>
                <div className="flex flex-row">
                  <div className="flex">
                    <Input
                    {...register("chainOfCustody.receivedBy")}
                      type="text"
                      placeholder="Name of receiver"
                      className=" w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400  text-gray-800"
                    />
                  </div>
                  <div className="flex ml-6 mt-5 border-2 border-gray-400  text-gray-800">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] text-[1.1rem]  justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Case Receive on</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="">
                    <Input
                    {...register("chainOfCustody.location")}
                      type="text"
                      placeholder="receive at"
                      className=" w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400  text-gray-800"
                    />
                  </div>
                  <div className="">
                    <Input
                     {...register("chainOfCustody.notes")}
                      type="text"
                      placeholder="What to add any Note"
                      className=" w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400  text-gray-800"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                  Tools Use
                </label>
                <div className="flex flex-row">
                  <div className="flex">
                    <Input
                    {...register("chainOfCustody.name")}
                      type="text"
                      placeholder="Name of Tool"
                      className=" w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400  text-gray-800"
                    />
                  </div>
                  <div className="">
                    <Input
                    {...register("chainOfCustody.version")}
                      type="text"
                      placeholder="Version Use"
                      className=" w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400  text-gray-800"
                    />
                  </div>
                  <div className="">
                    <Input
                    {...register("chainOfCustody.notes")}
                      type="text"
                      placeholder="What to add any Note"
                      className=" w-64 ml-6 mt-5 text-[1.1rem] border-2 border-gray-400  text-gray-800"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-gray-500 ml-6 mt-5 ">
                  Finding
                </label>
                <div className="flex flex-row">
                  <div className="flex">
                    <Textarea
                    {...register("chainOfCustody.summary")}
                      placeholder="Type your summary  here."
                      className=" text-[1.1rem] border-2 border-gray-400  text-gray-800 h-10 mt-3 ml-6 w-80 pl-5 rounded-md"
                    />
                  </div>
                  <div className="">
                    <Textarea
                    {...register("chainOfCustody.details")}
                      placeholder="Type your details  here."
                      className=" text-[1.1rem] border-2 border-gray-400  text-gray-800 h-10 mt-3 ml-6 w-80 pl-5 rounded-md"
                    />
                  </div> 
                  <div className="">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] ml-10 mt-5 text-[1.1rem]  justify-start text-left font-normal",
                            !date && "text-muted-foreground border-2 border-gray-400  text-gray-800"
                          )}
                        >
                          <CalendarIcon />
                          {date ? format(date, "PPP") : <span>Created at</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500 ml-6 mt-5">
                    Created At
                  </label>
                  <div className="">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] ml-7 mt-5 text-[1.1rem]  justify-start text-left font-normal",
                            !date && "text-muted-foreground border-2 border-gray-400  text-gray-800"
                          )}
                        >
                          <CalendarIcon />
                          {date ? format(date, "PPP") : <span>Created at</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-gray-500 ml-6 mt-5 ">
                    Update At
                  </label>
                  <div className="">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] ml-7 mt-5 text-[1.1rem]  justify-start text-left font-normal",
                            !date && "text-muted-foreground border-2 border-gray-400  text-gray-800"
                          )}
                        >
                          <CalendarIcon />
                          {date ? format(date, "PPP") : <span>Update At</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

            <button type="submit" className="btn dark:bg-[#001845] btn-active bg-[#00b4d8] text-white  ml-6 text-[1.2rem] w-44 mt-10">Create Case</button>
            <button className="btn dark:bg-[#001845] btn-active bg-[#00b4d8] text-white ml-6 text-[1.2rem] w-44 mt-10"><a href="/dashboard/ManageCase">Manage Case</a></button>

            </form>
          </CardContent>
          <CardFooter>
  </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AddCase;
