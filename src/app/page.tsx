import Airlines from "@/components/Airlines";
import Articles from "@/components/Articles";
import Banner from "@/components/Banner";
import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";
import Recommended from "@/components/Common/Recomended";
import Contact from "@/components/ContactMe";
import Percentage from "@/components/Percentage";
import Subscription from "@/components/Subscription";
import Destinations from "@/components/TopDestination";
import { getLovedHotels } from "@/services/loved-hotel";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";
import { Fragment } from "react";

export default async  function Home() {
  const session = await getServerSession();
  const lovedStatus = await getLovedHotels(session?.user?.email as string);
  return (
    <Fragment>
      <Navbar />
      <Banner />
      <Destinations />
      <Percentage />
      <Recommended user={session?.user as User} loved_hotel={lovedStatus} />
      <Airlines />
      <Subscription />
      <Articles />
      <Contact />
      <Footer />
    </Fragment>
  );
}
