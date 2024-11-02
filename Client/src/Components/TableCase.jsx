import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState , useEffect } from "react";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TableCase = () => {
    const [Caseinformation, setCaseinformation] = useState([]);
    const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          axios.get("http://localhost:4001/cases/AllCase")
            .then((response) => {
                setCaseinformation(response.data || []);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching payments:', error);
              setLoading(false);
            });
        }, []);
        
        if (loading) return <p>Loading...</p>;
  return (
    <>

      <div className="overflow-x-auto">
        <table className="table text-[1.1rem]">
          {/* head */}
          <thead>
            <tr>
              <th>Task</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Details</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {Caseinformation.map((cases) => (
              <tr key={cases.createdBy}>
                <th>
                  <label className="flex">
                    <input type="checkbox" className="checkbox" />
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
                <th>
                  {/* Details Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger>Open</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </th>
                <th>
                  {/* Edit Sheet */}
                  <Sheet>
                    <SheetTrigger>Edit</SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="">Title</label>
                          <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="">Status</label>
                          <Input id="status" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="">Priority</label>
                          <Input id="priority" className="col-span-3" />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">Save changes</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </th>
    
              </tr>
          ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
};

export default TableCase;
