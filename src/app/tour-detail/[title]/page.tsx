import React, { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import TourDisplay from "./_components/TourDisplay";
import { getDetailedTour } from "@/services/tours";
import { TourTypes } from "@/types/tours";

type Params = Promise<{ title: string }>;

export default async function Page(props: {
  params: Params;
}) {
  const { title } = await props.params;
//   const session = await getServerSession();

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
    const tourDetails = await getDetailedTour(formateTitle)
  return (
    <Fragment>
      <Navbar />
      <TourDisplay tourDetails={tourDetails[0] as TourTypes} />
      <Footer />
    </Fragment>
  );
}
