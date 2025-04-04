import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import OrderDisplay from "./components/OrderDisplay";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getTourOrders } from "@/services/tours";
import { TourOrderType } from "@/types/orders";

export default async function page() {
  const session = await getServerSession();
  if (!session?.user?.email && session?.user?.image !== "admin") redirect("/");

  const orders = await getTourOrders()
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Tour Orders">
        <OrderDisplay data={orders as TourOrderType[]}  />
      </DashboardLayout>
    </Fragment>
  );
}
