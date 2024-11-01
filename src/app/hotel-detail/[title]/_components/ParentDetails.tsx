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
  MapPin,
  Plane,
  Star,
  Tv,
  Waves,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RoomDisplay from "./RoomDisplayer";
import { HotelType } from "@/types/hotels";
import { RoomsType } from "@/types/rooms";

export default function ParentDetails({
  hotel_detail,
  room_detail
}: {
  hotel_detail: HotelType;
  room_detail:RoomsType[]
}) {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkout = searchParams.get("checkout") ?? "";
  const searchRooms = searchParams.get("rooms") ?? 1;
  const searchChildren = searchParams.get("children") ?? 0;
  const searchAdults = searchParams.get("adults") ?? 1;

  const [dateRange, setDateRange] = useState<DateRange>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    from: checkIn ? (checkIn as any) : startOfToday(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    to: checkout ? (checkout as any) : addDays(startOfToday(), 1),
  });

  const [rooms, setRooms] = useState(searchRooms ? +searchRooms : 1);
  const [adults, setAdults] = useState(searchChildren ? +searchChildren : 1);
  const [children, setChildren] = useState(searchAdults ? +searchAdults : 0);

  console.log('hotel detail',hotel_detail)
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
            Let the journey begin
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/search-hotel?location_name=${hotel_detail?.country}`}
                >
                  {hotel_detail?.country}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{hotel_detail.city}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid gap-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-[2/1]">
            <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
              <Image
                alt="Hotel main view"
                className="object-cover"
                fill
                src={hotel_detail.images[0]}
              />
            </div>
            {hotel_detail.images.slice(1, 5).map((image, index) => (
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
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-primary text-primary text-yellow-400 " />
                <span className="ml-2 text-xl font-semibold">
                  {hotel_detail.ratings.total}
                </span>
                <span className="ml-2 text-muted-foreground">Excellent</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {hotel_detail.city}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {hotel_detail.about?.map((about, index: number) => {
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
              <h2 className="text-2xl font-bold mb-4">Hotel Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel_detail?.facilities?.map((facility) => {
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
                      ): (
                        ""
                      )}
                      {facility.name}
                    </div>
                  );
                })}
              </div>
            </div>

              <hr />
            <div>
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
            <hr />
            <RoomDisplay guest={{adult:adults,children:children, rooms:rooms}} dateRange={dateRange} room_detail={room_detail} hotel_detail={hotel_detail} />
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    <div className="text-xl font-bold">€150.00</div>
                    <div className="text-sm text-muted-foreground">/night</div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-primary text-primary text-yellow-500" />
                    <span className="ml-1">{hotel_detail.ratings.total}</span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({hotel_detail?.reviews?.length} reviews)
                    </span>
                  </div>
                </div>

                <div className="grid gap-4">
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
                  <Button className="w-full bg-black text-white hover:bg-black ">
                    Check availability
                  </Button>
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
    </Fragment>
  );
}
