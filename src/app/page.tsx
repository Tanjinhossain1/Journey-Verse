import Banner from "@/components/Banner";
import Navbar from "@/components/Common/Navbar";
import Recommended from "@/components/Common/Recomended";
import Percentage from "@/components/Percentage";
import Subscription from "@/components/Subscription";
import Destinations from "@/components/TopDestination";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <Banner />
      <Percentage />
      <Destinations />
      <Recommended />
      <Subscription />
    </Fragment>
  );
}
