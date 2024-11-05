import React, { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import Checkout from "./_components/CheckoutDisplayer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { User } from "@/types/user";
import { getDetailedTour } from "@/services/tours";
import { TourTypes } from "@/types/tours";

type Params = Promise<{ title: string }>

export default async function Page(props: { params: Params }) {
  const { title } = await props.params;

  const  session  =  await getServerSession();

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
  const tour_detail = await getDetailedTour(formateTitle);
  if(!session?.user?.email)redirect('/login')
  return (
    <Fragment>
      <Navbar />
       <Checkout user={session?.user as User} tour_detail={tour_detail[0] as TourTypes} />
      <Footer />
    </Fragment>
  );
}
