import { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { getLovedHotels } from "@/services/loved-hotel";
import { User } from "@/types/user";

const SearchTours = dynamic(() => import("./_components/ParentTours"), {
  ssr: true,
});
export default async function SearchToursPage() {
  const session = await getServerSession();
  const lovedStatus = await getLovedHotels(session?.user?.email as string)
  return (
    <Fragment>
      <Navbar />
      <SearchTours user={session?.user as User} loved_hotel={lovedStatus} />
      <Footer />
    </Fragment>
  );
}
