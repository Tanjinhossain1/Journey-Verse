import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import RoomsParent from "./_components/RoomsParent";
import { HotelType } from "@/types/hotels";
import { getHotels } from "@/services/hotels";
import { getRooms } from "@/services/rooms";
import { RoomsType } from "@/types/rooms";
import Footer from "@/components/Common/Footer";

export default async function page() {
  const hotels = await getHotels();
  const rooms = await getRooms();
  
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Rooms">
        <RoomsParent rooms={rooms as RoomsType[]} hotels={hotels as HotelType[]} />
      </DashboardLayout>
      <Footer />
    </Fragment>
  );
}
