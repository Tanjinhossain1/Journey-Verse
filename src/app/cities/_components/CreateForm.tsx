'use client'
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // Shadcn Popover components
import { CountryType } from "@/types/countries";
import { CityType } from "@/types/city";
import { Edit } from "lucide-react";

type AboutType = {
  detail: string;
};

type CityFormData = {
  countryName: string;
  city: string;
  displayImage: FileList | string;
  images: FileList;
  about: AboutType[];
  hotels: string;
  tours: string;
  rentals: string;
  cars: string;
  activities: string;
};

const CreateCityPopover = ({countries,defaultValues }: {countries?:CountryType[],defaultValues?: CityType}) => {
  const { register, handleSubmit, control,reset } = useForm<CityFormData>({
    defaultValues: {
        about: defaultValues?.about as AboutType[],
        activities: defaultValues?.activities as string,
        cars: defaultValues?.cars as string,
        city: defaultValues?.city as string,
        countryName: defaultValues?.countryName as string,
        hotels: defaultValues?.hotels as string,
        rentals: defaultValues?.rentals as string,
        tours: defaultValues?.tours as string,
        displayImage: defaultValues?.displayImage,
        images: defaultValues?.images as FileList,
    }
  });
  const { fields, append, remove, } = useFieldArray({
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
    console.log('first Submit ',data)
    try {
        let displayImageUrl;

        if (typeof data.displayImage === 'string' && data.displayImage.includes('.cloudinary.')) {
          // If it's a string URL and already on Cloudinary, use it directly
          displayImageUrl = data.displayImage;
        } else if (data.displayImage instanceof FileList && data.displayImage.length > 0) {
          // If it's a FileList, upload the first file to Cloudinary
          displayImageUrl = await uploadToCloudinary(data.displayImage[0]);
        }
      const imageUrls = await Promise.all(
        Array.from(data.images).map((file) => uploadToCloudinary(file))
      );

      const payload = defaultValues ? {
        ...data,
        displayImage: displayImageUrl,
        images: imageUrls,
        cityId:defaultValues?.id
      } : {
        ...data,
        displayImage: displayImageUrl,
        images: imageUrls,
      };
      console.log(payload)
      if(defaultValues){
        await axios.put("/api/cities", payload);
      }else{
        await axios.post("/api/cities", payload);
      }
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
  return (
        <Popover>
          <PopoverTrigger className="bg-blue-500 text-white p-2 rounded">
            {defaultValues ? <Edit /> : "Create City"}
          </PopoverTrigger>
          <PopoverContent className="w-[1000px]  p-4 bg-white shadow-lg rounded border space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-2 gap-4">
              {/* <input
                {...register("countryName", { required: true })}
                placeholder="Country Name"
                className="border p-2 w-full"
              /> */}
               <select
                {...register("countryName", { required: true })}
                className="border p-2 w-full"
              >
                {countries?.map((country) => (
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
                rules={{ required:  defaultValues ? false : true }}
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
                rules={{ required:  defaultValues ? false : true }}
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
  );
};

export default CreateCityPopover;
