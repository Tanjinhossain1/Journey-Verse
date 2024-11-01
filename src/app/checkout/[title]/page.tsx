import React, { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { getDetailsRooms } from "@/services/rooms";
import { getDetailsHotels } from "@/services/hotels";
import Checkout from "./_components/CheckoutDisplayer";
import { RoomsType } from "@/types/rooms";
import { HotelType } from "@/types/hotels";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { User } from "@/types/user";

type Params = Promise<{ title: string }>

export default async function Page(props: { params: Params }) {
  const { title } = await props.params;

  const  session  =  await getServerSession();

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
  const room_detail = await getDetailsRooms(formateTitle);
  const hotel_detail = await getDetailsHotels(room_detail?.[0]?.hotel);
  if(!session?.user?.email)redirect('/login')
  return (
    <Fragment>
      <Navbar />
       <Checkout user={session?.user as User} hotel_detail={hotel_detail?.[0] as HotelType} room_detail={room_detail?.[0] as RoomsType} />
      <Footer />
    </Fragment>
  );
}
