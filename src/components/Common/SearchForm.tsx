"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MapPin,
  ChevronDown,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { startOfToday, addDays } from "date-fns";
import Link from "next/link";
import DateSelector from "./DateSelector";
import GuestSelector from "./GuestSelector";
import { toISODateString } from "@/utils/utils";

export const countries = [
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

export default function SearchForm({defaultDate,defaultGuest,location_name}:{location_name?:string,defaultDate?: DateRange,defaultGuest?:{rooms:number,adults:number,children:number}}) {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDate ? defaultDate :{
    from: startOfToday(),
    to: addDays(startOfToday(), 1),
  });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(location_name ? location_name : null);
  const [rooms, setRooms] = useState(defaultGuest?.rooms ? defaultGuest?.rooms : 1);
  const [adults, setAdults] = useState(defaultGuest?.adults ? defaultGuest?.adults : 1);
  const [children, setChildren] = useState(defaultGuest?.children ? defaultGuest?.children :0);
  console.log(' searching ',defaultGuest)
  return (
    // <div className="w-full bg-opacity-75 max-w-4xl bg-white dark:bg-black dark:border-2 dark:border-gray-600 dark:text-white border rounded-md overflow-hidden shadow-lg mb-2">
      <div className="text-white w-full max-w-4xl bg-white/30 dark:bg-black/30 dark:border-2 dark:border-gray-600 dark:text-white   rounded-xl overflow-hidden shadow-lg mb-2 backdrop-blur-md">

      <form className="flex flex-col md:flex-row ">
        <Popover>
          <PopoverTrigger asChild>
            <div className="md:flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 cursor-pointer">
              <MapPin className="text-gray-200 dark:text-white mr-2" />
              <Input
                className="w-full border-none text-gray-200 focus:ring-0   dark:text-white cursor-pointer"
                placeholder="Where are you going?"
                value={selectedCountry || ""}
                readOnly
              />
              <ChevronDown className="text-gray-200 dark:text-white ml-2" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[200px] p-0 bg-white dark:bg-black"
            align="start"
          >
            <div className="max-h-[300px] overflow-auto">
              {countries.map((country) => (
                <div key={country?.country} className="px-4 py-2   ">
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
        <DateSelector dateRange={dateRange} setDateRange={setDateRange} />
        <GuestSelector dadults={adults} dchildren={children} drooms={rooms} setDadults={setAdults} setDchildren={setChildren} setDrooms={setRooms} />
       
        <Link
          href={`/search-hotel?location_name=${
            selectedCountry ? selectedCountry : ""
          }&checkIn=${toISODateString(dateRange?.from)}&checkout=${
            toISODateString(dateRange?.to)
          }&adults=${adults}&rooms=${rooms}&children=${children}`}
        >
          <Button className="m-2 px-8 bg-black    dark:border-l dark:border-white dark:bg-gray-200 dark:text-black rounded hover:bg-blue-950">
            Search
          </Button>
        </Link>
      </form>
    </div>
  );
}
