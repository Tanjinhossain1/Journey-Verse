/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users, Plus, Minus, PlusIcon } from "lucide-react";

export default function GuestSelector({
  drooms,
  dchildren,
  dadults,
  setDrooms,
  setDadults,
  setDchildren,
  isDetail
}: {
  drooms?: number;
  dchildren?: number;
  dadults?: number;
  setDchildren: any;
  setDadults: any;
  setDrooms: any;
  isDetail?: boolean;
}) {
  const [rooms, setRooms] = useState(drooms ? drooms : 1);
  const [adults, setAdults] = useState(dadults ? dadults : 1);
  const [children, setChildren] = useState(dchildren ? dchildren : 0);
  useEffect(() => {
    setDrooms(rooms);
    setDadults(adults);
    setDchildren(children);
  }, [rooms, children, adults, setDrooms, setDadults, setDchildren]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={`flex-1 flex items-center px-4 py-2 cursor-pointer ${isDetail? 'border': ''}`}>
          <Users className="text-gray-400 dark:text-white mr-2" />
          <Input
            className="w-full border-none focus:ring-0 text-black dark:text-white cursor-pointer"
            placeholder="Guests"
            value={`${rooms} room${rooms > 1 ? "s" : ""}, ${
              adults + children
            } guest${adults + children > 1 ? "s" : ""}`}
            readOnly
          />
          <PlusIcon className="text-black dark:text-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4 bg-white" align="start">
        <div className="space-y-4 bg-white dark:text-black">
          <div className="flex items-center justify-between">
            <span className="font-semibold dark:text-white">Rooms</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                disabled={rooms <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{rooms}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setRooms(rooms + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold dark:text-white">Adults</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                disabled={adults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{adults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdults(adults + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <span className="font-semibold">Children</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setChildren(Math.max(0, children - 1))}
                disabled={children <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{children}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setChildren(children + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
