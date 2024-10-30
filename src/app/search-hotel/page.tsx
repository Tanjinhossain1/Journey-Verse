import { Fragment } from "react";
import SearchHotel from "./_components/ParentHotel";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";

export default function SearchHotelPage() {
  return (
    <Fragment>
      <Navbar />
      <SearchHotel />
      <Footer />
    </Fragment>
  );
}
