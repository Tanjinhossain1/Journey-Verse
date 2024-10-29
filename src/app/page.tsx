import Banner from "@/components/Banner";
import Navbar from "@/components/Common/Navbar";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <Banner />
    </Fragment>
  );
}
