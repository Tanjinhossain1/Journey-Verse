"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HotelType } from "@/types/hotels";
import { RoomsType } from "@/types/rooms";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

// Define the interface for form fields
interface RoomFormData {
  title: string;
  city: string;
  country: string;
  hotel: string;
  displayImage: string;
  price: string;
  images: string[];
  facilities: { name: string }[];
  about: { detail: string }[];
  foot_age: string;
  bed: string;
  adult: string;
  kid: string;
}

const RoomForm: React.FC<{
  hotels: HotelType[];
}> = ({ hotels }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomFormData>({
    defaultValues: {
      facilities: [{ name: "" }],
      about: [{ detail: "" }],
    },
  });

  const {
    fields: facilitiesFields,
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

  const onSubmit: SubmitHandler<RoomFormData> = async (data) => {
    console.log(data);
    // handle form submission
    const response = await axios.post('/api/rooms',data);
    if(response?.data){
        window.location.reload();
    }
  };

  // Cloudinary upload functions
  const handleSingleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "computer-services"); // Your Cloudinary preset

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/djvcnudls/image/upload",
      formData
    );
    setValue("displayImage", response.data.secure_url);
  };

  const handleMultipleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const urls = await Promise.all(
      Array.from(e.target.files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "computer-services");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djvcnudls/image/upload",
          formData
        );
        return response.data.secure_url;
      })
    );
    setValue("images", urls);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 grid grid-cols-3 gap-1"
    >
      <div>
        <label>Title:</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="border"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div> 
      <div>
        <label>Hotel:</label>
        <select
          {...register("hotel", { required: "Hotel is required" })}
          className="border"
        >
          {hotels?.map((hotel) => {
            return (
              <option key={hotel.id} value={hotel.title}>
                {hotel.title}
              </option>
            );
          })}
        </select>
        {errors.hotel && <p className="text-red-500">{errors.hotel.message}</p>}
      </div>

      <div>
        <label>Display Image:</label>
        <input
          type="file"
          onChange={handleSingleImageUpload}
          className="border"
        />
      </div>

      <div>
        <label>Images:</label>
        <input
          type="file"
          multiple
          onChange={handleMultipleImageUpload}
          className="border"
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="text"
          {...register("price", { required: "Price is required" })}
          className="border"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div>
        <label>Foot Age:</label>
        <input
          type="text"
          {...register("foot_age", { required: "Price is required" })}
          className="border"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div>
        <label>Bet:</label>
        <input
          type="text"
          {...register("bed", { required: "Price is required" })}
          className="border"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div>
        <label>Adult:</label>
        <input
          type="text"
          {...register("adult", { required: "Price is required" })}
          className="border"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div>
        <label>Kid:</label>
        <input
          type="text"
          {...register("kid", { required: "Price is required" })}
          className="border"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label>Facilities:</label>
        {facilitiesFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              {...register(`facilities.${index}.name` as const, {
                required: "Facility is required",
              })}
              className="border"
            />
            <button
              type="button"
              onClick={() => removeFacility(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendFacility({ name: "" })}
          className="bg-green-500 text-white"
        >
          Add Facility
        </button>
      </div>

      <div>
        <label>About:</label>
        {aboutFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2">
            <textarea
              {...register(`about.${index}.detail` as const, {
                required: "Detail is required",
              })}
              className="border"
            />
            <button
              type="button"
              onClick={() => removeAbout(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendAbout({ detail: "" })}
          className="bg-green-500 text-white"
        >
          Add About
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

const RoomManagement: React.FC<{
  hotels: HotelType[];
  rooms:RoomsType[]
}> = ({ hotels,rooms }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateRoom = () => {
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleCreateRoom}
      >
        Create Room
      </button>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <button className="hidden"></button>{" "}
          {/* This is just a trigger button */}
        </PopoverTrigger>
        <PopoverContent className="p-4 w-[1000px] bg-white shadow-lg rounded-md">
          <RoomForm hotels={hotels} />
        </PopoverContent>
      </Popover>

      <RoomsTable rooms={rooms} />
    </div>
  );
};

const RoomsTable = ({rooms}:{rooms:RoomsType[]}) => {
  // Mock data for demonstration; replace with your data fetching logic
   
  const deleteCountry = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this country?"
    );

    if (confirmDelete) {
      await axios
        .delete(`/api/rooms?id=${id}`)
        .then((response) => {
          if (response?.data) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error deleting Rooms:", error);
        });
    }
  };
  return (
    <table className="mt-4 min-w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b-2 border-gray-200 text-left px-4 py-2">
            Title
          </th> 
          <th className="border-b-2 border-gray-200 text-left px-4 py-2">
            Hotel
          </th>
          <th className="border-b-2 border-gray-200 text-left px-4 py-2">
            Price
          </th> 
          <th className="border-b-2 border-gray-200 text-left px-4 py-2">
            Delete
          </th> 
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.id}>
            <td className="border-b border-gray-200 px-4 py-2">{room.title}</td>
            <td className="border-b border-gray-200 px-4 py-2">{room.hotel}</td>
            <td className="border-b border-gray-200 px-4 py-2">{room.price}</td>
            <td className="border p-2">
                <Button
                  onClick={() => deleteCountry(room?.id)}
                  className="text-red-600"
                >
                  <Delete className="text-red-600" />
                </Button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomManagement;
