import React, { useState } from 'react';
import { ArrowUpCircle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TableCase from './TableCase';

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
    <div className="mt-12 mx-auto max-w-7xl px-6 py-8 dark:bg-gray-900 rounded-lg ">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-left">
        Welcome Back!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-left">
        Here's a list of your tasks for this month!
      </p>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search Case"
          className="input input-bordered flex-grow px-5 py-3 text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        />
        <div className="flex items-center space-x-4">
          <p className="text-xl text-gray-700 dark:text-gray-300">Status</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-56 h-12 justify-start text-gray-800 dark:text-white dark:border-gray-600 rounded-full"
              >
                {selectedStatus ? (
                  <>
                    <selectedStatus.icon className="mr-2 h-5 w-5 shrink-0" />
                    {selectedStatus.label}
                  </>
                ) : (
                  <>+ Set status</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="right" align="start">
              <Command>
                <CommandInput placeholder="Search status..." />
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
                            "mr-2 h-5 w-5",
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
      </div>
      <div className="mt-8">
        <TableCase />
      </div>
    </div>
  );
};

export default ManageCase;
