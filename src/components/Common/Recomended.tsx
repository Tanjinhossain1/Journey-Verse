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

const tours = [
  {
    id: 1,
    name: "Two Hour Walking Tour of Manhattan",
    location: "Los Anglese",
    rating: 5,
    reviews: 3,
    price: 190.8,
    originalPrice: 212.0,
    duration: "10 hours",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "American Parks Trail end Rapid City",
    location: "Nevada",
    rating: 5,
    reviews: 3,
    price: 159.0,
    duration: "8 hour",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Northern California Summer 2019",
    location: "San Francisco",
    rating: 5,
    reviews: 3,
    price: 159.0,
    duration: "5 days",
    image: "/placeholder.svg?height=300&width=400",
  },
];

const categories = ["Hotel"];
// const categories = ["Hotel", "Tour", "Activity", "Rental", "Car"];

export default function Recommended({ city }: { city?: string }) {
  const [selectedCategory, setSelectedCategory] = useState("Hotel");
  const [hotels, setHotels] = useState<HotelType[]>([]);
  console.log(hotels);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch hotels from backend
  const fetchHotels = async (page: number, limit = 12) => {
    const hotelsData = await getPaginatedHotels(page, limit);
    setHotels(hotelsData.data as HotelType[]);
    setTotalPages(Math.ceil(hotelsData.totalRecords / limit));
  };

  useEffect(() => {
    if (selectedCategory === "Hotel") {
      fetchHotels(currentPage);
    }
  }, [currentPage]);
  const renderContent = () => {
    if (selectedCategory === "Hotel") {
      return (
        <Fragment>
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-200"
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
                <button className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
                  <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
                </button>
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
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-400">
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
      return tours.map((tour) => (
        <div
          key={tour.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="relative overflow-hidden group">
            <Link href={"/"}>
              <Image
                src={tour.image}
                alt={tour.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </Link>
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
              <Heart className="w-5 h-5 text-gray-600 dark:text-white" />
            </button>
            {tour.originalPrice && (
              <div className="absolute top-2 left-2 bg-green-600 text-white dark:text-white px-2 py-1 rounded-md text-sm font-bold">
                -20%
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center text-gray-600 dark:text-white mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{tour.location}</span>
            </div>
            <Link href={"/"}>
              {" "}
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-400">
                {tour.name}
              </h2>
            </Link>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < tour.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600  dark:text-whiteml-2">
                ({tour.reviews} Reviews)
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div>
                {tour.originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-white line-through mr-2">
                    ${tour.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xl font-bold dark:text-white">
                  ${tour.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-white">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{tour.duration}</span>
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
      <h1 id="recommend" className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
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
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderContent()}
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
