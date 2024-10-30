'use client'
import DateSelector from "@/components/Common/DateSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addDays, startOfToday } from "date-fns";
import {
  AirVent,
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
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function ParentDetails() {
    
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfToday(),
    to: addDays(startOfToday(), 1),
  });

  const hotel = {
    id: 1,
    title: "Luxury Resort & Spa",
    displayImage: "/Nevada.jpeg",
    price: 150,
    images: [
      "/Nevada.jpeg",
      "/Nevada.jpeg",
      "/Nevada.jpeg",
      "/Nevada.jpeg",
      "/Nevada.jpeg",
    ],
    ratings: {
      total: 8.5,
      specific: [
        { cleanliness: "5" },
        { accuracy: "5" },
        { Communication: "5" },
        { Location: "5" },
        { CheckIn: "5" },
        { Value: "5" },
      ],
      facilities: [
        { name: "Free WiFi" },
        { name: "Pool" },
        { name: "Parking" },
      ],
    },
    about: `Whether you're a tourist or traveling on business, our hotel is a great choice for accommodation when visiting New York City. The excitement of the city center is only steps away. With its convenient location, the property offers easy access to the city's must-see destinations.

    We are renowned for our attentive service and friendly staff, and we'll live up to your expectations. Facilities like free Wi-Fi in all rooms, 24-hour security, daily housekeeping, laundromat, taxi service are readily available for the convenience of each guest.

    Experience high-quality room facilities during your stay here. Some rooms include humidifier, complimentary tea, towels, clothes rack, slippers to help guests recharge after a long day. The property's host of recreational offerings ensures you have plenty to do during your stay.`,
  };

  
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid gap-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-[2/1]">
          <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
            <Image
              alt="Hotel main view"
              className="object-cover"
              fill
              src={hotel.images[0]}
            />
          </div>
          {hotel.images.slice(1, 5).map((image, index) => (
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
                {hotel.ratings.total}
              </span>
              <span className="ml-2 text-muted-foreground">Excellent</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              New York City
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {hotel.about}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Hotel Facilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <AirVent className="w-4 h-4" />
                Air Conditioning
              </div>
              <div className="flex items-center gap-2">
                <Heater className="w-4 h-4" />
                Heater
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4" />
                Washer & Dryer
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Airport Transport
              </div>
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4" />
                Free TV
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                Spa & Sauna
              </div>
            </div>
          </div>

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
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold">€150.00</div>
                  <div className="text-sm text-muted-foreground">/night</div>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="ml-1">{hotel.ratings.total}</span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    (5 reviews)
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                 <DateSelector isDetail dateRange={dateRange} setDateRange={setDateRange} />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Guests</label>
                  <Button variant="outline" className="w-full justify-start">
                    1 guest, 1 room
                  </Button>
                </div>
                <Button className="w-full bg-black text-white">Check availability</Button>
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
  );
}
