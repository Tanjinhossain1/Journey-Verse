"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ChevronUp, Clock, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Reviews from "@/app/hotel-detail/[title]/_components/Reviews";
import { Progress } from "@radix-ui/react-progress";
import { User } from "@/types/user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ActivityTypes } from "@/types/activity";
import { getTheActivityBookingStatus } from "@/services/activity";
import ActivityChecker from "./ActivityCheckForm";
import RelatedActivity from "./RelatedPost";

export type LoveStatusType ={
  id: number;
  fullName: string;
  email: string;
  hotel_name: string;
  createdAt: Date;
  updatedAt: Date;
}[] | {
  message: string;
}
export default function ActivityDisplay({
  activityDetails,
  user,
  lovedStatus
}: {
  activityDetails: ActivityTypes;
  user: User;
  lovedStatus: LoveStatusType
}) {
  const [openDay, setOpenDay] = useState(1);
  const [openFaq, setOpenFaq] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<boolean>(false);
  useEffect(() => {
    if (user?.email) {
      const BookingStatus = async () => {
        const activityDetailsBookingStatus = await getTheActivityBookingStatus(
          activityDetails.title,
          user?.email
        );
        if(activityDetailsBookingStatus && activityDetailsBookingStatus[0] && activityDetailsBookingStatus[0]?.email && activityDetailsBookingStatus[0]?.email === user?.email){
          setBookingStatus(true)
        }
      };
      BookingStatus()
    }
  });
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
            {activityDetails.title}
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{activityDetails.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    <div className="md:max-w-6xl mx-auto p-4 space-y-8 dark:bg-gray-900 mt-2 rounded-xl">
      
      {/* Gallery Grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main large image */}
          <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={activityDetails.images[0]}
              alt="Historic villa exterior with bell tower"
              className="object-cover hover:scale-105 transition-transform duration-300"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>

          {activityDetails.images.slice(1, 5).map((image, index) => (
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
            <div className="border border-gray-400 rounded-xl p-3 dark:border-gray-600 text-gray-700">
              <div className="text-sm dark:text-gray-400 text-gray-700">
                <span>Duration</span>
              </div>
              <div className="font-medium dark:text-white">
                {activityDetails.totalDuration}
              </div>
            </div>
            <div className="border border-gray-400 rounded-xl p-3 dark:border-gray-700 text-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Cancelation
              </div>
              <div className="font-medium dark:text-white">
                {activityDetails.tourType}
              </div>
            </div>
            <div className="border border-gray-400 rounded-xl p-3 dark:border-gray-700 text-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Group Size
              </div>
              <div className="font-medium dark:text-white">
                {activityDetails.groupSize}
              </div>
            </div>
            <div className="border border-gray-400 rounded-xl p-3 dark:border-gray-700 text-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Languages
              </div>
              <div className="font-medium dark:text-white text-gray-700">
                {activityDetails?.languages[0].lang},{" "}
                {activityDetails?.languages.length >= 1
                  ? activityDetails?.languages[1].lang
                  : null}
              </div>
            </div>
          </div>
          {/* About this Activity */}
          <div className="space-y-6 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">
              About this Activity
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Start and end in San Francisco! With the in-depth cultural Activity
              Northern California Summer 2019, you have a 8 day activity package
              taking you through San Francisco, USA and 9 other destinations in
              USA. Northern California Summer 2019 includes accommodation as
              well as an expert guide, meals, transport and more.
            </p>
          </div>
          {/* Highlights */}
          <div className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold dark:text-white">Highlights</h2>
            <div className="grid gap-3">
              {activityDetails?.highlight?.map((highlight, index) => (
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
                {activityDetails.included.map((item, index) => (
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
                {activityDetails.excluded.map((item, index) => (
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
            {activityDetails?.itinerary?.map((item, index) => {
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
              {activityDetails?.durations.map((duration, index) => {
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
              {activityDetails?.languages.map((lang, index) => {
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
              {activityDetails?.questions.map((faq, index) => (
                <Card
                  key={index}
                  className="border dark:border-gray-500 border-gray-400 rounded-xl dark:bg-gray-800"
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
              <Card className="rounded-xl border-gray-400">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="text-yellow-400 text-xl">★</div>
                    <span className="font-semibold">
                      {activityDetails?.totalRating}/5 Excellent
                    </span>
                    <span className="text-muted-foreground">
                      ({activityDetails?.reviews?.length} reviews)
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(activityDetails?.specificReviews).map(
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
                {activityDetails?.reviews?.length || 0} reviews on this Activity -
                Showing 1 to {activityDetails?.reviews?.length || 0}
              </p>
              <hr className="border-gray-400" />
              <Reviews
                id={activityDetails.id}
                reviews={activityDetails.reviews}
                isActivity
              />
            </section>
          </div>
        </div>
        {/* Booking Card */}
        <div className="relative">
          <div className="sticky top-10">
            {" "}
            {/* Set the `top` value as needed */}
            <ActivityChecker user={user} bookingStatus={bookingStatus} activity_detail={activityDetails} />
          </div>
        </div>
      </div>
      <RelatedActivity user={user} love_react={lovedStatus} title={activityDetails.title} />
      </div>
       
      </Fragment>
  );
}
