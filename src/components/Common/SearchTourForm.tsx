"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, ChevronDown, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { toISODateString } from "@/utils/utils";
import { getCity } from "@/services/cities";
import { CityType } from "@/types/city";

export default function SearchTourForm({
  defaultDate,
  location_name,
}: {
  location_name?: string;
  defaultDate?: Date;
}) {
  const [countries, setCountries] = useState<CityType[]>([]);
  const [date, setDate] = useState<Date | undefined>(
    defaultDate ? defaultDate : new Date()
  );

  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    location_name ? location_name : null
  );

  React.useEffect(() => {
    const countries = async () => {
      const country = await getCity();
      setCountries(country);
    };
    countries();
  }, []);

  return (
    <div className=" max-w-4xl bg-white dark:bg-black dark:border-2 dark:border-gray-600 dark:text-white border rounded-md overflow-hidden shadow-lg mb-2">
      <form className="flex flex-col md:flex-row">
        <Popover>
          <PopoverTrigger asChild>
            <div className="md:flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 cursor-pointer">
              <MapPin className="text-gray-400 dark:text-white mr-2" />
              <Input
                className="w-full border-none focus:ring-0 text-black dark:text-white cursor-pointer"
                placeholder="Where are you going?"
                value={selectedCountry || ""}
                readOnly
              />
              <ChevronDown className="text-gray-400 dark:text-white ml-2" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[200px] p-0 bg-white dark:bg-black"
            align="start"
          >
            <div className="max-h-[300px] overflow-auto">
              {countries.map((country) => (
                <Button
                  key={country.city}
                  className="ml-3"
                  onClick={() => setSelectedCountry(country.city)}
                >
                  {country.city}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " text-black mt-2 border-0 hover:text-black justify-start text-left font-normal dark:text-gray-300 dark:hover:text-gray-300",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-black dark:text-gray-300 dark:hover:text-gray-300" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="text-black hover:text-black dark:text-gray-300 dark:hover:text-gray-300">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-white text-black"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) =>
                date.getTime() < new Date().setHours(0, 0, 0, 0)
              }
              className="aria-selected:bg-red-200"
            />
          </PopoverContent>
        </Popover>

        <Link
          href={`/search-tours?location_name=${
            selectedCountry ? selectedCountry : ""
          }&checkIn=${toISODateString(date)}`}
        >
          <Button className="m-2 px-8 bg-black    dark:border-l dark:border-white dark:bg-gray-200 dark:text-black rounded hover:bg-blue-950">
            Search
          </Button>
        </Link>
      </form>
    </div>
  );
}
