"use client";
import React from "react";
import axios from "axios";
import { CityType } from "@/types/city";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { HotelType } from "@/types/hotels";
import CityPopover from "./HotelPopover";
import HotelPopover from "./HotelPopover";
import { CountryType } from "@/types/countries";

const CityForm = ({
  data,
  cityData,
  countries,
}: {
  data: HotelType[];
  cityData: CityType[];
  countries: CountryType[];
}) => {
  const deleteCountry = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this country?"
    );

    if (confirmDelete) {
      await axios
        .delete(`/api/hotels?id=${id}`)
        .then((response) => {
          if (response?.data) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error deleting Hotels:", error);
        });
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Hotels</h2>
        <CityPopover countries={countries} cityData={cityData} />
      </div>

      {/* Table to display cities */}
      <div className="min-w-full h-[500px] overflow-y-auto">
        <div className="flex">
          <div className="flex-1 border p-2 font-semibold">Name</div>
          <div className="flex-1 border p-2 font-semibold">City</div>
          <div className="flex-1 border p-2 font-semibold">Created Date</div>
          <div className="flex-1 border p-2 font-semibold">Edit</div>
          <div className="flex-1 border p-2 font-semibold">Delete</div>
        </div>

        <div className="overflow-y-auto">
          {data?.map((city) => (
            <div key={city.id} className="flex text-center border-t">
              <div className="flex-1 p-2">{city.title}</div>
              <div className="flex-1 p-2">{city.city}</div>
              <div className="flex-1 p-2">
                {new Date(city.createdAt).toLocaleDateString()}
              </div>
              <div className="flex-1 p-2">
                <HotelPopover
                  countries={countries}
                  defaultValues={city}
                  cityData={cityData}
                />
              </div>
              <div className="flex-1 p-2">
                <Button
                  onClick={() => deleteCountry(city?.id)}
                  className="text-red-600"
                >
                  <Delete className="text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityForm;
