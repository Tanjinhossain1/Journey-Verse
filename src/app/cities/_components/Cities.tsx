'use client'
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { CityType } from "@/types/city";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // Shadcn Popover components
import { CountryType } from "@/types/countries";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

type AboutType = {
  detail: string;
};

type CityFormData = {
  countryName: string;
  city: string;
  displayImage: FileList;
  images: FileList;
  about: AboutType[];
  hotels: string;
  tours: string;
  rentals: string;
  cars: string;
  activities: string;
};

const CityForm = ({ data,countries }: { data: CityType[],countries:CountryType[] }) => {
  const { register, handleSubmit, control, reset } = useForm<CityFormData>();
  const { fields, append, remove } = useFieldArray({
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

      await axios.post("/api/cities", payload);
      reset();
      alert("City created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error creating city:", error);
      alert("Error creating city.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCountry = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this country?");
    
    if (confirmDelete) {
      await axios.delete(`/api/cities?id=${id}`).then((response) => {
        if (response?.data) {
          window.location.reload();
        }
      }).catch((error) => {
        console.error("Error deleting country:", error);
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
          <PopoverContent className="w-96 p-4 bg-white shadow-lg rounded border space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* <input
                {...register("countryName", { required: true })}
                placeholder="Country Name"
                className="border p-2 w-full"
              /> */}
               <select
                {...register("countryName", { required: true })}
                className="border p-2 w-full"
              >
                {countries.map((country) => (
                  <option key={country?.id} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="border p-2 w-full"
              />
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

              {/* Dynamic about fields */}
              <div>
                <label>About</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <input
                      {...register(`about.${index}.detail` as const)}
                      placeholder="Detail"
                      className="border p-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ detail: "" })}
                  className="text-blue-500 mt-2"
                >
                  + Add Detail
                </button>
              </div>

              <input
                {...register("hotels")}
                placeholder="Hotels"
                className="border p-2 w-full"
              />
              <input
                {...register("tours")}
                placeholder="Tours"
                className="border p-2 w-full"
              />
              <input
                {...register("rentals")}
                placeholder="Rentals"
                className="border p-2 w-full"
              />
              <input
                {...register("cars")}
                placeholder="Cars"
                className="border p-2 w-full"
              />
              <input
                {...register("activities")}
                placeholder="Activities"
                className="border p-2 w-full"
              />

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
            <th className="border p-2">CountryName</th>
            <th className="border p-2">Created Date</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((city) => (
            <tr key={city.id} className="text-center">
              <td className="border p-2">{city.city}</td>
              <td className="border p-2">{city.countryName}</td>
              <td className="border p-2">{new Date(city.createdAt).toLocaleDateString()}</td>
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
