"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  PlusIcon,
} from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import {
  format,
  addMonths,
  startOfToday,
} from "date-fns";
import Image from "next/image";

const countries = [
  {
    country: "United States",
    city: [
      "California",
      "San Francisco",
      "Los Angeles",
      "Nevada",
      "New York City",
      "New Jersey",
      "Viriginia",
    ],
  },
];

export default function Component() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const disabledDays = { before: startOfToday() };

  const handleDateSelect = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  const handleMonthChange = useCallback((increment: number) => {
    setCurrentMonth((prev) => addMonths(prev, increment));
  }, []);

  return (
    <div className="relative  min-h-[400px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
        width={20}
        height={20}
        layout="responsive"
          alt="Mountain landscape with a person in yellow jacket"
          className="w-full h-full object-cover"
          src="/journey-bg.jpeg"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center md:mt-40  text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Let the journey begin
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Get the best prices on 2,000,000+ properties, worldwide
        </p>
        <nav className="mb-4 mt-10">
          <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            {[
              "Hotel",
              "Tours",
              "Activity",
              "Rental",
              "Cars Rental",
              "Car Transfer",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline font-bold">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="w-full max-w-4xl bg-white rounded-md overflow-hidden shadow-lg mb-2">
          <form className="flex flex-col md:flex-row">
            <Popover>
              <PopoverTrigger asChild>
                <div className="md:flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 cursor-pointer">
                  <MapPin className="text-gray-400 mr-2" />
                  <Input
                    className="w-full border-none focus:ring-0 text-black cursor-pointer"
                    placeholder="Where are you going?"
                    value={selectedCountry || ""}
                    readOnly
                  />
                  <ChevronDown className="text-gray-400 ml-2" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                <div className="max-h-[300px] overflow-auto">
                  {countries.map((country) => (
                    <div
                      key={country?.country}
                      className="px-4 py-2 hover:bg-gray-100  "
                    >
                      <Button
                        onClick={() => setSelectedCountry(country.country)}
                        className="font-bold"
                      >
                        {" "}
                        {country.country}
                      </Button>
                      {country?.city?.map((city) => {
                        return (
                          <Button
                            key={city}
                            className="ml-3"
                            onClick={() => setSelectedCountry(city)}
                          >
                            {city}
                          </Button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 cursor-pointer">
                  <Calendar className="text-gray-400 mr-2" />
                  <Input
                    className="w-full border-none focus:ring-0 text-black cursor-pointer"
                    placeholder="Check in - Check out"
                    value={
                      dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                            dateRange.to,
                            "dd/MM/yyyy"
                          )}`
                        : ""
                    }
                    readOnly
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={() => handleMonthChange(-1)} type="button">
                      <ChevronLeft className="h-5 w-5 text-gray-500" />
                    </button>
                    <div className="text-lg font-semibold">
                      {format(currentMonth, "MMMM yyyy")} -{" "}
                      {format(addMonths(currentMonth, 1), "MMMM yyyy")}
                    </div>
                    <button onClick={() => handleMonthChange(1)} type="button">
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelect}
                    numberOfMonths={1}
                    
                    month={currentMonth}
                    disabled={disabledDays}
                    className="custom-day-picker"
                    classNames={{
                      months: "flex space-x-4",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button:
                        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell:
                        "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal",
                      day_range_end: "day-range-end",
                      day_selected:
                        "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-full",
                      day_today: "bg-gray-100 text-gray-900",
                      day_outside: "text-gray-400 opacity-50  ",
                      day_disabled: "text-gray-400 opacity-50",
                      day_range_middle: "day-range-middle",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex-1 flex items-center px-4 py-2 cursor-pointer">
                  <Users className="text-gray-400 mr-2" />
                  <Input
                    className="w-full border-none focus:ring-0 text-black cursor-pointer"
                    placeholder="Guests"
                    value={`${rooms} room${rooms > 1 ? "s" : ""}, ${
                      adults + children
                    } guest${adults + children > 1 ? "s" : ""}`}
                    readOnly
                  />
                  <PlusIcon className="text-black" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-4 bg-white" align="start">
                <div className="space-y-4 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Rooms</span>
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
                    <span className="font-semibold">Adults</span>
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
            <Button
              className="m-2 px-8 bg-black rounded hover:bg-blue-950"
              type="submit"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
