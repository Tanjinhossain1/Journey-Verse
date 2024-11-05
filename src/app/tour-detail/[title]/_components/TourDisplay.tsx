"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ChevronUp, Clock, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TourTypes } from "@/types/tours";
import Reviews from "@/app/hotel-detail/[title]/_components/Reviews";
import { Progress } from "@radix-ui/react-progress";
import TourChecker from "./TourCheckForm";
import { User } from "@/types/user";
import { getTheTourBookingStatus } from "@/services/tours";

export default function TourDisplay({
  tourDetails,
  user,
}: {
  tourDetails: TourTypes;
  user: User;
}) {
  const [openDay, setOpenDay] = useState(1);
  const [openFaq, setOpenFaq] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<boolean>(false);
  useEffect(() => {
    if (user?.email) {
      const BookingStatus = async () => {
        const tourDetailsBookingStatus = await getTheTourBookingStatus(
          tourDetails.title,
          user?.email
        );
        if(tourDetailsBookingStatus && tourDetailsBookingStatus[0] && tourDetailsBookingStatus[0]?.email && tourDetailsBookingStatus[0]?.email === user?.email){
          setBookingStatus(true)
        }
      };
      BookingStatus()
    }
  });
  return (
    <div className="md:max-w-6xl mx-auto p-4 space-y-8 dark:bg-gray-900">
      {/* Gallery Grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main large image */}
          <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={tourDetails.images[0]}
              alt="Historic villa exterior with bell tower"
              className="object-cover hover:scale-105 transition-transform duration-300"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>

          {tourDetails.images.slice(1, 5).map((image, index) => (
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
      <div className="grid lg:grid-cols-[1fr_400px] gap-4 relative">
        <div>
          {" "}
          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 dark:border-gray-600 text-gray-700">
              <div className="text-sm   dark:text-gray-400 text-gray-700">
                Duration
              </div>
              <div className="font-medium dark:text-white">
                {tourDetails.totalDuration}
              </div>
            </div>
            <div className="border rounded-lg p-4 dark:border-gray-700 text-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Tour Type
              </div>
              <div className="font-medium dark:text-white">
                {tourDetails.tourType}
              </div>
            </div>
            <div className="border rounded-lg p-4 dark:border-gray-700 text-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Group Size
              </div>
              <div className="font-medium dark:text-white">
                {tourDetails.groupSize}
              </div>
            </div>
            <div className="border rounded-lg p-4 dark:border-gray-700 text-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Languages
              </div>
              <div className="font-medium dark:text-white text-gray-700">
                {tourDetails?.languages[0].lang},{" "}
                {tourDetails?.languages.length >= 1
                  ? tourDetails?.languages[1].lang
                  : null}
              </div>
            </div>
          </div>
          {/* About this tour */}
          <div className="space-y-6 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">
              About this tour
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Start and end in San Francisco! With the in-depth cultural tour
              Northern California Summer 2019, you have a 8 day tour package
              taking you through San Francisco, USA and 9 other destinations in
              USA. Northern California Summer 2019 includes accommodation as
              well as an expert guide, meals, transport and more.
            </p>
          </div>
          {/* Highlights */}
          <div className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">Highlights</h2>
            <div className="grid gap-3">
              {tourDetails?.highlight?.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {highlight.list}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Included/Excluded */}
          <div className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">
              Included/Excluded
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {tourDetails.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.list}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {tourDetails.excluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.list}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Itinerary */}
          <div className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">Itinerary</h2>
            {tourDetails?.itinerary?.map((item, index) => {
              const day = index + 1;
              return (
                <Card
                  key={day}
                  className="border border-gray-300 rounded-xl dark:border-gray-700 dark:bg-gray-800"
                >
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenDay(openDay === day ? 0 : day)}
                  >
                    <div className="flex items-center gap-4 text-lg">
                      <div className="flex items-center justify-center w-16 h-8 rounded-full bg-blue-100 dark:bg-blue-900">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                          Day {day}
                        </span>
                      </div>
                      <span className="font-medium dark:text-white">
                        {item.title}
                      </span>
                    </div>
                    {openDay === day ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                  {openDay === day && (
                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                      {item.description}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
          {/* Durations */}
          <div className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">Durations</h2>
            <div className="grid gap-3">
              {tourDetails?.durations.map((duration, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>{duration?.duration}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Language */}
          <div className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">Language</h2>
            <div className="grid gap-3">
              {tourDetails?.languages.map((lang, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span>{lang.lang}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* FAQ */}
          <div className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {tourDetails?.questions.map((faq, index) => (
                <Card
                  key={index}
                  className="border dark:border-gray-700 dark:bg-gray-800"
                >
                  <Button
                    variant="ghost"
                    className="flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === index ? 0 : index)}
                  >
                    <span className=" dark:text-white text-lg font-bold">
                      {faq.title}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                      {faq.description}
                    </div>
                  )}
                </Card>
              ))}
            </div>
            <section
              aria-label="Reviews"
              className="space-y-4 dark:text-gray-300 "
            >
              <h2 className="text-2xl font-semibold mt-10">Reviews</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="text-yellow-400 text-xl">★</div>
                    <span className="font-semibold">
                      {tourDetails?.totalRating}/5 Excellent
                    </span>
                    <span className="text-muted-foreground">
                      ({tourDetails?.reviews?.length} reviews)
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(tourDetails?.specificReviews).map(
                      ([key, value]) => (
                        <div key={key}>
                          <strong>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </strong>{" "}
                          {value} / 5
                          <Progress className="dark:bg-white h-4 rounded-full w-full bg-black" />
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground text-center mt-4">
                {tourDetails?.reviews?.length || 0} reviews on this Tour -
                Showing 1 to {tourDetails?.reviews?.length || 0}
              </p>
              <hr />
              <Reviews
                id={tourDetails.id}
                reviews={tourDetails.reviews}
                isTour
              />
            </section>
          </div>
        </div>
        {/* Booking Card */}
        <div className="relative">
          <div className="sticky top-10">
            {" "}
            {/* Set the `top` value as needed */}
            <TourChecker user={user} bookingStatus={bookingStatus} tour_detail={tourDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
