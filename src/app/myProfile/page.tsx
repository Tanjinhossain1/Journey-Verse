import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";
import TravelUserProfile from "./_components/ProfileDisplayer";
import { User } from "@/types/user";
import { getMyProfile } from "@/services/myProfile";

export default async function page() {
    const session = await getServerSession();
    if (!session?.user?.email) redirect("/");
    const userDetails = await getMyProfile(session?.user?.email);
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="My Profile">
      <TravelUserProfile profileDetails={userDetails} user={session?.user as User} />
      </DashboardLayout>
    </Fragment>
  );
}
