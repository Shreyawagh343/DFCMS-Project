import React from 'react'
import { useState } from 'react'
import {
    ArrowUpCircle,
    CheckCircle2,
    HelpCircle,
    XCircle,
  } from "lucide-react"
  import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import TableCase from './TableCase'

const ManageCase = () => {
    const statuses = [
      {
        value: "Pending",
        label: "Pending",
        icon: HelpCircle,
      },
      {
        value: "in progress",
        label: "In Progress",
        icon: ArrowUpCircle,
      },
      {
        value: "Completed",
        label: "Done",
        icon: CheckCircle2,
      },
      {
        value: "canceled",
        label: "Canceled",
        icon: XCircle,
      },
    ];
    
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
  
    return (
      <>
        <div className="mt-12 dark:bg-slate-900 dark:text-white">
          <h1 className='text-3xl font-bold ml-28'>Welcome Back!</h1>
          <p className='text-1xl text-gray-500 ml-28'>Here's a list of your tasks for this month!</p>
          <div className="flex">
            <input type="text" placeholder="Search Case" className="input input-bordered w-[25rem] ml-28 mr-7 mt-6" />
            <div className="flex items-center space-x-4 ml-4">
              <p className="text-[1.2rem] text-muted-foreground mt-4">Status</p>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="w-[15rem] h-10 mt-5 justify-start">
                    {selectedStatus ? (
                      <>
                        <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                        {selectedStatus.label}
                      </>
                    ) : (
                      <>+ Set status</>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                  <Command>
                    <CommandInput placeholder="Status" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {statuses.map((status) => (
                          <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                              setSelectedStatus(statuses.find((s) => s.value === value) || null);
                              setOpen(false);
                            }}
                          >
                            <status.icon
                              className={cn(
                                "mr-2 h-4 w-4",
                                status.value === selectedStatus?.value ? "opacity-100" : "opacity-40"
                              )}
                            />
                            <span>{status.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
           <div className="ml-[28rem] -mt-14">
            </div>    
          </div>
          <div className="ml-24 mt-7">
            <TableCase/>
          </div>
        </div>
      </>
    );
  };
  

export default ManageCase