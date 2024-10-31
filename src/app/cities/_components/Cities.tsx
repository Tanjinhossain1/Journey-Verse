"use client";
import React from "react";
import axios from "axios";
import { CityType } from "@/types/city";
import { CountryType } from "@/types/countries";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import CreateCityPopover from "./CreateForm";

const CityForm = ({
  data,
  countries,
}: {
  data: CityType[];
  countries: CountryType[];
}) => {
  const deleteCountry = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this country?"
    );

    if (confirmDelete) {
      await axios
        .delete(`/api/cities?id=${id}`)
        .then((response) => {
          if (response?.data) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error deleting country:", error);
        });
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Cities</h2>
        <CreateCityPopover countries={countries} />
      </div>

      {/* Table to display cities */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">CountryName</th>
            <th className="border p-2">Created Date</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((city) => (
            <tr key={city.id} className="text-center">
              <td className="border p-2">{city.city}</td>
              <td className="border p-2">{city.countryName}</td>
              <td className="border p-2">
                {new Date(city.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <CreateCityPopover defaultValues={city} countries={countries} />
                {/* <Button
                  onClick={() => deleteCountry(city?.id)}
                >
                  <Edit />
                </Button> */}
              </td>
              <td className="border p-2">
                <Button
                  onClick={() => deleteCountry(city?.id)}
                  className="text-red-600"
                >
                  <Delete className="text-red-600" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityForm;
