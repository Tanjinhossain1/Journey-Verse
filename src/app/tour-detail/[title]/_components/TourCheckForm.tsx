"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Star } from "lucide-react";
import { TourTypes } from "@/types/tours";
import Link from "next/link";
import { formatForUrlWith_under_score, toISODateString } from "@/utils/utils";
import { User } from "@/types/user";
import { useSearchParams } from "next/navigation";

export default function TourChecker({
  tour_detail,
  bookingStatus,
  user
}: {
  tour_detail: TourTypes;
  bookingStatus: boolean;
  user:User
}) {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");

  const [date, setDate] = React.useState<Date | undefined>(checkIn ? checkIn as any : new Date());
  const [adults, setAdults] = React.useState<number>(1);
  const [children, setChildren] = React.useState<number>(0);

  const basePrice = +tour_detail.price * 1.06;
  const childrenPrice = (basePrice / 2) * children;
  const total = adults * basePrice + childrenPrice;

  const handleAdultsChange = (increment: boolean) => {
    setAdults((prev) => (increment ? prev + 1 : Math.max(0, prev - 1)));
  };

  const handleChildrenChange = (increment: boolean) => {
    setChildren((prev) => (increment ? prev + 1 : Math.max(0, prev - 1)));
  };

  return (
    <Card className="w-[320px] border border-gray-400 rounded-xl dark:text-gray-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">From:</span>
            <span className="text-lg font-semibold">
              €{basePrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium">5</span>
            <span className="text-sm text-muted-foreground">(3 Reviews)</span>
          </div>
        </div>

        <div className="space-y-4 border border-gray-400 rounded-xl p-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">Adults</span>
                <span className="text-sm text-muted-foreground">Over 18+</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={adults === 1 ? true : false}
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleAdultsChange(false)}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease adults</span>
                </Button>
                <span className="w-4 text-center">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleAdultsChange(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase adults</span>
                </Button>
              </div>
            </div>
            <hr className="text-gray-500" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">Children</span>
                <span className="text-sm text-muted-foreground">Under 12</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleChildrenChange(false)}
                  disabled={children === 0 ? true : false}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease children</span>
                </Button>
                <span className="w-4 text-center">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleChildrenChange(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase children</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">€{total.toFixed(2)}</span>
          </div>
          {bookingStatus ? (
            <p className="text-red-400">This Tour Already Booked By You</p>
          ) : null}
          {user?.email ? null : (
            <p className="text-sm text-red-500">
              Required Login for Book:{" "}
              <Link href={"/login"} className="text-blue-500 ml-1  ">
                Login
              </Link>
            </p>
          )}
          <Link
            href={`/checkout/tour/${formatForUrlWith_under_score(
              tour_detail?.title
            )}?checkIn=${toISODateString(
              date
            )}&children=${children}&adults=${adults}&total_amount=${total}`}
          >
            <Button
              disabled={bookingStatus ? true : user?.email ? false : true}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Book now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
