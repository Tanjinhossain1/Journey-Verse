/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SearchForm, { countries } from "@/components/Common/SearchForm";
import { ChevronDown, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { formatForUrlWith_under_score } from "@/utils/utils";

const mockHotelsData = Array.from({ length: 20 }, (_, index) => {
  const countryData = countries[0]; // Assuming only one country provided in `countries`
  const city = countryData.city[index % countryData.city.length];

  return {
    id: index + 1,
    title: `Hotel in  cacarot`,
    displayImage: `/Catefornia/display.jpeg`,
    price: 145,
    images: [
      `/images/hotel-1.jpg`,
      `/images/hotel-2.jpg`,
      `/images/hotel-3.jpg`,
    ],
    ratings: {
      total: 5,
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
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    about: `This is a description of Hotel ${index + 1} located in ${city}.`,
    location: city,
  };
});

export default function SearchHotel() {
  const searchParams = useSearchParams();
  const location_name = searchParams.get("location_name") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkout = searchParams.get("checkout") ?? "";
  const rooms = searchParams.get("rooms") ?? 1;
  const children = searchParams.get("children") ?? 0;
  const adults = searchParams.get("adults") ?? 1;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedAtoZ, setSelectedAtoZ] = useState<string | null>(null);

  const handleSelectAtoZ = (option: string) => {
    setSelectedAtoZ(option);
  };
  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };
  const filteredHotels = mockHotelsData.filter(
    (hotel) => !location_name || hotel.location === location_name
  );

  return (
    <div>
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
        <div className="relative z-10 mt-12 flex flex-col items-center justify-center  text-white px-4">
          <nav className="mb-4 mt-10">
            <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              {[
                "Hotel",
                "Tours",
                "Activity",
                "Rental",
                "Cars Rental",
                "Car Transfer",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline font-bold">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SearchForm
          location_name={location_name}
            defaultDate={{ from: checkIn as any, to: checkout as any }}
            defaultGuest={{
              adults: +adults,
              children: +children,
              rooms: +rooms,
            }}
          />
        </div>
      </div>
      <ul className="w-3/4 mx-auto mt-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 font-medium text-lg border shadow-lg rounded-xl mb-1">
            Sort <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-black">
            <p className="text-gray-600 text-sm">Price</p>
            <DropdownMenuItem
              onClick={() => handleSelect("low")}
              className={`hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                selectedOption === "low"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              <input
                type="radio"
                name="sort"
                checked={selectedOption === "low"}
                onChange={() => handleSelect("low")}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span>Low to High Price</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelect("high")}
              className={`hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                selectedOption === "high"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              <input
                type="radio"
                name="sort"
                checked={selectedOption === "high"}
                onChange={() => handleSelect("high")}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span>High to Low Price</span>
            </DropdownMenuItem>
            <p className="text-gray-600 text-sm">Name</p>
            <DropdownMenuItem
              onClick={() => handleSelectAtoZ("a-z")}
              className={`hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                selectedAtoZ === "a-z"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              <input
                type="radio"
                name="sort"
                checked={selectedAtoZ === "a-z"}
                onChange={() => handleSelectAtoZ("a-z")}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span>a - z</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelectAtoZ("z-a")}
              className={`hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                selectedAtoZ === "z-a"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              <input
                type="radio"
                name="sort"
                checked={selectedAtoZ === "z-a"}
                onChange={() => handleSelectAtoZ("z-a")}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span>z - a</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative overflow-hidden group">
                <Link href={`/hotel-detail/${formatForUrlWith_under_score(hotel?.title)}?checkIn=${checkIn}&checkout=${checkout}&adults=${adults}&rooms=${rooms}&children=${children}`}>
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
                        i < hotel.ratings?.total
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Link href={`/hotel-detail/${formatForUrlWith_under_score(hotel?.title)}?checkIn=${checkIn}&checkout=${checkout}&adults=${adults}&rooms=${rooms}&children=${children}`}>
                  {" "}
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-400">
                    {hotel.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-white mb-4 flex">
                  {hotel.location}
                </p>
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {hotel.ratings?.total}/5 · Excellent Reviews
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-white">
                      From:
                    </span>
                    <span className="text-sm font-bold ml-1 dark:text-white">
                      ${hotel.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-white">
                      /night
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
