import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import OrderDisplay from "./components/OrderDisplay";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ActivityOrderType } from "@/types/orders";
import { getActivityOrders } from "@/services/activity";

export default async function page() {
  const session = await getServerSession();
  if (!session?.user?.email && session?.user?.image !== "admin") redirect("/");

  const orders = await getActivityOrders()
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Activity Orders">
        <OrderDisplay data={orders as ActivityOrderType[]}  />
      </DashboardLayout>
    </Fragment>
  );
}
