import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import OrderDisplay from "./components/OrderDisplay";
import { getOrders } from "@/services/orders";
import { OrderType } from "@/types/orders";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  if (!session?.user?.email && session?.user?.image !== "admin") redirect("/");

  const orders = await getOrders();

  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Hotel Orders Management">
        <OrderDisplay data={orders as OrderType[]}  />
      </DashboardLayout>
    </Fragment>
  );
}
