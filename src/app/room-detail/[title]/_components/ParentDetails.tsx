"use client";
import DateSelector from "@/components/Common/DateSelector";
import GuestSelector from "@/components/Common/GuestSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addDays, startOfToday } from "date-fns";
import {
  AirVent,
  Car,
  Clock,
  Heater,
  Plane,
  Tv,
  Waves,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RoomsType } from "@/types/rooms";
import { HotelType } from "@/types/hotels";
import { formatForUrlWith_under_score, toISODateString } from "@/utils/utils";
import OtherRoomOptions from "./OtherOptions";
import Link from "next/link";
import { User } from "@/types/user";

export default function ParentDetails({
  room_detail,
  otherOptionRooms,
  hotel_detail,
  user,
}: {
  room_detail: RoomsType;
  otherOptionRooms: RoomsType[];
  hotel_detail: HotelType;
  user: User;
}) {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkout = searchParams.get("checkout") ?? "";
  const searchRooms = searchParams.get("rooms") ?? 1;
  const searchChildren = searchParams.get("children") ?? 0;
  const searchAdults = searchParams.get("adults") ?? 1;
  const [availabilityMessage, setAvailabilityMessage] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    from: checkIn ? (checkIn as any) : startOfToday(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    to: checkout ? (checkout as any) : addDays(startOfToday(), 1),
  });

  const [rooms, setRooms] = useState(searchRooms ? +searchRooms : 1);
  const [adults, setAdults] = useState(searchChildren ? +searchChildren : 1);
  const [children, setChildren] = useState(searchAdults ? +searchAdults : 0);
  // const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const CheckAvailability = async () => {
      const response = await fetch(
        `/api/check-available?checkIn=${dateRange?.from}&checkout=${dateRange?.to}&hotel_name=${hotel_detail?.title}&room_name=${room_detail?.title}`
      );
      const data = await response.json();

      if (data.available) {
        setAvailabilityMessage("Room is available");
      } else {
        setAvailabilityMessage(data.message); // "Room is already booked for the selected dates"
      }
    };

    // if (hasMounted && dateRange) {
    CheckAvailability();
    // } else {
    //   setHasMounted(true); // Set to true after the initial render
    // }
  }, [dateRange]);
  console.log("hotel detail", room_detail);
  return (
    <Fragment>
      <div className="relative  min-h-[200px] w-full overflow-hidden dark:border-b">
        <div className="absolute inset-0">
          <Image
            layout="fill"
            alt="Mountain landscape with a person in yellow jacket"
            className="w-full h-full object-cover"
            src="/journey-bg.jpeg"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col w-3/4 mx-auto md:mt-28 text-white px-4">
          <h1 className="text-4xl md:text-4xl font-bold mb-4 text-left">
            {room_detail.title}
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/hotel-detail/${formatForUrlWith_under_score(
                    hotel_detail?.title
                  )}`}
                >
                  {hotel_detail?.country}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{room_detail.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 dark:bg-gray-900 rounded-xl mt-2">
        {/* <div className="grid gap-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-[2/1]">
            <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
              <Image
                alt="Hotel main view"
                className="object-cover"
                fill
                src={room_detail.images[0]}
              />
            </div>
            {room_detail.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <Image
                  alt={`Hotel view ${index + 2}`}
                  className="object-cover"
                  fill
                  src={image}
                />
              </div>
            ))}
          </div> 
        </div> */}
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Main large image */}
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={room_detail.images[0]}
                alt="Historic villa exterior with bell tower"
                className="object-cover hover:scale-105 transition-transform duration-300"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>

            {room_detail.images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt="Aerial view of villa courtyard"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">
                About this Room
              </h2>
              <p className="text-muted-foreground whitespace-pre-line dark:text-gray-300">
                {room_detail.about?.map((about, index: number) => {
                  return (
                    <Fragment key={index}>
                      {about.detail}
                      <br />
                      <br />
                    </Fragment>
                  );
                })}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">
                Room Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 dark:text-gray-300">
                {room_detail?.facilities?.map((facility) => {
                  return (
                    <div
                      key={facility.name}
                      className="flex items-center gap-2"
                    >
                      {facility?.name === "Air Conditioning" ? (
                        <AirVent className="w-4 h-4" />
                      ) : facility?.name === "Heater" ? (
                        <Heater className="w-4 h-4" />
                      ) : facility?.name === "Heater" ? (
                        <Heater className="w-4 h-4" />
                      ) : facility?.name === "Washer & Dryer" ? (
                        <Waves className="w-4 h-4" />
                      ) : facility?.name === "Airport Transport" ? (
                        <Plane className="w-4 h-4" />
                      ) : facility?.name === "Free TV" ? (
                        <Tv className="w-4 h-4" />
                      ) : facility?.name === "Flat Tv" ? (
                        <Tv className="w-4 h-4" />
                      ) : facility?.name === "Spa & Sauna" ? (
                        <Wifi className="w-4 h-4" />
                      ) : facility?.name === "Restaurant" ? (
                        <Car className="w-4 h-4" />
                      ) : (
                        ""
                      )}
                      {facility.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="dark:text-gray-300" />
            <div className="dark:text-gray-300">
              <h2 className="text-2xl font-bold mb-4">Rules</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Check In
                  </div>
                  <span>12:00 pm</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Check Out
                  </div>
                  <span>12:00 pm</span>
                </div>
              </div>
            </div>
            <hr className="dark:text-gray-300" />
          </div>

          <div className="relative">
            <div className="space-y-4 dark:text-gray-300 sticky top-10">
              <Card className="rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4 dark:text-gray-300">
                    <div className="flex items-center">
                      <div className="text-2xl font-bold ">
                        $ {room_detail?.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        /night
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 dark:text-gray-300">
                    <DateSelector
                      isDetail
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                    />

                    <GuestSelector
                      isDetail
                      dadults={adults}
                      dchildren={children}
                      drooms={rooms}
                      setDadults={setAdults}
                      setDchildren={setChildren}
                      setDrooms={setRooms}
                    />
                    {availabilityMessage === "Room is available" ? (
                      <p className="text-sm text-green-600">
                        {availabilityMessage}
                      </p>
                    ) : (
                      <p className="text-sm text-red-600">
                        {availabilityMessage}
                      </p>
                    )}
                    {availabilityMessage === "Room is available" ? (
                      <Link
                        href={
                          user?.email
                            ? `/checkout/${formatForUrlWith_under_score(
                                room_detail.title
                              )}?checkIn=${toISODateString(
                                dateRange.from
                              )}&checkout=${toISODateString(
                                dateRange?.to
                              )}&adults=${adults}&rooms=${rooms}&children=${children}`
                            : "/login"
                        }
                      >
                        {user?.email ? null : (
                          <p className="text-sm text-red-500">
                            Required Login for Book:{" "}
                            <Link
                              href={"/login"}
                              className="text-blue-500 ml-1  "
                            >
                              Login
                            </Link>
                          </p>
                        )}
                        <Button className="w-full bg-black text-white hover:bg-black dark:bg-gray-300 dark:text-black ">
                          Book Now
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        className="w-full bg-black text-white hover:bg-black dark:bg-gray-300 dark:text-gray-700"
                      >
                        Book Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="w-full h-52 mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986652089463!3d40.69714942211053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1635786994961!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OtherRoomOptions rooms={otherOptionRooms} />
    </Fragment>
  );
}
