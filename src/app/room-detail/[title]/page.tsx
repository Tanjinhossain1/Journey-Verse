import React, { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { getDetailsRooms } from "@/services/rooms";
import ParentDetails from "./_components/ParentDetails";
import { RoomsType } from "@/types/rooms";

export default async function Page({ params }: { params: { title: string } }) {
  const { title } = await params;

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
  const room_detail = await getDetailsRooms(formateTitle)
  return (
    <Fragment>
      <Navbar />
      {
        room_detail && room_detail[0] ? 
       <ParentDetails room_detail={room_detail[0] as RoomsType} />
      : null}
      <Footer />
    </Fragment>
  );
}