"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Adjust based on your setup
import { useForm } from "react-hook-form";
import { CountryType } from "@/types/countries";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import axios from "axios";

interface NameTableProps {
  data: CountryType[];
}

const NameTable: React.FC<NameTableProps> = ({ data }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  const handleCreate = async (formData: { name: string }) => {
    console.log("Creating new entry:", formData);
    // Handle form submission logic here, such as posting to an API
    await axios.post("/api/countries", formData).then((response) => {
      if (response?.data) {
        setIsPopoverOpen(false);
        window.location.reload();
      }
    });
    reset();
    setIsPopoverOpen(false);
  };

  const deleteCountry = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this country?");
    
    if (confirmDelete) {
      await axios.delete(`/api/countries?id=${id}`).then((response) => {
        if (response?.data) {
          setIsPopoverOpen(false);
          window.location.reload();
        }
      }).catch((error) => {
        console.error("Error deleting country:", error);
      });
    }
  };
  
  return (
    <div className="relative bg-white dark:bg-gray-300 shadow-lg rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-bold">Countries</h2>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsPopoverOpen(true)}
            >
              Create Table
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-4 bg-white border rounded-md shadow-md">
            <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: true })}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter name"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-blue-50 dark:shadow-md dark:shadow-white">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Button
                  onClick={() => deleteCountry(item?.id)}
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

export default NameTable;
