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
import { CountryType } from "@/types/countries";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { HotelType } from "@/types/hotels";

type AboutType = {
  detail: string;
};

type FacilityType = {
  name: string;
};

type RatingsType = {
  total: number;
  specific: {
    cleanliness: string;
    accuracy: string;
    communication: string;
    location: string;
    checkIn: string;
    value: string;
  };
};

type CityFormData = {
  title: string;
  city: string;
  displayImage: FileList;
  images: FileList;
  about: AboutType[];
  facilities: FacilityType[];
  ratings: RatingsType;
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
        <h2 className="text-xl font-semibold">Cities</h2>
        <Popover>
          <PopoverTrigger className="bg-blue-500 text-white p-2 rounded">
            Create City
          </PopoverTrigger>
          <PopoverContent className="w-[1000px]  p-4 bg-white shadow-lg rounded border space-y-4 overflow-scroll">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 grid grid-cols-1 overflow-scroll"
            >
              <div className="flex gap-3">
                <select
                  {...register("city", { required: true })}
                  className="border p-2 w-full"
                >
                  {cityData.map((country) => (
                    <option key={country?.id} value={country?.city}>
                      {country?.city}
                    </option>
                  ))}
                </select>
                <input
                  {...register("title", { required: true })}
                  placeholder="Title"
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex gap-3">
                <Controller
                  name="displayImage"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="border p-2 w-full"
                    />
                  )}
                />
                <Controller
                  name="images"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => field.onChange(e.target.files)}
                      className="border p-2 w-full"
                    />
                  )}
                />
              </div>

              {/* Dynamic about fields */}
              <div className="flex gap-3">
                <div className="w-full">
                  <label>About</label>
                  {aboutFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <input
                        {...register(`about.${index}.detail` as const)}
                        placeholder="Detail"
                        className="border p-2 w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeAbout(index)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendAbout({ detail: "" })}
                    className="text-blue-500 mt-2"
                  >
                    + Add Detail
                  </button>
                </div>

                {/* Dynamic facilities fields */}
                <div className="w-full">
                  <label>Facilities</label>
                  {facilityFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <input
                        {...register(`facilities.${index}.name` as const)}
                        placeholder="Facility Name"
                        className="border p-2 w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeFacility(index)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendFacility({ name: "" })}
                    className="text-blue-500 mt-2"
                  >
                    + Add Facility
                  </button>
                </div>
              </div>
              {/* Default ratings */}
              <div>
                <label>Ratings</label>
                <input
                  {...register("ratings.total", { value: 0 })}
                  type="number"
                  placeholder="Total Ratings"
                  className="border p-2 w-full"
                />
                <div className="space-y-2 mt-2 grid grid-cols-3">
                  {[
                    "cleanliness",
                    "accuracy",
                    "communication",
                    "location",
                    "checkIn",
                    "value",
                  ].map((rating) => (
                    <input
                      key={rating}
                      {...register(`ratings.specific.${rating}` as any)}
                      type="number"
                      placeholder={
                        rating.charAt(0).toUpperCase() + rating.slice(1)
                      }
                      className="border p-2 w-full"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                {isLoading ? "Submitting..." : "Create City"}
              </button>
            </form>
          </PopoverContent>
        </Popover>
      </div>

      {/* Table to display cities */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Created Date</th>
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
