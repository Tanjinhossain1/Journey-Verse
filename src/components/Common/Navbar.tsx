import { getPaginatedHotels } from "@/services/hotels";
import ChileNavbar from "./ChildNavbar";
import { getServerSession } from "next-auth";
import { HotelType } from "@/types/hotels";

export default async function Navbar() {
  const  session  =  await getServerSession();
  const hotels = await getPaginatedHotels(1, 6)

  return (
     <ChileNavbar hotels={hotels.data as HotelType[]} user={session?.user} />
  );
}
