"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderType } from "@/types/orders";
import { formatDate } from "@/utils/utils";

export default function OrderDisplay({ data = [] }: { data: OrderType[] }) {
  const [sortColumn, setSortColumn] = useState<keyof OrderType>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSort = (column: keyof OrderType) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-black border dark:border-gray-200 bg-black dark:text-gray-300 text-white">
              <TableHead
                onClick={() => handleSort("fullName")}
                className="cursor-pointer  border-r"
              >
                Full Name{" "}
                {sortColumn === "fullName" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead className="border-r">Card Number</TableHead>
              <TableHead className="border-r">Hotel</TableHead>
              <TableHead className="border-r">Room</TableHead>
              <TableHead className="border-r">Phone</TableHead>
              <TableHead className="border-r">Address</TableHead>
              <TableHead className="border-r">City</TableHead>
              <TableHead className="border-r">State/Province</TableHead>
              <TableHead className="border-r">Zip Code</TableHead>
              <TableHead className="border-r">Country</TableHead>
              <TableHead className="border-r">Check In</TableHead>
              <TableHead className="border-r">Check Out</TableHead>
              <TableHead className="border-r">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="dark:text-gray-300 border-b dark:border-gray-200 ">
            {paginatedData.map((item) => (
              <TableRow className="border-b dark:border-gray-200" key={item.id}>
                <TableCell className="border-r border-l">
                  {item.fullName}
                </TableCell>
                <TableCell className="border-r">{item.cardNumber}</TableCell>
                <TableCell className="border-r">{item.hotel_name}</TableCell>
                <TableCell className="border-r">{item.room_name}</TableCell>
                <TableCell className="border-r">{item.phone}</TableCell>
                <TableCell className="border-r">{item.addressLine1}</TableCell>
                <TableCell className="border-r">{item.city}</TableCell>
                <TableCell className="border-r">{item.stateProvince}</TableCell>
                <TableCell className="border-r">{item.zipCode}</TableCell>
                <TableCell className="border-r">{item.country}</TableCell>
                <TableCell className="border-r">
                  {formatDate(item.checkIn as Date)}
                </TableCell>
                <TableCell className="border-r">
                  {formatDate(item.checkout as Date)}
                </TableCell>
                <TableCell className="border-r">
                  {item.status === "Cancelled" && (
                    <span className="text-red-500 font-bold">Cancelled</span>
                  )}
                  {item.status === "Completed" && (
                    <span className="text-green-500 font-bold">Completed</span>
                  )}
                  {item.status === "pending" && (
                    <span className="text-yellow-500 font-bold">Pending</span>
                  )}
                  {item.status === "Processing" && (
                    <span className="text-yellow-500 font-bold">
                      Processing
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between dark:text-gray-300">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}{" "}
          entries
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
