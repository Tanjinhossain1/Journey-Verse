import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import Hotels from "./_component/Hotels";
import { getHotels } from "@/services/hotels";
import { getCity } from "@/services/cities";
import { HotelType } from "@/types/hotels";

export default async function page() {
  const hotels = await getHotels();
  const city = await getCity();
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Hotels">
        <Hotels data={hotels as HotelType[]} cityData={city} />
      </DashboardLayout>
    </Fragment>
  );
}
