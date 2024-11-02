"use server";

import { db } from "@/lib/db";
import { Orders } from "@/lib/schema";

export const getOrders = async () => {

    const OrdersRecord = await db.select().from(Orders);

    return OrdersRecord;
}