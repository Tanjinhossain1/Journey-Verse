"use client";

import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, addMonths, startOfToday } from "date-fns";

export default function DateSelector({dateRange, setDateRange,isDetail}:{dateRange:DateRange,
  setDateRange:Dispatch<SetStateAction<DateRange>>  ,isDetail?:boolean}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const disabledDays = { before: startOfToday() };

  const handleDateSelect = useCallback((range: DateRange | undefined) => {
    if(range){
      setDateRange(range);
    }
  }, []);

  const handleMonthChange = useCallback((increment: number) => {
    setCurrentMonth((prev) => addMonths(prev, increment));
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={`flex-1 flex items-center px-4 py-2   border-gray-300 cursor-pointer ${isDetail ? 'border rounded-xl' :'border-b md:border-b-0 md:border-r'}`}>
          <Calendar className={`${isDetail ? "text-gray-600" :"text-gray-200"} dark:text-white mr-2`} />
          <Input
            className={`w-full border-none focus:ring-0 ${isDetail ? "text-gray-600" :"text-gray-200"}  dark:text-white cursor-pointer`}
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
              <ChevronLeft className="h-5 w-5 text-gray-200 dark:text-white" />
            </button>
            <div className="text-lg font-semibold">
              {format(currentMonth, "MMMM yyyy")} -{" "}
              {format(addMonths(currentMonth, 1), "MMMM yyyy")}
            </div>
            <button onClick={() => handleMonthChange(1)} type="button">
              <ChevronRight className="h-5 w-5 text-gray-200 dark:text-white" />
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
                "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white dark:focus:text-white rounded-full",
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
  );
}
