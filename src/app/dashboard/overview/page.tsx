import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserDashboard from "./_components/parentOverview";

export default async function page() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/");

  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Overview">
        <UserDashboard />
      </DashboardLayout>
    </Fragment>
  );
}
