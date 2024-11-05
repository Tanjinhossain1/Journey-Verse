"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatForUrlWith_under_score } from "@/utils/utils";
import { TourTypes } from "@/types/tours";
import { getPaginatedTour } from "@/services/tours";
import { toast } from "react-toastify";
import { LoveStatusType } from "./TourDisplay";
import { User } from "@/types/user";
import { getLovedHotels, removedLike } from "@/services/loved-hotel";
import axios from "axios";

export default function RelatedTour({
  title,
  love_react,
  user,
}: {
  title: string;
  love_react: LoveStatusType;
  user: User;
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [tours, setTours] = React.useState<TourTypes[]>([]);
  const [loveReact, setLoveReact] = React.useState<
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
  >(love_react);

  React.useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getPaginatedTour(1, 12, undefined, title);
      setTours(articles.data as TourTypes[]);
    };
    fetchArticles();
  }, []);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (index: number) => {
    setCurrentPage(index);
  };

  // Get all pages content
  const getPages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const start = i * itemsPerPage;
      const end = start + itemsPerPage;
      pages.push(tours.slice(start, end));
    }
    return pages;
  };
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
  return (
    <div className="px-6 py-12    mx-auto">
      <div className="container relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">
            Related Posts
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="rounded-full dark:text-white"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full dark:text-white"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {getPages().map((page, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {page.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                    >
                      <div className="relative overflow-hidden group">
                        <Link
                          href={`/tour-detail/${formatForUrlWith_under_score(
                            tour.title
                          )}`}
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
                        loveReact.some(
                            (love) => love.hotel_name === tour.title
                          ) ? (
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
                          href={`/tour-detail/${formatForUrlWith_under_score(
                            tour.title
                          )}`}
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
                            (
                            {tour?.reviews?.length
                              ? tour?.reviews?.length
                              : "0"}{" "}
                            Reviews)
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
                            <span className="text-sm">
                              {tour.totalDuration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> 

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-2 h-2 p-0 rounded-full ${
                currentPage === index ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
