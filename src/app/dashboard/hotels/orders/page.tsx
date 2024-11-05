import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import OrderDisplay from "./components/OrderDisplay";
import { getUserOrders } from "@/services/orders";
import { OrderType } from "@/types/orders";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/");

  const orders = await getUserOrders(session?.user?.email)
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Hotel Orders">
        <OrderDisplay data={orders as OrderType[]}  />
      </DashboardLayout>
    </Fragment>
  );
}
