"use client";

import { Fragment, useEffect, useState } from "react";
import { Heart, Star, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatForUrlWith_under_score } from "@/utils/utils";
import { HotelType } from "@/types/hotels";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { getPaginatedHotels } from "@/services/hotels";
import axios from "axios";
import { User } from "@/types/user";
import { getLovedHotels, removedLike } from "@/services/loved-hotel";
import { toast } from "react-toastify";
import { TourTypes } from "@/types/tours";
import { getPaginatedTour } from "@/services/tours";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { getPaginatedActivity } from "@/services/activity";
import { ActivityTypes } from "@/types/activity";

const categories = ["Hotel", "Tour", "Activity"];
// const categories = ["Hotel", "Tour", "Activity", "Rental", "Car"];

export default function Recommended({
  city,
  loved_hotel,
  user,
}: {
  city?: string;
  user: User;
  loved_hotel:
    | {
        id: number;
        fullName: string;
        email: string;
        hotel_name: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | {
        message: string;
      };
}) {
  const [selectedCategory, setSelectedCategory] = useState("Hotel");
  const [loveReact, setLoveReact] = useState<
    | {
        id: number;
        fullName: string;
        email: string;
        hotel_name: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | {
        message: string;
      }
  >(loved_hotel);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [tours, setTours] = useState<TourTypes[]>([]);
  const [activity, setActivity] = useState<ActivityTypes[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(hotels);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch hotels from backend

  useEffect(() => {
    const fetchHotels = async (page: number, limit = 12) => {
      try {
        const hotelsData = city
          ? await getPaginatedHotels(page, limit, city)
          : await getPaginatedHotels(page, limit);
        setHotels(hotelsData.data as HotelType[]);
        setTotalPages(Math.ceil(hotelsData.totalRecords / limit));
      } catch (error) {
        console.error("Failed to fetch Hotel:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchTours = async (page: number, limit = 12) => {
      setIsLoading(true);
      try {
        const tourData = city
          ? await getPaginatedTour(page, limit, city)
          : await getPaginatedTour(page, limit);
        setTours(tourData.data as TourTypes[]);
        setTotalPages(Math.ceil(tourData.totalRecords / limit));
      } catch (error) {
        console.error("Failed to fetch Tour:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchActivity = async (page: number, limit = 12) => {
      setIsLoading(true);
      try {
        const tourData = city
          ? await getPaginatedActivity(page, limit, city)
          : await getPaginatedActivity(page, limit);
        setActivity(tourData.data as TourTypes[]);
        setTotalPages(Math.ceil(tourData.totalRecords / limit));
      } catch (error) {
        console.error("Failed to fetch Activity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedCategory === "Hotel") {
      fetchHotels(currentPage);
    } else if (selectedCategory === "Tour") {
      fetchTours(currentPage);
    } else if (selectedCategory === "Activity") {
      fetchActivity(currentPage);
    }
  }, [currentPage, selectedCategory, city]);

  const addLoved = async (title: string) => {
    const payload = {
      hotel_name: title,
      email: user?.email,
      fullName: user?.name,
    };
    const response = await axios.post("/api/loved-hotel", payload);
    if (response.data) {
      const LovedHotels = await getLovedHotels(user?.email as string);
      setLoveReact(LovedHotels);
    }
  };
  const removeLove = async (hotel_name: string) => {
    const response = await removedLike(hotel_name);
    console.log(response);

    const LovedHotels = await getLovedHotels(user?.email as string);
    console.log(LovedHotels);
    setLoveReact(LovedHotels);
  };
  const renderContent = () => {
    if (selectedCategory === "Hotel") {
      return (
        <Fragment>
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-200 dark:shadow-white"
            >
              <div className="relative overflow-hidden group">
                <Link
                  href={`/hotel-detail/${formatForUrlWith_under_score(
                    hotel.title
                  )}`}
                >
                  <Image
                    src={hotel.displayImage}
                    alt={hotel.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </Link>
                {"message" in loveReact ? (
                  // If there's a message (error response), display the red heart button by default
                  <button
                    onClick={() => {
                      toast.error(
                        "Thanks For Love ❤️ But You Need To Login First!🥲",
                        {
                          position: "top-center",
                          theme: "colored",
                        }
                      );
                    }}
                    className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
                  </button>
                ) : // If loved_hotel is a list, check if the current hotel exists in loved_hotel
                loveReact.some((love) => love.hotel_name === hotel.title) ? (
                  <button
                    onClick={() => removeLove(hotel.title)}
                    className="absolute top-2 right-2 p-2 bg-red-500  rounded-full shadow-md hover:bg-red-500 transition-colors duration-200"
                  >
                    <Heart className="w-5 h-5 text-white dark:text-white " />
                  </button>
                ) : (
                  <button
                    onClick={() => addLoved(hotel.title)}
                    className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
                  </button>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < hotel.ratings.total
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Link
                  href={`/hotel-detail/${formatForUrlWith_under_score(
                    hotel.title
                  )}`}
                >
                  {" "}
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-400 dark:text-white dark:hover:text-blue-400">
                    {hotel.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-white mb-4 flex">
                  {hotel.city}
                </p>
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {hotel.ratings?.total}/5 · Excellent (
                    {hotel.reviews?.length} Reviews)
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-white">
                      From:
                    </span>
                    <span className="text-sm font-bold ml-1 dark:text-white">
                      ${(+hotel.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-white">
                      /night
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      );
    } else if (selectedCategory === "Tour") {
      return tours?.map((tour) => (
        <div
          key={tour.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="relative overflow-hidden group">
            <Link
              href={`/tour-detail/${formatForUrlWith_under_score(tour.title)}`}
            >
              <Image
                src={tour.displayImage!}
                alt={tour.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </Link>
            {"message" in loveReact ? (
              // If there's a message (error response), display the red heart button by default
              <button
                onClick={() => {
                  toast.error(
                    "Thanks For Love ❤️ But You Need To Login First!🥲",
                    {
                      position: "top-center",
                      theme: "colored",
                    }
                  );
                }}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              >
                <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
              </button>
            ) : // If loved_hotel is a list, check if the current hotel exists in loved_hotel
            loveReact.some((love) => love.hotel_name === tour.title) ? (
              <button
                onClick={() => removeLove(tour.title)}
                className="absolute top-2 right-2 p-2 bg-red-500  rounded-full shadow-md hover:bg-red-500 transition-colors duration-200"
              >
                <Heart className="w-5 h-5 text-white dark:text-white " />
              </button>
            ) : (
              <button
                onClick={() => addLoved(tour.title)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              >
                <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
              </button>
            )}
            {/* {tour.originalPrice && (
              <div className="absolute top-2 left-2 bg-green-600 text-white dark:text-white px-2 py-1 rounded-md text-sm font-bold">
                -20%
              </div>
            )} */}
          </div>
          <div className="p-4">
            <div className="flex items-center text-gray-600 dark:text-white mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{tour.city}</span>
            </div>
            <Link
              href={`/tour-detail/${formatForUrlWith_under_score(tour.title)}`}
            >
              {" "}
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-400">
                {tour.title}
              </h2>
            </Link>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < +tour.totalRating!
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600  dark:text-whiteml-2">
                ({tour?.reviews?.length ? tour?.reviews?.length : "0"} Reviews)
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                {/* {tour.originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-white line-through mr-2">
                    ${tour.originalPrice.toFixed(2)}
                  </span>
                )} */}
                <span className="text-xl font-bold dark:text-white">
                  ${(+tour.price!).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-white">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{tour.totalDuration}</span>
              </div>
            </div>
          </div>
        </div>
      ));
    } else if (selectedCategory === "Activity") {
      return activity?.map((activity) => (
        <div
          key={activity.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="relative overflow-hidden group">
            <Link
              href={`/activity_detail/${formatForUrlWith_under_score(
                activity.title
              )}`}
            >
              <Image
                src={activity.displayImage!}
                alt={activity.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </Link>
            {"message" in loveReact ? (
              // If there's a message (error response), display the red heart button by default
              <button
                onClick={() => {
                  toast.error(
                    "Thanks For Love ❤️ But You Need To Login First!🥲",
                    {
                      position: "top-center",
                      theme: "colored",
                    }
                  );
                }}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              >
                <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
              </button>
            ) : // If loved_hotel is a list, check if the current hotel exists in loved_hotel
            loveReact.some((love) => love.hotel_name === activity.title) ? (
              <button
                onClick={() => removeLove(activity.title)}
                className="absolute top-2 right-2 p-2 bg-red-500  rounded-full shadow-md hover:bg-red-500 transition-colors duration-200"
              >
                <Heart className="w-5 h-5 text-white dark:text-white " />
              </button>
            ) : (
              <button
                onClick={() => addLoved(activity.title)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              >
                <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
              </button>
            )}
            {/* {activity.originalPrice && (
              <div className="absolute top-2 left-2 bg-green-600 text-white dark:text-white px-2 py-1 rounded-md text-sm font-bold">
                -20%
              </div>
            )} */}
          </div>
          <div className="p-4">
            <div className="flex items-center text-gray-600 dark:text-white mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{activity.city}</span>
            </div>
            <Link
              href={`/activity_detail/${formatForUrlWith_under_score(
                activity.title
              )}`}
            >
              {" "}
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-400">
                {activity.title}
              </h2>
            </Link>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < +activity.totalRating!
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600  dark:text-whiteml-2">
                ({activity?.reviews?.length ? activity?.reviews?.length : "0"}{" "}
                Reviews)
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                {/* {activity.originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-white line-through mr-2">
                    ${activity.originalPrice.toFixed(2)}
                  </span>
                )} */}
                <span className="text-xl font-bold dark:text-white">
                  ${(+activity.price!).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-white">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{activity.totalDuration}</span>
              </div>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="col-span-full text-center text-gray-500 dark:text-white">
          No content available for this category yet.
        </div>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <h1
        id="recommend"
        className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
      >
        {city ? city : "Recommended for you"}
      </h1>
      <div className="flex justify-center gap-2 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              category === selectedCategory
                ? "bg-blue-500 text-white dark:text-white"
                : "bg-gray-200 dark:bg-black dark:border text-gray-800 dark:text-white  hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(12)
              .fill(null)
              .map((_, index) => (
                <Card key={index} className="h-full">
                  <div className="aspect-video">
                    <Skeleton className="w-full h-full text-black bg-black dark:bg-white" />
                  </div>
                  <CardHeader className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-black dark:bg-white" />
                    <Skeleton className="h-6 w-full bg-black dark:bg-white" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full bg-black dark:bg-white" />
                    <Skeleton className="h-4 w-full mt-2 bg-black dark:bg-white" />
                    <Skeleton className="h-4 w-2/3 mt-2 bg-black dark:bg-white" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-4 w-full bg-black dark:bg-white" />
                  </CardFooter>
                </Card>
              ))
          : renderContent()}
      </div>
      <Pagination>
        <PaginationContent className="flex items-center justify-center space-x-2 mt-2">
          <PaginationItem>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
            >
              Previous
            </button>
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <button
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg shadow-md transition duration-200 
            ${
              currentPage === i + 1
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-500 hover:bg-purple-100"
            }`}
              >
                {i + 1}
              </button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
            >
              Next
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
