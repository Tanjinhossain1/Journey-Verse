import React, { Fragment } from "react";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";
import { getLovedHotels } from "@/services/loved-hotel";
import ActivityDisplay from "./_components/ActivityDisplay";
import { getDetailedActivity } from "@/services/activity";
import { ActivityTypes } from "@/types/activity";

type Params = Promise<{ title: string }>;

export default async function Page(props: {
  params: Params;
}) {
  const { title } = await props.params;
  const session = await getServerSession();

  const formateTitle = title
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1))
    .join(" ");
    const activityDetails = await getDetailedActivity(formateTitle);
    const user = session?.user;
    const lovedStatus = await getLovedHotels(session?.user?.email as string);
  return (
    <Fragment>
      <Navbar />
      <ActivityDisplay lovedStatus={lovedStatus} user={user as User} activityDetails={activityDetails[0] as ActivityTypes} />
      <Footer />
    </Fragment>
  );
}
