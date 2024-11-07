import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import TourManagement from "./_components/ActivityTableForm";
import { getCity } from "@/services/cities";
import { CityType } from "@/types/city";

export default async function page() {
    const city = await getCity()
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Activity">
        <TourManagement cityData={city as CityType[]} />
      </DashboardLayout>
    </Fragment>
  );
}
