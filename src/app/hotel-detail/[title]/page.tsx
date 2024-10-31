import React, { Fragment } from "react";
import ParentDetails from "./_components/ParentDetails";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { getDetailsHotels } from "@/services/hotels";
import { HotelType } from "@/types/hotels";
import { getDetailsRoomsWithHotel } from "@/services/rooms";
import { RoomsType } from "@/types/rooms";

type Params = Promise<{ title: string }>

export default async function Page(props: { params: Params }) {
  const { title } = await props.params;

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
  const hotel_detail = await getDetailsHotels(formateTitle);
  const room_detail = await getDetailsRoomsWithHotel(formateTitle)
  return (
    <Fragment>
      <Navbar />
      {
        hotel_detail && hotel_detail[0] ? 
        <ParentDetails room_detail={room_detail as RoomsType[]} hotel_detail={hotel_detail[0] as HotelType} />
      : null}
      <Footer />
    </Fragment>
  );
}
