"use client";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { CityType } from "@/types/city";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Shadcn Popover components
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { HotelType } from "@/types/hotels";
import CityPopover from "./HotelPopover";
import HotelPopover from "./HotelPopover";

type AboutType = {
  detail: string;
};

type FacilityType = {
  name: string;
};
type RatingSpecific = {
  [key: string]: string | number; // Adjust type as needed
  cleanliness: string;
  accuracy: string;
  communication: string;
  location: string;
  checkIn: string;
  value: string;
};
type RatingsType = {
  total: number;
  specific: RatingSpecific
};

type CityFormData = {
  title: string;
  city: string;
  displayImage: FileList;
  images: FileList;
  about: AboutType[];
  facilities: FacilityType[];
  ratings: RatingsType;
  price:string
};

const CityForm = ({
  data,
  cityData,
}: {
  data: HotelType[];
  cityData: CityType[];
}) => {
  const { register, handleSubmit, control, reset } = useForm<CityFormData>({
    defaultValues: {
      price:"",
      ratings: {
        total: 0,
        specific: {
          cleanliness: "",
          accuracy: "",
          communication: "",
          location: "",
          checkIn: "",
          value: "",
        },
      },
    },
  });

  const {
    fields: facilityFields,
    append: appendFacility,
    remove: removeFacility,
  } = useFieldArray({
    control,
    name: "facilities",
  });

  const {
    fields: aboutFields,
    append: appendAbout,
    remove: removeAbout,
  } = useFieldArray({
    control,
    name: "about",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Function to handle image upload to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "computer-services");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/djvcnudls/upload`,
      formData
    );

    return response.data.secure_url;
  };

  const onSubmit = async (data: CityFormData) => {
    setIsLoading(true);

    try {
      const displayImageUrl = await uploadToCloudinary(data.displayImage[0]);
      const imageUrls = await Promise.all(
        Array.from(data.images).map((file) => uploadToCloudinary(file))
      );

      const payload = {
        ...data,
        displayImage: displayImageUrl,
        images: imageUrls,
      };

      const response = await axios.post("/api/hotels", payload);
      if (response.data) {
        reset();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating city:", error);
      alert("Error creating city.");
    } finally {
      setIsLoading(false);
    }
  };

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
        <CityPopover cityData={cityData} />
      </div>

      {/* Table to display cities */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Created Date</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((city) => (
            <tr key={city.id} className="text-center">
              <td className="border p-2">{city.title}</td>
              <td className="border p-2">{city.city}</td>
              <td className="border p-2">
                {new Date(city.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <HotelPopover defaultValues={city} cityData={cityData} />
                
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
