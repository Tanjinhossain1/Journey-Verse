import { getPaginatedHotels } from "@/services/hotels";
import ChileNavbar from "./ChildNavbar";
import { getServerSession } from "next-auth";
import { HotelType } from "@/types/hotels";
import { User } from "@/types/user";
import { getPaginatedTour } from "@/services/tours";
import { TourTypes } from "@/types/tours";
import { getPaginatedActivity } from "@/services/activity";
import { ActivityTypes } from "@/types/activity";

export default async function Navbar() {
  const  session  =  await getServerSession();
  const hotels = await getPaginatedHotels(1, 6);
  const tours = await getPaginatedTour(1, 6);
  const activity = await getPaginatedActivity(1, 6);


  return (
     <ChileNavbar activity={activity.data as ActivityTypes[]} tours={tours.data as TourTypes[]} hotels={hotels.data as HotelType[]} user={session?.user as User} />
  );
}
