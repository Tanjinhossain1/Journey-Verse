import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import Hotels from "./_component/Hotels";
import { getHotels } from "@/services/hotels";
import { getCity } from "@/services/cities";
import { HotelType } from "@/types/hotels";
import { getCountries } from "@/services/countries";

export default async function page() {
  const hotels = await getHotels();
  const city = await getCity();
  const countries = await getCountries();
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Hotels">
        <Hotels data={hotels as HotelType[]} countries={countries} cityData={city} />
      </DashboardLayout>
    </Fragment>
  );
}
