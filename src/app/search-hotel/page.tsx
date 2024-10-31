import { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import dynamic from "next/dynamic";

const SearchHotel = dynamic(() => import("./_components/ParentHotel"), {
  ssr: true,
});
export default function SearchHotelPage() {
  return (
    <Fragment>
      <Navbar />
      <SearchHotel />
      <Footer />
    </Fragment>
  );
}
