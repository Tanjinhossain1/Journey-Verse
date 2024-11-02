import Airlines from "@/components/Airlines";
import Articles from "@/components/Articles";
import Banner from "@/components/Banner";
import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";
import Recommended from "@/components/Common/Recomended";
import Percentage from "@/components/Percentage";
import Subscription from "@/components/Subscription";
import Destinations from "@/components/TopDestination";
import { Fragment } from "react";

export default async  function Home() {
  return (
    <Fragment>
      <Navbar />
      <Banner />
      <Percentage />
      <Destinations />
      <Recommended   />
      <Airlines />
      <Subscription />
      <Articles />
      <Footer />
    </Fragment>
  );
}
