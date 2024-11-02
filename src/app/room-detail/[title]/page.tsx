import React, { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import {
  getDetailsRoomsWithHotelName,
  getDetailsRoomsWithOutDetailed,
} from "@/services/rooms";
import ParentDetails from "./_components/ParentDetails";
import { RoomsType } from "@/types/rooms";
import { getDetailsHotels } from "@/services/hotels";
import { HotelType } from "@/types/hotels";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";

type Params = Promise<{ title: string }>;
type SearchParams = Promise<{ hotel_name: string }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { title } = await props.params;
  const { hotel_name } = await props.searchParams;
  const session = await getServerSession();

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
  const hotelName = hotel_name
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
  const room_detail = await getDetailsRoomsWithHotelName(
    formateTitle,
    hotelName
  );
  const hotel_detail = await getDetailsHotels(room_detail?.[0]?.hotel);
  const rooms = await getDetailsRoomsWithOutDetailed(
    room_detail?.[0]?.title,
    room_detail?.[0]?.hotel
  );

  return (
    <Fragment>
      <Navbar />
      {room_detail && room_detail[0] ? (
        <ParentDetails
          user={session?.user as User}
          otherOptionRooms={rooms as RoomsType[]}
          hotel_detail={hotel_detail[0] as HotelType}
          room_detail={room_detail[0] as RoomsType}
        />
      ) : null}
      <Footer />
    </Fragment>
  );
}
