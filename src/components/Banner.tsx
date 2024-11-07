"use client";
import Image from "next/image";
import SearchForm from "./Common/SearchForm";
import { Button } from "./ui/button";
import { useState } from "react";
import SearchTourForm from "./Common/SearchTourForm";

export type searchType = "Hotel" | "Tours" | "Activity";
export default function Banner() {
  const [searchType, setSearchType] = useState<searchType>("Hotel");
  return (
    <div className="relative  min-h-[400px] w-full overflow-hidden dark:border-b-2  dark:border-gray-500">
      <div className="absolute inset-0">
        <Image
          layout="fill"
          alt="Mountain landscape with a person in yellow jacket"
          className="w-full h-full object-cover"
          src="/journey-bg.jpeg"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center md:mt-40  text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Let the journey begin
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Get the best prices on 5,000,00000+ properties, worldwide
        </p>
        <nav className="mb-4 mt-10">
          <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            {[
              "Hotel",
              "Tours",
              "Activity",
              // "Rental",
              // "Cars Rental",
            ].map((item) => (
              <li key={item}>
                <Button
                  onClick={() => setSearchType(item as searchType)}
                  className={`hover:underline font-bold ${searchType === item ? "underline text-orange-500":""}`}
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        {searchType === "Hotel" ? <SearchForm /> : null}
        {searchType === "Tours" ? <SearchTourForm /> : null}
        {searchType === "Activity" ? <SearchTourForm isActivity /> : null}
      </div>
    </div>
  );
}
