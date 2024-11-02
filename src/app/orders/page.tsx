import DashboardLayout from "@/components/Common/DashboardLayout";
import Navbar from "@/components/Common/Navbar";
import React, { Fragment } from "react";
import OrderDisplay from "./components/OrderDisplay";
import { getOrders } from "@/services/orders";
import { OrderType } from "@/types/orders";

export default async function page() {
  const orders = await getOrders()
  return (
    <Fragment>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <DashboardLayout name="Orders">
        <OrderDisplay data={orders as OrderType[]}  />
      </DashboardLayout>
    </Fragment>
  );
}
