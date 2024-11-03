/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SearchForm from "@/components/Common/SearchForm";
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
import { useEffect, useState } from "react";
import { formatForUrlWith_under_score } from "@/utils/utils";
import {
  getHotelsByCity,
  getHotelsByOrder,
  getHotelsByPrice,
} from "@/services/hotels";
import { HotelType } from "@/types/hotels";
import { getLovedHotels, removedLike } from "@/services/loved-hotel";
import axios from "axios";
import { User } from "@/types/user";
import { toast } from "react-toastify";

export default function SearchHotel({
  loved_hotel,
  user
}: {
  user:User;
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
  const searchParams = useSearchParams();
  const location_name = searchParams.get("location_name") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkout = searchParams.get("checkout") ?? "";
  const rooms = searchParams.get("rooms") ?? 1;
  const children = searchParams.get("children") ?? 0;
  const adults = searchParams.get("adults") ?? 1;
  const [selectedOption, setSelectedOption] = useState<"low" | "high" | null>(
    null
  );
  const [selectedAtoZ, setSelectedAtoZ] = useState<"a" | "z" | null>(null);
  const [hotelsData, setHotelsData] = useState<HotelType[]>([]);

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

  const handleSelectAtoZ = (option: "a" | "z") => {
    setSelectedAtoZ(option);
    sortHotelDataByOrder(option);
  };
  const handleSelect = (option: "low" | "high") => {
    setSelectedOption(option);
    sortHotelData(option);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      const hotels = await getHotelsByCity(
        location_name === "" || location_name === "United States"
          ? undefined
          : location_name,
        location_name === "United States" ? location_name : undefined
      );
      setHotelsData(hotels as HotelType[]);
    };
    fetchHotels();
  }, [location_name]);
  const sortHotelData = async (price: "low" | "high") => {
    const hotels = await getHotelsByPrice(price);
    setHotelsData(hotels as HotelType[]);
  };
  const sortHotelDataByOrder = async (order: "a" | "z") => {
    const hotels = await getHotelsByOrder(order);
    setHotelsData(hotels as HotelType[]);
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
                // "Tours",
                // "Activity",
                // "Rental",
                // "Cars Rental",
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
              onClick={() => handleSelectAtoZ("a")}
              className={`hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                selectedAtoZ === "a"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              <input
                type="radio"
                name="sort"
                checked={selectedAtoZ === "a"}
                onChange={() => handleSelectAtoZ("a")}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span>a - z</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelectAtoZ("z")}
              className={`hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                selectedAtoZ === "z"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              <input
                type="radio"
                name="sort"
                checked={selectedAtoZ === "z"}
                onChange={() => handleSelectAtoZ("z")}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span>z - a</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {hotelsData.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative overflow-hidden group">
                <Link
                  href={`/hotel-detail/${formatForUrlWith_under_score(
                    hotel?.title
                  )}?checkIn=${checkIn}&checkout=${checkout}&adults=${adults}&rooms=${rooms}&children=${children}`}
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
                  <button onClick={()=>{
                    toast.error("Thanks For Love ❤️ But You Need To Login First!🥲",{
                      position:"top-center",
                      theme:'colored'
                    });
                  }} className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
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
                        i < hotel.ratings?.total
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Link
                  href={`/hotel-detail/${formatForUrlWith_under_score(
                    hotel?.title
                  )}?checkIn=${checkIn}&checkout=${checkout}&adults=${adults}&rooms=${rooms}&children=${children}`}
                >
                  {" "}
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-600">
                    {hotel.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-white mb-4 flex">
                  {hotel.city}
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
        </div>
      </ul>
    </div>
  );
}
